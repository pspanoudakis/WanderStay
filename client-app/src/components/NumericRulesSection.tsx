import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropertyDetailedRules } from "../api/entities/propertyEnums";
import { faCalendarDays, faMoneyCheckDollar, faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Box, TextField } from "@mui/material";

interface NumericRulesProps{
    editable: boolean,
    field?: PropertyDetailedRules
    setAmenityFlags?: (flags: PropertyDetailedRules) => void,
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
                            defaultValue={props.field?.minReservationDays} 
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
                            defaultValue={props.field?.baseDayCost} 
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
                            defaultValue={props.field?.perGuestCost} 
                            />
                            </Box>
                    </div>
                </div> 
                :
                <div className="flex flex-col gap-2 items-start text-lg">
                    <div className="flex gap-2">
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        <span>{`${props.field?.minReservationDays + " " + "Ελάχιστος αριθμός ημερών,"}`} </span>
                    </div>
                    <div className="flex gap-2 ">
                        <FontAwesomeIcon icon={faMoneyCheckDollar}/>
                        <span>{`${props.field?.baseDayCost + " " + "Κόστος/ημέρα,"}`} </span>
                    </div>
                    <div className="flex gap-2">
                        <FontAwesomeIcon icon={faPersonCirclePlus}/>
                        <span>{`${props.field?.perGuestCost + " " + "Επιπλέον κόστος / επισκέπτη"}`} </span>
                    </div>
                </div>
            }
        </div>
    )
}