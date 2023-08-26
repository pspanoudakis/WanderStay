import {} from '@fortawesome/free-solid-svg-icons';
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { CustomSlider } from "./CustomSlider";
import { PropertySearchFilters } from "../api/entities/searchPropertiesCriteria";
import { PropertyType } from "../api/entities/propertyEnums";
import { PropertyTypeLabels } from './utils/propertyFieldLabels';
import { PropertyFlagsCheckList } from './PropertyFlagsCheckList';
import { PrimaryButton } from './PrimaryButton';

export function SearchFilters({filters, setFilters, sliderMarks, onSearch}: {
    filters: PropertySearchFilters,
    setFilters: (newFilters: PropertySearchFilters) => void,    
    sliderMarks: number[],
    onSearch: () => void,
}) {
    
    return (
        <div className="flex flex-col w-1/3 border-2 border-main-petrol rounded-md h-full items-center divide-y divide-main-petrol">
            <div className="flex flex-row w-full justify-center items-center py-2 gap-2">
                <b>Επιλογές Αναζήτησης</b>
                <PrimaryButton
                    onClick={onSearch}
                >
                    Εφαρμογή
                </PrimaryButton>
            </div>
            <div className="flex flex-col justify-center px-3 w-full">
                <span className='font-semibold pt-1'>Ο ημερήσιος προϋπολογισμός σας</span>
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
            <div className="flex flex-col justify-center w-full px-3 mt-2">
                <span className='font-semibold pt-1'>Τύπος Δωματίου</span>
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
            <div className="flex flex-col justify-center w-full px-3 mt-2">
                <span className='font-semibold pt-1'>Παροχές</span>
                {/* {
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
                } */}
                <PropertyFlagsCheckList
                    fieldFlags={filters.amenityFilters}
                    setFieldFlags={amenities => {
                        setFilters({
                            ...filters,
                            amenityFilters: amenities
                        })
                    }}
                    editable
                />
            </div>
            <div className="flex flex-col justify-center w-full px-3 mt-2">
                <span className='font-semibold pt-1'>Κανόνες Ενοικίασης</span>
                {/* {
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
                } */}
                <PropertyFlagsCheckList
                    fieldFlags={filters.ruleFilters}
                    setFieldFlags={rules => {
                        setFilters({
                            ...filters,
                            ruleFilters: rules
                        })
                    }}
                    editable
                />
            </div>
        </div>
    );
}
