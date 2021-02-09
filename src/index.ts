import express                      from "express";
import mongoose                     from "mongoose";
import bodyParser                   from "body-parser";
import add                          from "./resolvers/add";
import { findById, findByName }     from "./resolvers/find";
import { deleteById, deleteByName } from "./resolvers/delete";
import list                         from "./resolvers/list";
import config                       from "config";
import IConfig                      from "./models/config";
import path                         from "path";

process.env["NODE_CONFIG_DIR"] = path.join( path.dirname( __dirname ), "./config/" );

const { port, mongoDB } =config.get<IConfig>( process.env[ "NODE_ENV" ] );

const app = express( );

app.use( bodyParser.json( ) );

app.post( "/planets/add", add );

app.get( "/planets/id/:id", findById );

app.get( "/planets/name/:name", findByName );

app.get( "/planets/", list );

app.delete( "/planets/name/:name", deleteByName );

app.delete( "/planets/id/:id", deleteById );

mongoose.connect( mongoDB, { useNewUrlParser: true,  useUnifiedTopology: true } )
        .then( 
            _ => 
            {
                app.listen( port,  
                            () => 
                            {
                                console.info( `Server running at http://localhost:${port}/` );
                            }
                        );
            }
        )
        .catch( 
            err => 
            {
                console.error( "Failed to connect to database: ", err );
            }
        );


