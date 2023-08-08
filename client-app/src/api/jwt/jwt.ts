const JWT_LOCAL_STORAGE_KEY = 'JWT_LOCAL_STORAGE_KEY';

export function updateJwt(newValue: string) {
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, newValue);
}

export function getJwt() {
    return localStorage.getItem(JWT_LOCAL_STORAGE_KEY) ?? undefined;
}

export function clearJwt() {
    localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
}
