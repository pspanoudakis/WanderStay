import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

export function LandingPageCarousel({content}: {
    content: {
        title: string,
        subtitle: string,
        linkLabel: string,
        link: string,
        imgHrefs: string[],
    }[]
}) {
    return (
        <Carousel
            className="flex-1"
            height='30rem'
            duration={600}
            interval={5000}
            stopAutoPlayOnHover={true}
        >
            {
                content.map(({ title, subtitle, link, linkLabel, imgHrefs }, i) => (
                    <div 
                        key={i}
                        className="flex w-full h-full rounded-2xl overflow-hidden"
                    >
                        <div 
                            style={{
                                width: '70%'
                            }}
                            className={`gap-0 h-full grid grid-rows-1 grid-cols-${imgHrefs.length}`}
                        >
                        {
                            imgHrefs.map((url, i) => (
                                <img 
                                    key={i} src={url} alt={`${i}`} 
                                    className="h-full w-full row-span-1 col-span-1 object-cover"
                                />
                            ))
                        }
                        </div>
                        <div 
                            style={{
                                width: '30%'
                            }}
                            className="gap-3 justify-start flex flex-col items-start bg-dark-petrol text-white px-8 pt-14"
                        >
                            <span className="text-start text-2xl">{title}</span>
                            <span className="text-start text-base">{subtitle}</span>
                            <Link 
                                className="text-lg w-max rounded-lg px-4 py-2 border-2 border-white duration-200 hover:shadow-lg" 
                                to={link}
                            >
                                {linkLabel}
                            </Link>
                        </div>
                    </div>
                ))
            }
        </Carousel>
    );
}
