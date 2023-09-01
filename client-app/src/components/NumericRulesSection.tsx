import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropertyDetailedRules } from "../api/entities/propertyEnums";
import { faCalendarDays, faMoneyCheckDollar, faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Box, TextField } from "@mui/material";

interface NumericRulesProps{
    editable: boolean,
    rules: PropertyDetailedRules
    setRules?: (newRules: PropertyDetailedRules) => void,
}

export function NumericRulesSection(props: NumericRulesProps){
    return(
        <div className="col-span-1">
            {
                props.editable?
                <div className="flex gap-3 items-start flex-col w-full">
                    <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faCalendarDays} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                id="standard-basic" 
                                label="Ελάχιστος αριθμός ημερών" 
                                variant="standard" 
                                type="number"
                                value={props.rules.minReservationDays}
                                onChange={(e) => {
                                    props.setRules?.({
                                        ...props.rules,
                                        minReservationDays: Number(e.target.value)
                                    })
                                }}
                            />
                        </Box>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                id="standard-basic" 
                                label="Κόστος/ημέρα" 
                                variant="standard" 
                                type="number"
                                value={props.rules.baseDayCost}
                                onChange={(e) => {
                                    props.setRules?.({
                                        ...props.rules,
                                        baseDayCost: Number(e.target.value)
                                    })
                                }}
                            />
                        </Box>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faPersonCirclePlus} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                id="standard-basic" 
                                label="Επιπλέον κόστος / επισκέπτη" 
                                variant="standard" 
                                type="number"
                                value={props.rules.perGuestCost}
                                onChange={(e) => {
                                    props.setRules?.({
                                        ...props.rules,
                                        perGuestCost: Number(e.target.value)
                                    })
                                }}
                            />
                        </Box>
                    </div>
                </div> 
                :
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faCalendarDays} size="lg"/>
                        <span>Ελάχιστες Μέρες Ενοικίασης: 
                            <span className="font-bold text-lg"> {props.rules?.minReservationDays}</span>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} size="lg"/>
                        <span>Κόστος/ημέρα:
                            <span className="font-bold text-lg"> {props.rules?.baseDayCost}€</span>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faPersonCirclePlus} size="lg"/>
                        <span>Επιπλέον κόστος / επισκέπτη: 
                            <span className="font-bold text-lg"> {props.rules?.perGuestCost}€</span>
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}