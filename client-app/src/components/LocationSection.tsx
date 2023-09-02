import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { fetchCities, fetchCountries } from '../api/fetchRoutines/locationsAPI';
import { LocationEntity } from '../api/entities/LocationEntity';

interface LocationSectionProps{
    address: string,
    city: LocationEntity | null,
    country: LocationEntity | null,
    editable: boolean,
    setAddress?: (newAddress: string) => void,
    setCountry?: (newCountry: LocationEntity | null) => void,
    setCity?: (newCity: LocationEntity | null) => void,
}

export function LocationSection({
    address, setAddress,
    country, setCountry,
    city, setCity,
    editable,
}: LocationSectionProps){
    const [countryList, setCountryList] = useState<LocationEntity[]>([]);
    const [cityList, setCityList] = useState<LocationEntity[]>([]);
    const [loadingLocations, setLoadingLocations] = useState(false);

    useEffect(() => {
        setLoadingLocations(true);
        fetchCountries()
            .then(response => setCountryList(response.content.locations))
            .finally(() => setLoadingLocations(false));
    }, []);

    useEffect(() => {
        setCityList([]);
        if (country?.id) {
            setLoadingLocations(true);
    
            fetchCities(country.id)
                .then(response => setCityList(response.content.locations))
                .finally(() => setLoadingLocations(false));
        }

    }, [country?.id]);

    const getLocationLabel = (location: LocationEntity) => location.name;

    return (
        <div className='flex flex-col gap-3 items-start w-full'>
            <div className='text-xl font-bold'>Τοποθεσία</div>
            <div className='flex items-start gap-3 w-3/5'>
                {
                    editable ?
                    <div className='flex gap-3 flex-start items-center'>
                        <FontAwesomeIcon icon={faLocationDot} size='xl' />
                        <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { m: 1},
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField 
                            fullWidth
                            id="standard-basic" 
                            label="Διεύθυνση" 
                            variant="standard" 
                            value={address}
                            onChange={e => setAddress?.(e.target.value)}
                        />
                        </Box>

                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Χώρα" size='small'/>}
                            placeholder="Χώρα"
                            noOptionsText="Δεν βρέθηκαν Χώρες"
                            
                            options={countryList?.length ? countryList : (country ? [country] : [])}
                            value={countryList?.find(c => c.id === country?.id) ?? null}
                            getOptionLabel={getLocationLabel}
                            onChange={(_, c) => setCountry?.(c)}
                            sx={{ 
                                width: '14rem',
                                height: 'max-content',
                            }}
                            isOptionEqualToValue={(opt, val) => opt.id === val.id}
                            loading={loadingLocations}
                        />
                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Πόλη" size='small'/>}
                            placeholder="Πόλη"
                            noOptionsText="Δεν βρέθηκαν Πόλεις"
                            options={cityList?.length ? cityList : (city ? [city] : [])}
                            value={cityList?.find(c => c.id === city?.id) ?? null}
                            getOptionLabel={getLocationLabel}
                            onChange={(_, c) => setCity?.(c)}
                            sx={{ 
                                width: '14rem',
                                height: 'max-content',
                            }}
                            isOptionEqualToValue={(opt, val) => opt.id === val.id}
                            loading={loadingLocations}
                        />
                    </div>
                    :
                    <div className='flex items-start gap-2'>
                        <FontAwesomeIcon icon={faLocationDot} size='xl' />
                        <span>{[address, city?.name, country?.name].join(", ")}</span>
                    </div>                    
                }
            </div>
        </div>
       
        
    );
}
