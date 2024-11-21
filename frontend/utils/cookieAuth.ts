export enum CookieName {
    AccessToken = 'access-token',
    RefreshToken = 'refresh-token',
    ExpiresIn = 'expires-in',
    TokenType = 'token-type',
    Scope = 'scope',
}

export type CookieType = {
    [K in CookieName]+?: string
};

export const extractCookieAuthenticateFromServer = (event: Parameters<typeof getCookie>[0]): CookieType => {
    let list = {};
    Object.values(CookieName).forEach((cookieKey) => {
        const cookieValue = getCookie(event, cookieKey);
        Object.defineProperty(list, cookieKey, {
            value: cookieValue
        });
    }) 
    return list as CookieType;
};

export const extractCookieAuthenticate = (): CookieType => {
    let list = {};
    Object.values(CookieName).forEach((cookieKey) => {
        const cookieValue = useCookie(cookieKey);
        Object.defineProperty(list, cookieKey, {
            value: cookieValue.value
        });
    }) 
    return list as CookieType;
};