import { CookieName } from "~/utils/cookieAuth";

export default defineEventHandler(async (event) => {
    const cookiesKey = [
        CookieName.AccessToken,
        CookieName.RefreshToken,
        CookieName.ExpiresIn,
        CookieName.TokenType,
        CookieName.Scope
    ];
    cookiesKey.forEach((key) => {
        const cookie = getCookie(event, key);
        if (cookie && typeof cookie === 'string') {
            deleteCookie(event, key);
        }
    });
    await sendRedirect(event, '/');
});