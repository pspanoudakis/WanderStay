import { Link } from "react-router-dom";
import { PropertyHostSidePreview } from "../api/responses/PropertyHostSidePreview";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { PropertyTypeLabels } from "./utils/propertyFieldLabels";
import { Card, CardActionArea } from "@mui/material";
import { Img } from "./Img";

export function PropertyHostSidePreviewTile({property}: {
    property: PropertyHostSidePreview
}) {
    return (
        <Link to={`${ORDERED_BASE_ROLE_PATHS.HOST}/property/${property.propertyId}`}>
            <div className="border-2 border-main-petrol rounded-lg">
                <Card
                    sx={{ 
                        display: "flex",
                        justifyContent:"space-between",
                        padding: '1rem'
                    }}
                >
                    <CardActionArea sx={{ display: "flex", justifyContent:"start"}}>
                        <Img
                            imgId={property.imgId}
                            height={160}
                            className='rounded-lg'
                            alt={`img${property.propertyId}`} 
                        />
                        <div className="flex flex-col items-start m-2 p-2 w-3/5 h-full">
                            <div className="flex w-full justify-start">
                                <span className='text-lg font-bold'>
                                    {property.title}
                                </span>
                            </div>
                            <div className='flex-1 w-full flex flex-col justify-center gap-2 items-start border-l-2 border-main-petrol pl-3 mt-2'>
                                <span className="flex gap-2 items-center text-base">
                                    <FontAwesomeIcon icon={faLocationDot} size="lg"/>
                                    {property.location}
                                </span>
                                <span className="flex gap-2 items-center text-base">
                                    {PropertyTypeLabels[property.propertyType].icon}
                                    {PropertyTypeLabels[property.propertyType].label}
                                </span>
                                {
                                    property.reviewsSummary.reviewCount ?
                                    <div className="flex w-full flex-1 items-end justify-end">
                                        <div className='flex items-center gap-1 text-xl'> 
                                            <span className="font-bold ">{property.reviewsSummary.avgStars}</span>
                                            <FontAwesomeIcon icon={faStar} className="text-dark-petrol" />
                                            ({property.reviewsSummary.reviewCount})
                                        </div>
                                    </div>
                                    :
                                    null                                
                                }
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        </Link> 
    );
}
