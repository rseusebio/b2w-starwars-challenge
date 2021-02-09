import  { Request, Response }      from    "express";
import  { Document }               from    "mongoose";
import  Planet, { IPlanetRecord }  from    "../models/planet";
import  PlanetResponse             from    "../models/response";
import  { StatusCode }             from    "../models/status";

const deletePlanet = async ( id: string, name: string,  ) => 
{
    const result = new PlanetResponse( );

    let planet: Document<IPlanetRecord>;

    if( id ) 
    {
        planet = await Planet.findByIdAndDelete( id ).exec( ).catch( _ => { return undefined; });

    }
    else if( name )
    {
        planet = await Planet.findOneAndDelete( { name: { $regex: `^${name}$`, $options: 'i' } } ).exec( ); 
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

const deleteById = async ( req: Request, res: Response ) => 
{
    const { id } = req.params;

    const { status, result } = await deletePlanet( id, undefined );

    res.status( status ).json( result );
}

const deleteByName = async ( req: Request, res: Response ) => 
{
    const { name } = req.params;

    const { status, result } = await deletePlanet( undefined, name );

    res.status( status ).json( result );

}

export {
    deleteById, 
    deleteByName
}