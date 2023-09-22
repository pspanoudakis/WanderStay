import Carousel from "react-material-ui-carousel";
import { ImageEntity } from "../api/entities/ImageEntity";
import { Img } from "./Img";

export function ImagesCarousel({images}: {
    images: ImageEntity[]
}) {
    return (
        <Carousel
            className="flex-1 h-96"
            navButtonsAlwaysVisible={images.length > 1}
            navButtonsAlwaysInvisible={images.length <= 1}
            duration={600}
            interval={5000}
            stopAutoPlayOnHover={true}
        >
            {images.map(img => (
                <Img
                    key={img.imgId}
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
