import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { dateToStr } from "../api/entities/dates";
import { AvailableTimeSlot } from "../api/entities/AvailableTimeSlot";
import { PrimaryButton } from "./PrimaryButton";
import { Checklist } from "./Checklist";

type SlotListItemProps = {
    slot: AvailableTimeSlot
};

function SlotListItem(props: SlotListItemProps) {
    return (
        <span className="flex-1 text-start">
            {props.slot.startDate.replaceAll('-', '/')} - {props.slot.endDate.replaceAll('-', '/')}
        </span>
    );
}

type PickerDateRange = [Dayjs | null, Dayjs | null];

interface CalendarProps {
    selectedSlots: AvailableTimeSlot[],
    setSelectedSlots: (slots: AvailableTimeSlot[]) => void
};

export function PropertyAvailableSlotsSelectorSection({ selectedSlots, setSelectedSlots }: CalendarProps) {

    const [dateRange, setDateRange] = useState<{ dateFrom: string | null, dateTo: string | null }>({
        dateFrom: null,
        dateTo: null
    })

    const onSelect = () => {
        if (dateRange.dateFrom && dateRange.dateTo) {
            setSelectedSlots(
                [
                    ...selectedSlots,
                    {
                        startDate: dateRange.dateFrom, 
                        endDate: dateRange.dateTo
                    }
                ].sort((s1, s2) => (
                    dayjs(s1.startDate).millisecond() - dayjs(s2.startDate).millisecond()
                ))
            );
        }
    }

    const dateRangeOnChange = ([from, to]: PickerDateRange) => {
        setDateRange({
            dateFrom: dateToStr(from?.toDate()),
            dateTo: dateToStr(to?.toDate())
        })
    }

    return (
        <div className='flex flex-col justify-start items-center gap-2 p-2'>
            <div className="flex gap-2 items-center">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateRangePicker
                        value={[dayjs(dateRange.dateFrom), dayjs(dateRange.dateTo)]}
                        onChange={(v) => dateRangeOnChange(v)}
                        localeText={{ start: 'Check-in', end: 'Check-out' }}
                        shouldDisableDate={(d) => {
                            for (const slot of selectedSlots) {
                                if ((d.isAfter(slot.startDate) || d.isSame(slot.startDate)) &&
                                    (d.isBefore(slot.endDate) || d.isSame(slot.endDate))) {
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
                <PrimaryButton
                    onClick={onSelect}
                    disabled={!(dateRange.dateFrom && dateRange.dateTo)}
                >
                    Προσθήκη Διαστήματος
                </PrimaryButton>
            </div>
            <Checklist
                items={selectedSlots}
                setItems={setSelectedSlots}
                itemRenderer={slot => <SlotListItem slot={slot}/>}
                placeholder="Δεν έχουν επιλεγεί Διαστήματα."
                title="Επιλεγμένα διαθέσιμα Διαστήματα"
            />
        </div>
    );
}
