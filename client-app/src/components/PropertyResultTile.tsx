import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";

interface PropertyResultTileProps{
    propertyPreview: {
        propertyId: number,
        imgSrc: string,
        title :string,
        description: string,
        nofBeds: number,
        pricePerNight: number,
        totalPrice: number,
        reviewRate: number,
        nofReviews: number,
    },
}

export function PropertyResultTile(props: PropertyResultTileProps){
   
    const propertyPreview = props.propertyPreview;
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
                        {/* <CardMedia
                            component="img"
                            height="50"
                            image={propertyPreview.imgSrc}
                            alt="hotel"
                        /> */}
                        <img 
                            className='h-40 rounded-lg'
                            src={propertyPreview.imgSrc} 
                            alt={`img${propertyPreview.propertyId}`} 
                        />
                        <div className="flex flex-col items-start m-2 p-2 w-full h-full">
                            <div className="flex w-full justify-between gap-8">
                                <span className='text-lg font-bold'>
                                    {propertyPreview.title}
                                </span>
                                <h1 className='font-bold'> 
                                    <FontAwesomeIcon icon={faStar} size='lg' className="text-dark-petrol" />
                                    {propertyPreview.reviewRate} - {propertyPreview.nofReviews}
                                </h1>
                            </div>
                            <div className='flex-1 w-full flex flex-col justify-between items-start border-l-2 border-main-petrol pl-3 mt-2'>
                                <span className="text-sm">{propertyPreview.description}</span>
                                <span className="text-sm">{propertyPreview.nofBeds} κρεβάτια</span>
                                <div className="flex w-full justify-between">
                                    <span className="text-sm">{propertyPreview.pricePerNight}€/διανυκτέρευση</span>
                                    <b><h1>{propertyPreview.totalPrice}$ </h1></b>
                                </div>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        </Link>     
    )
}