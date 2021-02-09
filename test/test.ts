import  axios    from "axios";
import  { assert } from "chai";

describe( "Planets API ", 
          ( ) => 
          {
            const planetAPI = axios.create({
                baseURL: "http://localhost:3000", 
                timeout: 5000
            });

            describe( "Add route", 
                      () => 
                      {
                          it( "Insert new planets", 
                              async () => 
                              {
                                const planets = [
                                  {
                                    "name": "Endor",
                                    "climate": "temperate",
                                    "terrain": "forests, mountains, lakes"
                                  },
                                  {
                                    "name": "Naboo",
                                    "climate": "temperate",
                                    "terrain": "grassy hills, swamps, forests, mountains"
                                  },
                                  {
                                    "name": "Coruscant",
                                    "climate": "temperate",
                                    "terrain": "cityscape, mountains"
                                  }
                                ]

                                for( let i = 0; i < planets.length; i++ )
                                {
                                  const p = planets[ i ];

                                  const res = await planetAPI.post( "/planets/add", p );

                                  assert.equal( res.status,  200 );

                                  assert.typeOf( res.data,  "object" );

                                  assert.lengthOf( res.data.planets,  1 );

                                  assert.equal( res.data.count,  1 );

                                }
                              });
                            
                          it( "Insert invalid planet name", 
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

                                assert.equal( res.data.status.code, 3 );
                              });
                            
                      }
                    );
            
              describe( "Delete planets", 
                        () => 
                        {
                          it( "Delete by name", 
                              async () => 
                              {

                                const res = await planetAPI.delete ( "/planets/name/" + "Endor" );

                                assert.equal( res.status,  200 );

                                assert.typeOf( res.data,  "object" );

                                assert.lengthOf( res.data.planets,  1 );

                                assert.equal( res.data.count,  1 );
                              });
                        });
              
              describe( "List ", 
                        () => 
                        {
                          it( "List all remaining planets", 
                              async () => 
                              {

                                const res = await planetAPI.get( "/planets" );

                                assert.equal( res.status,  200 );

                                assert.typeOf( res.data,  "object" );

                                assert.lengthOf( res.data.planets,  2 );

                                assert.equal( res.data.count,  2 );
                              });

                          it( "Fech by name", 
                              async () => 
                              {

                                const res = await planetAPI.get( "/planets/name/Coruscant" );

                                assert.equal( res.status,  200 );

                                assert.typeOf( res.data,  "object" );

                                assert.lengthOf( res.data.planets,  1 );

                                assert.equal( res.data.count,  1 );
                              });
                        });
          }
);