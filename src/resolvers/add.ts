import  { Request, Response }  from  "express";
import  Planet                 from  "../models/planet";
import  dataSource             from  "../datasource";
import  { StatusCode  }        from  "../models/status";
import  PlanetResponse         from  "../models/response";

const add = async ( req: Request, res: Response ) => 
{
    const { name, climate, terrain } = req.body;

    const result = new PlanetResponse( );

    if( !name || !climate || !terrain )
    {
        result.statusCode = StatusCode.INVALID_REQUEST_BODY;

        return res.status( 400 ).json( result );
    }

    const appearances = await dataSource.getFilmAppearances( name );

    if( appearances === -2 )
    {
        result.statusCode = StatusCode.SERVICE_UNAVAILABLE;

        return res.status( 200 ).json( result );
    }
    else if( appearances === -1 )
    {
        result.statusCode = StatusCode.PLANET_DOESNT_EXIST;
        
        return res.status( 200 ).json( result );
    }

    const _planet = await Planet.findOne( { name } ).exec( );

    if( _planet )
    {
        result.statusCode = StatusCode.PLANET_ALREADY_CREATED;

        return res.status( 200 ).json( result );
    }

    const planet = new Planet( { name, climate, terrain, appearances } );

    const record = await planet.save( );

    if( !record )
    {
        result.statusCode = StatusCode.INSERTION_FAILED;

        return res.status( 503 ).json( result );
    }

    result.insertOne( planet );

    res.status( 200 ).json( result );
}

export default add;