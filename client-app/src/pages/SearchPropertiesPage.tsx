import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { AppContext } from "../AppContext";

export function SearchPropertiesPage() {

const marks = [
    {
        value: 0,
        label: '0€',
    },
    {
        value: 20,
        label: '20€',
    },
    {
        value: 50,
        label: '50€',
    },
    {
        value: 100,
        label: '100€',
    },
    ];

    function valuetext(value: number) {
    return `${value}€`;
    }

    const {
        state: { businessContext }
    } = useContext(AppContext);

    
    return (
        <div className="flex w-full justify-start gap-10 mt-10 h-full">
            <div className="flex flex-col w-1/3 border-2 border-main-petrol rounded-md h-full">
                <div className="flex border-b-2 border-main-petrol justify-center">
                    <b>Φιλτράρισμα κατά:</b>
                </div>
                <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start mt-2 pl-3">
                    <b>Ο συνολικός προϋπολογισμός σας:</b>
                    <Box sx={{ width: 300 }}>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                    </Box>
                </div>
                <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start pl-3 mt-2">
                    <b>Τύπος Δωματίου:</b>
                    <CheckboxWithLabel label="Ιδιωτικό Δωμάτιο"/>
                    <CheckboxWithLabel label="Κοινόχρηστο Δωμάτιο"/>
                    <CheckboxWithLabel label="Ολόκληρη Κατοικία"/>
                </div>
                <div className="flex flex-col justify-center items-start pl-3 mt-2">
                    <b>Παροχές:</b>
                    <CheckboxWithLabel label="Ασύρματο Ίντερνετ"/>
                    <CheckboxWithLabel label="Ψύξη"/>
                    <CheckboxWithLabel label="Θέρμανση"/>
                    <CheckboxWithLabel label="Τηλεόραση"/>
                    <CheckboxWithLabel label="Χώρος Στάθμευσης"/>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2">
                
                <h1 className="flex justify-start font-bold"> 
                 {businessContext.searchContext.city?.name ?? "Please Select a City"} : Βρέθηκαν {} καταλύματα
                </h1>
                <div className="flex justify-end ">
                <Stack spacing={3}>
                    <Pagination count={5} size="small" color="primary" />
                </Stack>
                </div>

                <div className="flex border-2 shadow-lg">
                    <div placeholder="img">

                    </div>
                    <div className="flex flex-col border-l-2 border-main-petrol">
                        Hotel Peachy
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
