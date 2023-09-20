import { Link } from "react-router-dom";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

const sectionLinks: {
    [sectionTitle: string]: {
        label: string,
        url: string
    }[]
} = {
    "Υποστήριξη": [
        {
            label: 'Κέντρο Βοήθειας',
            url: '/'
        },
        {
            label: 'Αναφορά Προβλήματος',
            url: '/'
        },
    ],
    "Φιλοξενία": [
        {
            label: 'Φόρουμ Κοινότητας',
            url: '/'
        },
        {
            label: 'Κάντε το χώρο σας WanderStay',
            url: ORDERED_BASE_ROLE_PATHS.HOST
        },
    ],
    "WanderStay": [
        {
            label: 'Απόρρητο',
            url: '/'
        },
        {
            label: 'Όροι',
            url: '/'
        },
        {
            label: 'Στοιχεία Εταιρείας',
            url: '/'
        },
    ],
}

const socialLinks: {
    icon: IconDefinition,
    url: string
}[] = [
    { icon: faFacebook, url: 'https://www.facebook.com/' },
    { icon: faInstagram, url: 'https://www.instagram.com/' },
    { icon: faGithub, url: 'https://github.com/pspanoudakis/AppBase' },
    { icon: faXTwitter, url: 'https://twitter.com/' },
]

export function Footer() {
    return (
        <footer className="border-t-2 border-light-petrol w-full py-2 mt-auto flex flex-col justify-center items-center">
            <div className="flex justify-between w-1/2 mt-4 mb-6">
                {
                    Object.entries(sectionLinks).map(([sectionTitle, links], i) => (
                        <div key={i} className="flex flex-col items-start">
                            <span className="text-xl font-bold">{sectionTitle}</span>
                            {
                                links.map(({label, url}, i) => (
                                    <Link 
                                        key={i}
                                        to={url} 
                                        className="text-lg duration-200 hover:text-dark-petrol"
                                    >
                                        {label}
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-between p-3 w-2/3 items-center border-t-2 border-light-petrol">
                <Link
                    to={ORDERED_BASE_ROLE_PATHS.GUEST}
                    className="text-main-petrol font-bold text-3xl duration-300 hover:text-dark-petrol"
                    style={{
                        fontFamily: 'Pacifico'
                    }}
                >
                    WanderStay
                </Link>
                <div className="flex text-main-petrol gap-5">
                    {
                        socialLinks.map(({icon, url}, i) => (
                            <a key={i} href={url} className="duration-200 hover:text-dark-petrol">
                                <FontAwesomeIcon icon={icon as IconProp} size="2xl"/>
                            </a>
                        ))
                    }
                </div>
                
            </div>
        </footer>
    )
}
