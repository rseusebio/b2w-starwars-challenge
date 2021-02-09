import mongoose, { Document } from "mongoose";

interface IPlanetRecord 
{
    name:           string;
    climate:        string;
    terrain:        string;
    appearances:    number;
}

const planetSchema = new mongoose.Schema( 
    {
        name:           String, 
        climate:        String, 
        terrain:        String,
        appearances:    Number,
    },
    {
        versionKey: false
    }
);

const Planet = mongoose.model<Document<IPlanetRecord>>( "Planet", planetSchema );

export default Planet;

export {
    IPlanetRecord
}