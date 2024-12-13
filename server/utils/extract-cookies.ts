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

export const extractCookieAuthenticateFromServer = (event: Parameters<typeof getCookie>[0]) => {
    let list: CookieType = {};
    Object.values(CookieName).forEach((cookieKey) => {
        const cookieValue = getCookie(event, cookieKey);
        list[cookieKey] = cookieValue;
    });
    return list;
};
