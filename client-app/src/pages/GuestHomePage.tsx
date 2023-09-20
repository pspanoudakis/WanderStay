import { useContext } from "react";
import { dateToStr } from "../api/entities/dates";
import { LandingPageCarousel } from "../components/LandingPageCarousel";
import { AppContext } from "../AppContext";
import { RoleType } from "../api/entities/RoleType";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";

export function GuestHomePage() {

    const userCtx = useContext(AppContext).state.businessContext.userContext;
    
    const searchDayFrom = new Date();
    const searchDayTo = new Date(searchDayFrom);
    searchDayTo.setDate(searchDayFrom.getDate() + 4);

    return (
        <div className="flex flex-col justify-start w-full h-max">
            <LandingPageCarousel
                content={[
                    {
                        title: 'Αναζητήστε Καταλύματα',
                        subtitle: 'Βρείτε το κατάλυμα που σας ταιριάζει χρησιμοποιώντας εξατομικευμένα κριτήρια αναζήτησης',
                        link: `${ORDERED_BASE_ROLE_PATHS.GUEST}/searchProperties?dateFrom=${dateToStr(searchDayFrom)}&dateTo=${dateToStr(searchDayTo)}&numPersons=2`,
                        linkLabel: 'Γρήγορη Αναζήτηση',
                        imgHrefs: [
                            'https://a0.muscache.com/im/pictures/miso/Hosting-53310269/original/2570a0a7-9cb3-4518-a9b2-070a3ffe809a.jpeg?im_w=1200',
                            'https://a0.muscache.com/im/pictures/miso/Hosting-841446731715397376/original/79a703ee-1dc9-422d-93e1-ec1ee8e2c623.jpeg?im_w=1200',
                        ]
                    },
                    (
                        userCtx ? (
                            userCtx.roles.includes(RoleType.GUEST) ?
                            {
                                title: 'Δείτε τις Κρατήσεις σας',
                                subtitle: 'Αναζητήστε επερχόμενες και παλαιότερες κρατήσεις',
                                link: `${ORDERED_BASE_ROLE_PATHS.GUEST}/reservations`,
                                linkLabel: 'Προβολή Κρατήσεων',
                                imgHrefs: [
                                    'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
                                ]
                            }
                            :
                            {
                                title: 'Γίνετε ενοικιαστής',
                                subtitle: 'Ως ενοικιαστής, μπορείτε να επισκεφθείτε καταλύματα σε όλο τον κόσμο μέσω του WanderStay',
                                link: `${ORDERED_BASE_ROLE_PATHS.GUEST}/profile`,
                                linkLabel: 'Επεξεργασία Προφίλ',
                                imgHrefs: [
                                    'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
                                ]
                            }
                        )
                        :
                        {
                            title: 'Γίνετε ενοικιαστής',
                            subtitle: 'Eπισκεφθείτε καταλύματα σε όλο τον κόσμο μέσω του WanderStay',
                            link: `/signUp`,
                            linkLabel: 'Εγγραφή',
                            imgHrefs: [
                                'https://blogs.bodleian.ox.ac.uk/sainsbury/wp-content/uploads/sites/104/2016/05/b.jpg',
                            ]
                        }                        
                    ),
                ]}
            />
        </div>
    )
}
