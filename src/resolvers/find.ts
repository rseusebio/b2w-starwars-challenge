import  { Request, Response }      from    "express";
import  { Document }               from    "mongoose";
import  Planet, { IPlanetRecord }  from    "../models/planet";
import  PlanetResponse             from    "../models/response";
import  { StatusCode }             from    "../models/status";

const retrievePlanet = async ( id: string, name: string,  ) => 
{
    const result = new PlanetResponse( );

    let planet: Document<IPlanetRecord>;

    if( id ) 
    {
        // catching invalid ObjectId params
        
        planet = await Planet.findById( id ).exec( ).catch( err => { return undefined; });
    }
    else if( name )
    {
        planet = await Planet.findOne( { name: { $regex: `^${name}$`, $options: 'i' } } ).exec( ); 
    }

    if( !planet )
    {
        result.statusCode = StatusCode.PLANET_NOT_FOUND;

        return {
            status: 200, 
            result
        }
    }
    else 
    {
        result.insertOne( planet );

        return {
            status: 200, 
            result,
        }
    }
}

const findById = async ( req: Request, res: Response ) => 
{
    const { id } = req.params;

    const { status, result } = await retrievePlanet( id, undefined );

    res.status( status ).json( result );
}

const findByName = async ( req: Request, res: Response ) => 
{
    const { name } = req.params;

    const { status, result } = await retrievePlanet( undefined, name );

    res.status( status ).json( result );

}

export {
    findById, 
    findByName
}