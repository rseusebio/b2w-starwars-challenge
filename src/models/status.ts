enum StatusCode 
{
    SUCCESS                 =   0,
    INVALID_REQUEST_BODY    =   1, 
    SERVICE_UNAVAILABLE          , 
    PLANET_DOESNT_EXIST          , 
    PLANET_ALREADY_CREATED       , 
    INSERTION_FAILED             ,
    PLANET_NOT_FOUND             ,
};

const statusMap: Map<StatusCode, String> = new Map( );

statusMap.set( StatusCode.SUCCESS                , "OK" );
statusMap.set( StatusCode.INVALID_REQUEST_BODY   , "Missing body fields." );
statusMap.set( StatusCode.SERVICE_UNAVAILABLE    , "Starwars' API is not available at the moment." );
statusMap.set( StatusCode.PLANET_DOESNT_EXIST    , "Planet not found at Starwars' API." );
statusMap.set( StatusCode.PLANET_ALREADY_CREATED , "Planet already exists." );
statusMap.set( StatusCode.INSERTION_FAILED       , "Failed to insert new planet in database." );
statusMap.set( StatusCode.PLANET_NOT_FOUND       , "Planet not found in database." );


export {
    StatusCode, 
    statusMap
}