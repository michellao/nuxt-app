import { CookieName } from "./cookieName";

const isAuth = () => {
    const accessToken = useCookie(CookieName.AccessToken);
    const refreshToken = useCookie(CookieName.RefreshToken);
    const expiresIn = useCookie(CookieName.ExpiresIn);
    return typeof accessToken.value === 'string' && typeof refreshToken.value === 'string'
        && typeof expiresIn.value === 'number'
};

export { isAuth };