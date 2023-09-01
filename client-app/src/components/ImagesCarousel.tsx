import Carousel from "react-material-ui-carousel";
import { ImageEntity } from "../api/entities/ImageEntity";
import { Img } from "./Img";

export function ImagesCarousel({images}: {
    images: ImageEntity[]
}) {
    return (
        <Carousel
            className="flex-1 h-96"
            navButtonsAlwaysVisible
            duration={600}
            interval={5000}
            stopAutoPlayOnHover={true}
        >
            {images.map(img => (
                <Img
                    className="rounded-xl"
                    imgId={img.imgId}
                    style={{
                        height: 350,
                    }}
                />
            ))}
        </Carousel>
    );
}
