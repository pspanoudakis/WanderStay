import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { fetchCities, fetchCountries } from '../api/fetchRoutines/locationsAPI';
import { LocationEntity } from '../api/entities/LocationEntity';
import { AppContext, SearchContext, setSearchContext } from '../AppContext';

interface AddressProps{
    address?: string,
    city?: string,
    country?: string,
    editable: boolean,
    setAddress?: (add: string, city: string, country:string) => void
}

export function AddressSection(props: AddressProps){
    const [countryList, setCountryList] = useState<LocationEntity[]>([]);
    const [loadingLocations, setLoadingLocations] = useState(false);
    const [cityList, setCityList] = useState<LocationEntity[]>([]);
    const appCtx = useContext(AppContext);
    const searchOptions = appCtx.state.businessContext.searchContext;

    useEffect(() => {
        setLoadingLocations(true);
        fetchCountries()
            .then(response => setCountryList(response.content.locations))
            .finally(() => setLoadingLocations(false));
    }, [])

    const setSearchOptions = (newOptions: SearchContext) => {
        setSearchContext(appCtx, newOptions);
    }

    useEffect(() => {
        setSearchOptions({
            ...searchOptions,
            cityId: null
        })
        setCityList([]);
        if (searchOptions.countryId) {
            setLoadingLocations(true);
    
            fetchCities(searchOptions.countryId)
                .then(response => setCityList(response.content.locations))
                .finally(() => setLoadingLocations(false));
        }

    }, [searchOptions.countryId]);

    const getLocationLabel = (location: LocationEntity) => location.name;

    return (
        <div className='flex flex-col gap-3 items-start'>
            <div className='text-xl font-bold'>Τοποθεσία</div>
            <div className='flex items-start gap-3 w-3/5'>
                {
                    props.editable ?
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
                        defaultValue={props.address} 
                        />
                        </Box>

                        <Autocomplete
                            renderInput={(params) => <TextField {...params} label="Χώρα" size='small'/>}
                            placeholder="Χώρα"
                            noOptionsText="Δεν βρέθηκαν Χώρες"
                            options={countryList ?? []}
                            value={countryList?.find(c => c.id === searchOptions.countryId) ?? null}
                            getOptionLabel={getLocationLabel}
                            onChange={(_, c) => setSearchOptions({
                                ...searchOptions,
                                countryId: c?.id ?? null
                            })}
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
                            options={cityList}
                            value={cityList.find(c => c.id === searchOptions.cityId) ?? null}
                            getOptionLabel={getLocationLabel}
                            onChange={(_, c) => setSearchOptions({
                                ...searchOptions,
                                cityId: c?.id ?? null
                            })}
                            sx={{ 
                                width: '14rem' ,
                                height: 'max-content',
                            }}
                            isOptionEqualToValue={(opt, val) => opt.id === val.id}
                            loading={loadingLocations}
                        />
                    </div>
                    :
                    <div className='flex items-start gap-2'>
                        <FontAwesomeIcon icon={faLocationDot} size='xl' />
                        <span> {`${props.address + ", " + props.city + ", " + props.country}`} </span>
                    </div>
                    
                }
            </div>
        </div>
       
        
    );

}