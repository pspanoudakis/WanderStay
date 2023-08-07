import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons';
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { CustomSlider } from "./CustomSlider";

export function SearchFilters() {

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
            value: 10000,
            label: '10000€',
        },
    ];

    return (
        <div className="flex flex-col w-1/3 border-2 border-main-petrol rounded-md h-full">
            <div className="flex border-b-2 border-main-petrol justify-center">
                <b>Φιλτράρισμα κατά:</b>
            </div>
            <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start mt-2 pl-3">
                <b>Ο συνολικός προϋπολογισμός σας:</b>
                <CustomSlider marks={marks}/>
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
    );
}
