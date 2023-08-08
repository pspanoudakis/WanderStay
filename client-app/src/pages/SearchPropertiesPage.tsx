import { useCallback, useContext, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AppContext } from "../AppContext";
import { SearchFilters } from "../components/SearchFilters";
import { PropertyAmenityFilters, PropertyRuleFilters, PropertySearchFilters } from "../api/entities/searchPropertiesCriteria";
import { PropertyAmenity, PropertyRule } from "../api/entities/propertyEnums";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useSearchParams } from "react-router-dom";

export function SearchPropertiesPage() {

    const {
        state: { businessContext }
    } = useContext(AppContext);

    const [params, setParams] = useSearchParams();

    const [filters, setFilters] = useState<PropertySearchFilters>({
        maxCost: 100,
        type: undefined,
        amenityFilters: Object.values(PropertyAmenity).reduce(
            (filters, amenity) => {
                filters[amenity] = false;
                return filters;
            },
            {} as PropertyAmenityFilters
        ),
        ruleFilters: Object.values(PropertyRule).reduce(
            (filters, rule) => {
                filters[rule] = false;
                return filters;
            },
            {} as PropertyRuleFilters
        ),
    });

    const fetchProperties = useCallback(
        (pageNumber: number, pageSize: number) => {
            return fetch('');
        }
        , 
        [
            params,
            filters
        ]
    );

    return (
        <div className="flex w-full justify-start gap-10 mt-10 h-full">
            <SearchFilters
                filters={filters}
                setFilters={setFilters}
            />
            <PaginatedResultsWrapper
                pageSize={10}
                resultFetcher={fetchProperties}
                resultRenderer={(r) => <span>{String(r)}</span>}
            />
            {/* <div className="flex flex-col w-full gap-2">
                
                <h1 className="flex justify-start font-bold"> 
                 {businessContext.searchContext.city?.name ?? "Please Select a City"} : Βρέθηκαν {} καταλύματα
                </h1>
                <div className="flex justify-end ">
                <Pagination count={5} size="small" color="primary"/>
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
            </div> */}
        </div>
    );
}
