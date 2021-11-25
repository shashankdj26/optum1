export const LOCALSTORAGEVAR = {
    seenOrientation: 'seenOrientation',
    seenInitalFlow: 'seenInitalFlow',
    seenWelcomeCard: 'seenWelcomeCard',
    lastStallVisited: 'lastStallVisitedInitalFlow'
}

export const CheckForLocalVar = (localStorageVar) => {
    if (localStorage.getItem(`${localStorageVar}`)) {
        return true;
    } else {
        return false;
    }
}


export const setLocalVar = (localStorageVar, value = true) => {
    localStorage.setItem(`${localStorageVar}`, value)
}


