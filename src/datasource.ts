import axios, { AxiosInstance, AxiosResponse } from "axios";

interface IPlanetResultRecord
{
    films: Array<string>
}

interface IStarwarsPlanet 
{
    count: number,
    results: Array<IPlanetResultRecord>
}

class DataSource 
{
    private starwarsAPI: AxiosInstance;

    constructor( )
    {
        this.starwarsAPI = axios.create(
            {
                baseURL:"https://swapi.dev/api",
                timeout: 5000
            }
        );
    }

    async getFilmAppearances( name:string ): Promise<number>
    {
        try 
        {
            const res = await this.starwarsAPI.get<any, AxiosResponse<IStarwarsPlanet>>( `/planets/?search=${name}` );
            
            if( res.status !== 200 )
            {
                // indicates the server is unavailable 

                return -2;
            }

            if( !res.data || res.data.count <= 0 )
            {
                // indicates the planet doesn't exist

                return -1;
            }

            return res.data?.results[0]?.films?.length ?? 0;
        }
        catch( e )
        {
            // indicates the server is unavailable 

            return -2;
        }
    }
}

const dataSource = new DataSource( );

export default dataSource;

export {
    DataSource
}