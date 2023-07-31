import { LocationEntity } from "../entities/LocationEntity";

async function fetchLocations(url: string) {
    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            body: undefined
        }
    ).then((response) => {
        if (response.ok) {
            return response.json().then( content => {
                console.log(content);
                const {locations} = content as {
                    locations: LocationEntity[]
                };
                return locations;
            })
        }
        else {
            return [];
        }
    });
}

export async function fetchCities(countryId: number) {
    return fetchLocations(`https://localhost:8080/location/countries/${countryId}`);
}

export async function fetchCountries() {
    return fetchLocations(`https://localhost:8080/location/countries`);
}
