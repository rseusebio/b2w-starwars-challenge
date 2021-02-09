import  axios    from "axios";
import  { assert } from "chai";

describe( "Planets API ", 
          ( ) => 
          {
            const planetAPI = axios.create({
                baseURL: "http://localhost:3000", 
                timeout: 5000
            });

            describe( "POST add", 
                      () => 
                      {
                          it( "Insert New", 
                              async () => 
                              {
                                const newPlanet = {
                                    "name": "Endor",
                                    "climate": "temperate",
                                    "terrain": "forests, mountains, lakes"
                                };

                                const res = await planetAPI.post( "/planets/add",newPlanet );

                                assert.equal( res.status,  200 );

                                assert.typeOf( res.data,  "object" );
                                assert.lengthOf( res.data.planets,  1 );
                                assert.equal( res.data.count,  1 );
                              });
                            
                            it( "Insert Equal", 
                              async () => 
                              {
                                const newPlanet = {
                                    "name": "Endor",
                                    "climate": "temperate",
                                    "terrain": "forests, mountains, lakes"
                                };

                                const res = await planetAPI.post( "/planets/add",newPlanet );

                                assert.equal( res.status,  200 );

                                assert.typeOf( res.data,  "object" );
                                assert.lengthOf( res.data.planets,  0 );
                                assert.equal( res.data.count,  0 );
                              })
                              it( "Insert Invalid Planet", 
                              async () => 
                              {
                                const newPlanet = {
                                    "name": "InvalidPlanet",
                                    "climate": "temperate",
                                    "terrain": "forests, mountains, lakes"
                                };

                                const res = await planetAPI.post( "/planets/add",newPlanet );

                                assert.equal( res.status,  200 );

                                assert.typeOf( res.data,  "object" );
                                assert.lengthOf( res.data.planets,  0 );
                                assert.equal( res.data.count,  0 );
                                assert.equal( res.data.message,  0 );
                              })
                        
                      }
                    );
          }
);