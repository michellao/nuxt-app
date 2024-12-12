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

export const extractCookieAuthenticate = (): CookieType => {
    let list: CookieType = {};
    Object.values(CookieName).forEach((cookieKey) => {
        const cookieValue = useCookie(cookieKey);
        if (cookieValue.value !== null) {
            list[cookieKey] = cookieValue.value;
        }
    });
    return list;
};
