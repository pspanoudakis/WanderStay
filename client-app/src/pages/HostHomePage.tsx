import { useContext } from "react";
import { LandingPageCarousel } from "../components/LandingPageCarousel";
import { AppContext } from "../AppContext";
import { RoleType } from "../api/entities/RoleType";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";

export function HostHomePage() {

    const userCtx = useContext(AppContext).state.businessContext.userContext;

    return (
        <div className="flex flex-col justify-start w-full h-max">
            <LandingPageCarousel
                content={
                    userCtx ? (
                        userCtx.roles.includes(RoleType.HOST) ? [
                            {
                                title: 'Δείτε τις Κρατήσεις στα Καταλύματά σας',
                                subtitle: 'Αναζητήστε επερχόμενες και παλαιότερες κρατήσεις στα Καταλύματά σας',
                                link: `${ORDERED_BASE_ROLE_PATHS.HOST}/reservations`,
                                linkLabel: 'Προβολή Κρατήσεων',
                                imgHrefs: [
                                    'https://assets.website-files.com/5dc393eb429c1ad690f7818d/5ebef44ce7a4905d6827c6f9_calculating-virtual-assistant-costs.jpg',
                                    'https://trendyfoxstudio.com/cdn/shop/products/airbnb-host-thank-you-card-canva-template-vera-688569.jpg?v=1685631528',
                                ]
                            },
                            {
                                title: 'Διαχειριστείτε τα Καταλύματά σας',
                                subtitle: 'Τροποποιήστε τις πληροφορίες των Καταλυμάτων σας ή προσθέστε φωτογραφίες',
                                link: `${ORDERED_BASE_ROLE_PATHS.HOST}/properties`,
                                linkLabel: 'Προβολή Καταλυμάτων',
                                imgHrefs: [
                                    'https://media1.popsugar-assets.com/files/thumbor/Uj3vTsyyx8M_QdP35J6RmxUG06E/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/12/09/817/n/1922794/1c71dc7c1e79025f_17/i/Jamie-Foxx-Miami-Airbnb-Mansion.png',
                                    'https://cdn.lifehack.org/wp-content/uploads/2017/09/malibu-dream.jpg',
                                ]
                            },
                        ]
                        :
                        [{
                            title: 'Γίνετε Οικοδεσπότης',
                            subtitle: 'Ως οικοδεσπότης, μπορείτε να προσφέρετε τα καταλύματά σας για ενοικίαση μέσω του WanderStay',
                            link: `${ORDERED_BASE_ROLE_PATHS.HOST}/profile`,
                            linkLabel: 'Επεξεργασία Προφίλ',
                            imgHrefs: [
                                'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
                            ]
                        }]
                    )
                    :
                    [
                        {
                            title: 'Γίνετε Οικοδεσπότης',
                            subtitle: 'Προσφέρετε τα καταλύματά σας για ενοικίαση μέσω του WanderStay',
                            link: `/signUp`,
                            linkLabel: 'Εγγραφή',
                            imgHrefs: [
                                'https://turno.com/wp-content/uploads/2021/07/image9-1024x683.jpg',
                                'https://trendyfoxstudio.com/cdn/shop/products/airbnb-host-thank-you-card-canva-template-vera-688569.jpg?v=1685631528',
                            ]
                        },
                    ]
                }
            />
        </div>
    )
}
