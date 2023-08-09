import {} from '@fortawesome/free-solid-svg-icons';
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { CustomSlider } from "./CustomSlider";
import { PropertySearchFilters } from "../api/entities/searchPropertiesCriteria";
import { PropertyAmenity, PropertyRule, PropertyType } from "../api/entities/propertyEnums";
import { PropertyAmenityLabels, PropertyRuleLabels, PropertyTypeLabels } from './utils/propertyFieldLabels';

export function SearchFilters({filters, setFilters, sliderMarks}: {
    filters: PropertySearchFilters,
    setFilters: (newFilters: PropertySearchFilters) => void,    
    sliderMarks: number[]
}) {
    
    return (
        <div className="flex flex-col w-1/3 border-2 border-main-petrol rounded-md h-full">
            <div className="flex border-b-2 border-main-petrol justify-center">
                <b>Φιλτράρισμα κατά:</b>
            </div>
            <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start mt-2 pl-3">
                <b>Ο ημερήσιος προϋπολογισμός σας:</b>
                <CustomSlider 
                    marks={sliderMarks.map((c, i) => {
                        return {
                            value: c,
                            label: `${c}€${i === sliderMarks.length - 1  ? '+' : ''}`
                        };
                    })}
                    setValue={val => 
                        setFilters({
                            ...filters,
                            maxCostPerDay: val
                        })
                    }
                    value={filters.maxCostPerDay}
                />
            </div>
            <div className="flex flex-col border-b-2 border-main-petrol justify-center items-start pl-3 mt-2">
                <b>Τύπος Δωματίου:</b>
                {
                    Object.values(PropertyType).map((type, i) => 
                        <CheckboxWithLabel 
                            key={i}
                            label={PropertyTypeLabels[type].label}
                            icon={PropertyTypeLabels[type].icon}
                            isChecked={filters.type === type}
                            setIsChecked={isChecked => 
                                setFilters({
                                    ...filters,
                                    type: isChecked ? type : undefined
                                })
                            }
                        />
                    )
                }
            </div>
            <div className="flex flex-col justify-center items-start pl-3 mt-2">
                <b>Παροχές:</b>
                {
                    Object.values(PropertyAmenity).map((amenity, i) => 
                        <CheckboxWithLabel 
                            key={i}
                            label={PropertyAmenityLabels[amenity].label}
                            icon={PropertyAmenityLabels[amenity].icon}
                            isChecked={filters.amenityFilters[amenity]}
                            setIsChecked={isChecked => 
                                setFilters({
                                    ...filters,
                                    amenityFilters: {
                                        ...filters.amenityFilters,
                                        [amenity]: isChecked
                                    }
                                })
                            }
                        />
                    )
                }
            </div>
            <div className="flex flex-col justify-center items-start pl-3 mt-2">
                <b>Κανόνες Ενοικίασης:</b>
                {
                    Object.values(PropertyRule).map((rule, i) => 
                        <CheckboxWithLabel 
                            key={i}
                            label={PropertyRuleLabels[rule].label}
                            icon={PropertyRuleLabels[rule].icon}
                            isChecked={filters.ruleFilters[rule]}
                            setIsChecked={isChecked => 
                                setFilters({
                                    ...filters,
                                    ruleFilters: {
                                        ...filters.ruleFilters,
                                        [rule]: isChecked
                                    }
                                })
                            }
                        />
                    )
                }
            </div>
        </div>
    );
}
