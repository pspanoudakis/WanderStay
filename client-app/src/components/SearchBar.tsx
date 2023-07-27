import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot, faCalendarDays, faUserGroup, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Autocomplete from '@mui/joy/Autocomplete';
import dayjs, { Dayjs } from 'dayjs';
const countryOptions = ["Naxos", "Paros", "Mykonos"]

type PickerDateRange = [Dayjs | null, Dayjs | null]
type SearchDateRange = {
    from: Date | null | undefined,
    to: Date | null | undefined
}

export function SearchBar() {
    const [selected, setSelected] = React.useState<Date>();

    const [peopleCounter, setPeopleCounter] = React.useState(1)

    const [dateRange, setDateRange] = React.useState<SearchDateRange>({
        from: new Date(),
        to: undefined
    })

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }

    const dateRangeOnChange = ([from, to]: PickerDateRange) => {
        setDateRange({
            from: from?.toDate(),
            to: to?.toDate()
        })
    }
    console.log(dateRange)
    return (
        <div className='
            bg-white text-main-petrol border-2 
            border-main-petrol w-2/3 flex items-center 
            justify-between rounded-full
        '>
            <div className='flex justify-start items-center gap-1 p-2'>
                <FontAwesomeIcon icon={faLocationDot} size='lg' />
                <Autocomplete
                    placeholder="Χώρα"
                    options={countryOptions}
                    sx={{ width: 150 }}
                />
                <Autocomplete
                    placeholder="Πόλη"
                    options={countryOptions}
                    sx={{ width: 150 }}
                />
            </div>
            <div className='flex justify-start items-center gap-1 p-2 border-l-2 border-r-2 border-l-main-petrol border-r-main-petrol'>
                <FontAwesomeIcon icon={faCalendarDays} size='lg' />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateRangePicker value={[dayjs(dateRange.from), dayjs(dateRange.to)]} onChange={(v) => dateRangeOnChange(v)} localeText={{ start: 'Check-in', end: 'Check-out' }} />
                </LocalizationProvider>
            </div>
            <div className='flex justify-start items-center gap-1 p-2'>
                <FontAwesomeIcon icon={faUserGroup} size='lg' />
                <button className='bg-white rounded-full h-fit p-1' onClick={() => setPeopleCounter(peopleCounter - 1)} disabled={peopleCounter <= 1 ? true : false}><FontAwesomeIcon icon={faCaretDown} /></button>
                <p>{peopleCounter}</p>
                <button className='bg-white rounded-full h-fit p-1' onClick={() => setPeopleCounter(peopleCounter + 1)}><FontAwesomeIcon icon={faCaretUp} /></button>
            </div>
            <button className='bg-main-petrol text-white rounded-full h-fit px-4 py-3 text-xl'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
    )
}
