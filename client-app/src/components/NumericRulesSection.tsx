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
        <div>
            {
                props.editable?
                <div className="flex gap-3 items-start flex-col">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCalendarDays} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 1},
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                style={{width: "15rem"}}
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
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 1,fontSize: '16', fontWeight: 'bold'},
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                style={{width: "15rem"}}
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
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faPersonCirclePlus} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { m: 1},
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                style={{width: "15rem"}}
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
                <div className="flex flex-col gap-2 items-start text-lg">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        <span>{"Ελάχιστη Διάρκεια Ενοικίασης: " + props.rules?.minReservationDays} </span>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <FontAwesomeIcon icon={faMoneyCheckDollar}/>
                        <span>{`${props.rules?.baseDayCost + " " + "Κόστος/ημέρα,"}`} </span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faPersonCirclePlus}/>
                        <span>{`${props.rules?.perGuestCost + " " + "Επιπλέον κόστος / επισκέπτη"}`} </span>
                    </div>
                </div>
            }
        </div>
    )
}