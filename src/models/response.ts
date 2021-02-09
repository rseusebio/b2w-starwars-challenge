import { IPlanetRecord }         from "./planet";
import { StatusCode, statusMap } from "./status";
import { Document }              from "mongoose"

class StatusInfo 
{
    message: String;
    code:    StatusCode;
}

class PlanetResponse 
{
    private     count:      number;
    private     planets:    Array<Document<IPlanetRecord>>
    private     status:     StatusInfo;

    set statusCode( code: StatusCode )
    {
        this.status.message = statusMap.get( code );
        this.status.code    = code;
    }

    constructor( )
    {
        this.count      =   0;
        this.planets    =   [];
        this.status     =   new StatusInfo( );
    }

    insertOne( planet: Document<IPlanetRecord> )
    {
        this.planets.push( planet );

        this.count = this.planets.length;

        this.statusCode = StatusCode.SUCCESS;
    }

    insertMany( planets: Document<IPlanetRecord>[] )
    {
        this.planets = this.planets.concat( planets );

        this.count = this.planets.length;

        this.statusCode = StatusCode.SUCCESS;
    }
}

export default PlanetResponse;