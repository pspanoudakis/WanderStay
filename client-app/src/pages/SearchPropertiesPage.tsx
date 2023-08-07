import { useContext, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AppContext } from "../AppContext";
import { SearchFilters } from "../components/SearchFilters";
import { PropertySearchFilters } from "../api/entities/SearchPropertiesRequest";
import { PropertyAmenity, PropertyRule } from "../api/entities/enums";

export function SearchPropertiesPage() {

    const {
        state: { businessContext }
    } = useContext(AppContext);

    const [filters, setFilters] = useState<PropertySearchFilters>({
        maxCost: 100,
        amenityFilters: Object.values(PropertyAmenity).reduce(
            (filters, amenity) => {
                filters[amenity] = false;
                return filters;
            },
            {} as {[amenity in PropertyAmenity]: boolean}
        ),
        ruleFilters: Object.values(PropertyRule).reduce(
            (filters, rule) => {
                filters[rule] = false;
                return filters;
            },
            {} as {[amenity in PropertyRule]: boolean}
        ),
    });

    return (
        <div className="flex w-full justify-start gap-10 mt-10 h-full">
            <SearchFilters
                filters={filters}
                setFilters={setFilters}
            />
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
