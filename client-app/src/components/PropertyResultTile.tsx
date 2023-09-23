import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import { Img } from './Img';
import { PropertySearchResult } from '../api/responses/PropertySearchResult';
import { PropertyTypeLabels } from './utils/propertyFieldLabels';

interface PropertyResultTileProps{
    propertyPreview: PropertySearchResult,
}

export function PropertyResultTile(props: PropertyResultTileProps){
   
    const propertyPreview = props.propertyPreview;

    function createNumBedsLabel(nof : number){
        if (nof === 1){
            return nof + " " + "κρεβάτι";
        }
        return nof + " " + "κρεβάτια";
    }

    return (
        <Link to={`/property/${propertyPreview.propertyId}`}>
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
                            imgId={propertyPreview.imgId}
                            height={160}
                            className='rounded-lg'
                            alt={`img${propertyPreview.propertyId}`} 
                        />
                        <div className="flex flex-col items-start m-2 p-2 w-3/5 h-full">
                            <div className="flex w-full justify-between gap-8">
                                <span className='text-lg font-bold'>
                                    {propertyPreview.title}
                                </span>
                                {
                                    propertyPreview.reviewsSummary.reviewCount ?
                                    <div className='flex items-center gap-1 text-lg'> 
                                        <span className="font-bold ">{propertyPreview.reviewsSummary.avgStars}</span>
                                        <FontAwesomeIcon icon={faStar} className="text-dark-petrol" />
                                        <span className='text-base'>({propertyPreview.reviewsSummary.reviewCount})</span>                                    
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className='flex-1 w-full flex flex-col justify-between items-start border-l-2 border-main-petrol pl-3 mt-2'>
                                <span className="text-sm">{PropertyTypeLabels[propertyPreview.propertyType].label}</span>
                                <span className="text-sm">{createNumBedsLabel(propertyPreview.numBeds)}</span>
                                <div className="flex w-full justify-between">
                                    <span className="text-sm font-semibold">{propertyPreview.pricePerNight}€/διανυκτέρευση</span>
                                    <b><h1 className='text-2xl'>{propertyPreview.totalPrice}€ </h1></b>
                                </div>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        </Link>     
    )
}
