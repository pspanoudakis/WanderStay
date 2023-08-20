import { LocationEntity } from "../entities/LocationEntity";
import { FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";

export async function fetchLocations(url: string) {
    return await fetchData({
        endpoint: createEndPointUrl(url),
        method: "GET"
    }) as FetchDataResponse<{
        locations: LocationEntity[]
    }>;
}

export async function fetchCities(countryId: number) {
    return fetchLocations(`/location/countries/${countryId}`);
}

export async function fetchCountries() {
    return fetchLocations(`/location/countries`);
}
