import  { Request, Response } from  "express";
import  Planet                from  "../models/planet";
import  PlanetResponse        from  "../models/response";

interface IListQuery 
{
    climate: string
    terrain: string
}

const list = async ( req: Request<any, any, any,IListQuery, any>, res: Response ) => 
{
    const result = new PlanetResponse( );

    const { climate, terrain } = req.query;

    const filter: any = {};

    if( climate )
    {
        filter.climate = { $regex: climate.toLowerCase( ), $options: 'i' };
    }
    if( terrain )
    {
        filter.terrain = { $regex: terrain.toLowerCase( ), $options: 'i' };
    }

    const planets = await Planet.find( filter ).exec( );

    result.insertMany( planets );

    res.status( 200 ).json( result );
}

export default list;