import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRangePicker, LocalizationProvider, StaticDateRangePicker, pickersLayoutClasses } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { dateToStr } from "../api/entities/dates";

type PickerDateRange = [Dayjs | null, Dayjs | null]

interface CalendarProps{
  dateRangesToDisable: {dateFrom: string, dateTo: string}[],
  onSelect: (dateRange : {dateFrom: string, dateTo: string}) => void
}

export function CalendarPickerHost({dateRangesToDisable,onSelect} : CalendarProps){
    
    const [dateRange, setDateRange] = useState<{dateFrom: string | null, dateTo: string | null}>({
        dateFrom: "" ,
        dateTo: ""
    })

    const dateRangeOnChange = ([from, to]: PickerDateRange) => {
      setDateRange({
          dateFrom: dateToStr(from?.toDate()),
          dateTo: dateToStr(to?.toDate())
      })
  }

    return(
      <div className='flex justify-start items-center gap-1 p-2 border-x-2 border-x-main-petrol'>
        <FontAwesomeIcon icon={faCalendarDays} size='xl' />
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateRangePicker
                value={[dayjs(dateRange.dateFrom), dayjs(dateRange.dateTo)]} 
                onChange={(v) => dateRangeOnChange(v)} 
                localeText={{ start: 'Check-in', end: 'Check-out' }}
                shouldDisableDate={(d) => {
                  for (const range of dateRangesToDisable) {
                    if ((d.isAfter(range.dateFrom) || d.isSame(range.dateFrom)) &&
                        (d.isBefore(range.dateTo) || d.isSame(range.dateTo))){
                          return true;
                        } 
                  }
                  return false;
                }}
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
    )
    
}