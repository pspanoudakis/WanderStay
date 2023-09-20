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
                                    'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
                                ]
                            },
                            {
                                title: 'Διαχειριστείτε τα Καταλύματά σας',
                                subtitle: 'Τροποποιήστε τις πληροφορίες των Καταλυμάτων σας ή προσθέστε φωτογραφίες',
                                link: `${ORDERED_BASE_ROLE_PATHS.HOST}/properties`,
                                linkLabel: 'Προβολή Καταλυμάτων',
                                imgHrefs: [
                                    'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
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
                                'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
                            ]
                        },
                    ]
                }
            />
        </div>
    )
}
