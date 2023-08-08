import { LocationEntity } from "../entities/LocationEntity";
import { FetchDataResponse, fetchData } from "./fetchAPI";

export async function fetchLocations(url: string) {
    return await fetchData({
        endpoint: url,
        method: "GET"
    }) as FetchDataResponse<{
        locations: LocationEntity[]
    }>;
}

export async function fetchCities(countryId: number) {
    return fetchLocations(`https://localhost:8080/location/countries/${countryId}`);
}

export async function fetchCountries() {
    return fetchLocations(`https://localhost:8080/location/countries`);
}
