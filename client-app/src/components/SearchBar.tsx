import { useContext, useEffect, useMemo, useState } from 'react';
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
import { createSearchParams, useNavigate } from 'react-router-dom';
import { compareDates } from '../api/entities/dates';

type PickerDateRange = [Dayjs | null, Dayjs | null]

export function SearchBar() {

    const appCtx = useContext(AppContext);
    const searchOptions = appCtx.state.businessContext.searchContext;

    const navigate = useNavigate();

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

    const triggerSearch = () => {
        const searchParams = {
            countryId: String(searchOptions.country?.id),
            cityId: String(searchOptions.city?.id),
            dateFrom: String(searchOptions.dateFrom),
            dateTo: String(searchOptions.dateTo),
            numPersons: String(searchOptions.numPersons)
        }
        navigate({
            pathname: '/searchProperties',
            search: createSearchParams(searchParams).toString()
        })
    }

    const canTriggerSearch = useMemo(
        () => Boolean(
            searchOptions.country?.id &&
            searchOptions.city?.id &&
            (compareDates(searchOptions.dateFrom, searchOptions.dateTo) > 0) &&
            searchOptions.numPersons
        ), 
        [
            searchOptions.country?.id,
            searchOptions.city?.id,
            searchOptions.dateFrom,
            searchOptions.dateTo,
            searchOptions.numPersons
        ]
    )
    
    return (
        <div
            className='
                bg-white text-main-petrol border-2 
                border-main-petrol w-7/12 px-2 flex items-center 
                justify-between rounded-full
            '
            style={{
                position: 'absolute',
                left: '20.9%',
                top: '-33px'
            }}
        >
            <div className='flex justify-start items-center gap-1 p-2'>
                <FontAwesomeIcon icon={faLocationDot} size='xl' />
                <Autocomplete
                    placeholder="Χώρα"
                    noOptionsText="Δεν βρέθηκαν Χώρες"
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
                    noOptionsText="Δεν βρέθηκαν Πόλεις"
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
                            width: '18rem',
                            height: 'max-content',
                        }}                        
                        slotProps={{
                            textField: {
                                size: 'small'
                            }
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
            <button
                className='
                    bg-main-petrol text-white rounded-full text-xl
                    h-fit px-3 py-2
                    duration-200
                    hover:bg-dark-petrol
                    disabled:bg-light-petrol
                '
                disabled={!canTriggerSearch}
                onClick={triggerSearch}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
            </button>
        </div>
    )
}
