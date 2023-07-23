function runWithDelay(callback) {
    setTimeout(
        callback,
        2000
    )
}
export function fetchUserCards(callback) {
    // fetchWrapper({
    //     endpoint: 'parent/cards',
    //     method: 'GET',
    //     omitAuthHeader: false,
    //     needAuth: false,
    //     callback
    // })
    runWithDelay(() => {
        const data = {

        };
        callback(data);
    })
}

// - navbar + search bar (GUEST)
// - property details page (GUEST) (
//      name ,host name, location, images, constraints, map, reviews, select reservation date, make reservation button/link
// )
// - make reservation page (GUEST (
//      property summary (use property search result component), reservation summary,        confirmation button
// )
// - search properties page (GUEST) (secondary filters, search results (show a summary for each result), pagination)
