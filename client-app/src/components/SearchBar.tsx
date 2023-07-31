import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot, faCalendarDays, faUserGroup, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import 'react-day-picker/dist/style.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Autocomplete from '@mui/joy/Autocomplete';
import dayjs, { Dayjs } from 'dayjs';
import { AppContext, SearchContext, setSearchContext } from '../AppContext';
import { LocationEntity } from '../api/entities/LocationEntity';
import { fetchCities, fetchCountries } from '../api/fetchRoutines/locationsAPI';

type PickerDateRange = [Dayjs | null, Dayjs | null]

export function SearchBar() {

    const appCtx = useContext(AppContext);
    const searchOptions = appCtx.state.businessContext.searchContext;

    const [cityList, setCityList] = useState<LocationEntity[]>([]);
    const [countryList, setCountryList] = useState<LocationEntity[]>([]);
    const [loadingLocations, setLoadingLocations] = useState(false);

    useEffect(() => {
        setLoadingLocations(true);
        fetchCountries()
            .then(countries => setCountryList(countries))
            .finally(() => setLoadingLocations(false));
    }, [])

    useEffect(() => {
        setSearchOptions({
            ...searchOptions,
            city: undefined
        })
        setCityList([]);
        if (searchOptions.country) {
            setLoadingLocations(true);
    
            fetchCities(searchOptions.country?.id)
                .then(cities => setCityList(cities))
                .finally(() => setLoadingLocations(false));
        }

    }, [searchOptions.country?.id]);

    const setSearchOptions = (newOptions: SearchContext) => {
        setSearchContext(appCtx, newOptions);
    }

    const dateRangeOnChange = ([from, to]: PickerDateRange) => {
        setSearchOptions({
            ...searchOptions,
            dateFrom: from?.toDate(),
            dateTo: to?.toDate()
        })
    }

    const getLocationLabel = (location: LocationEntity) => location.name;
    console.log(appCtx.state.businessContext.searchContext);
    return (
        <div className='
            bg-white text-main-petrol border-2 
            border-main-petrol w-7/12 flex items-center 
            justify-between rounded-full
            px-3
        '>
            <div className='flex justify-start items-center gap-1 p-2'>
                <FontAwesomeIcon icon={faLocationDot} size='xl' />
                <Autocomplete
                    placeholder="Χώρα"
                    options={countryList}
                    value={searchOptions.country ?? null}
                    getOptionLabel={getLocationLabel}
                    onChange={(_, c) => setSearchOptions({
                        ...searchOptions,
                        country: c ?? undefined
                    })}
                    sx={{ width: '14rem' }}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    loading={loadingLocations}
                />
                <Autocomplete
                    placeholder="Πόλη"
                    options={cityList}
                    value={searchOptions.city ?? null}
                    getOptionLabel={getLocationLabel}
                    onChange={(_, c) => setSearchOptions({
                        ...searchOptions,
                        city: c ?? undefined
                    })}
                    sx={{ width: '14rem' }}
                    isOptionEqualToValue={(opt, val) => opt.id === val.id}
                    loading={loadingLocations}
                />
            </div>
            <div className='flex justify-start items-center gap-1 p-2 border-x-2 border-x-main-petrol'>
                <FontAwesomeIcon icon={faCalendarDays} size='xl' />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateRangePicker 
                        value={[dayjs(searchOptions.dateFrom), dayjs(searchOptions.dateTo)]} 
                        onChange={(v) => dateRangeOnChange(v)} 
                        localeText={{ start: 'Check-in', end: 'Check-out' }}
                        sx={{
                            width: '18rem'
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className='flex justify-center items-center gap-1 p-2 w-max'>
                <FontAwesomeIcon icon={faUserGroup} size='xl'/>
                <button 
                    className='bg-white rounded-full h-fit p-1' 
                    onClick={() => setSearchOptions({
                        ...searchOptions,
                        numPersons: searchOptions.numPersons - 1
                    })} 
                    disabled={searchOptions.numPersons <= 1 ? true : false}
                >
                    <FontAwesomeIcon icon={faCaretDown} size='xl'/>
                </button>
                <span className='font-bold text-xl'>{searchOptions.numPersons}</span>
                <button 
                    className='bg-white rounded-full h-fit p-1' 
                    onClick={() => setSearchOptions({
                        ...searchOptions,
                        numPersons: searchOptions.numPersons + 1
                    })}
                    disabled={searchOptions.numPersons >= 100 ? true : false}
                >
                    <FontAwesomeIcon icon={faCaretUp} size='xl'/>
                </button>
            </div>
            <button className='bg-main-petrol text-white rounded-full h-fit px-4 py-3 text-xl'>
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
            </button>
        </div>
    )
}
