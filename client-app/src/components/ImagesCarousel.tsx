import Carousel from "react-material-ui-carousel";
import { ImageEntity } from "../api/entities/ImageEntity";
import { Img } from "./Img";

export function ImagesCarousel({images}: {
    images: ImageEntity[]
}) {
    return (
        <Carousel
            className="w-full h-320"
            duration={750}
            interval={5000}
            stopAutoPlayOnHover={true}
        >
            {images.map(img => (
                <Img
                    className="rounded-xl"
                    imgId={img.imgId}
                    style={{
                        height: 360,
                    }}
                />
            ))}
        </Carousel>
    );
}
