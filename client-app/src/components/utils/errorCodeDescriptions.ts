export const ErrorCodeDescriptions: {[errorCode: string]: string | undefined} = {
    INSUFFICIENT_CAPACITY: 
        'Το κατάλυμα δεν υποστηρίζει τον επιλεγμένο αριθμό ατόμων.',
    MIN_DURATION_UNSATISFIED: 
        'Το κατάλυμα απαιτεί μεγαλύτερη ελάχιστη διάρκεια κράτησης.',
    UNAVAILABLE_DURING_DATE_RANGE: 
        'Το κατάλυμα δεν είναι διαθέσιμο για το επιλεγμένο διάστημα.',
    NO_RESERVATION_HISTORY: 
        'Πρέπει να έχετε κάνει κράτηση σε ένα κατάλυμα για να το βαθμολογήσετε.'
};
