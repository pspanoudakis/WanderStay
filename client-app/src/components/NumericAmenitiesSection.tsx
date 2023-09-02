import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropertyDetailedAmenities } from "../api/entities/propertyEnums";
import { faBed, faBathtub, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Box, TextField } from "@mui/material";

interface NumericAmenitiesProps{
    editable: boolean,
    amenities: PropertyDetailedAmenities,
    setAmenities?: (newAmenities: PropertyDetailedAmenities) => void,
}

export function NumericAmentitiesSection(props: NumericAmenitiesProps){
    return(
        <div className="col-span-1">
            {
                props.editable?
                <div className="flex gap-3 items-end justify-center flex-col w-full">
                    <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faBed} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                id="standard-basic" 
                                label="Κρεβάτια" 
                                variant="standard" 
                                type="number"
                                value={props.amenities.numBeds}
                                onChange={(e) => {
                                    props.setAmenities?.({
                                        ...props.amenities,
                                        numBeds: Number(e.target.value)
                                    })
                                }}
                            />
                        </Box>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faDoorOpen} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            sx={{
                            '& > :not(style)': { fontSize: '16', fontWeight: 'bold'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                id="standard-basic" 
                                label="Δωμάτια" 
                                variant="standard" 
                                type="number"
                                value={props.amenities.numBedrooms}
                                onChange={(e) => {
                                    props.setAmenities?.({
                                        ...props.amenities,
                                        numBedrooms: Number(e.target.value)
                                    })
                                }}
                            />
                        </Box>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faBathtub} size="xl" className="pt-4"/>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                                id="standard-basic" 
                                label="Μπάνια" 
                                variant="standard" 
                                type="number"
                                value={props.amenities.numBathrooms}
                                onChange={(e) => {
                                    props.setAmenities?.({
                                        ...props.amenities,
                                        numBathrooms: Number(e.target.value)
                                    })
                                }}
                            />
                        </Box>
                    </div>
                </div> 
                :
                <div className="flex flex-col gap-2 items-start w-full">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faBed} size="lg"/>
                        <span className="font-bold text-lg">{props.amenities.numBeds}</span> κρεβάτια
                    </div>
                    <div className="flex items-center" style={{gap: '0.65rem'}}>
                        <FontAwesomeIcon icon={faDoorOpen} size="lg"/>
                        <span className="font-bold text-lg">{props.amenities.numBedrooms}</span> δωμάτια          
                    </div>
                    <div className="flex items-center" style={{gap: '0.8rem'}}>
                        <FontAwesomeIcon icon={faBathtub} size="lg"/>
                        <span className="font-bold text-lg">{props.amenities.numBathrooms}</span> μπάνια
                    </div>
                </div>
            }
        </div>
    )
}
