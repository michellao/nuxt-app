import { CookieName } from "~/utils/cookieName";

export default defineEventHandler(async (event) => {
    const matcherPath = new RegExp("^\/((?!_nuxt|api\/auth-discord).*)");
    if (event.path !== '/' && matcherPath.test(event.path)) {
        const accessToken = getCookie(event, CookieName.AccessToken);
        const refreshToken = getCookie(event, CookieName.RefreshToken);
        const expiresIn = getCookie(event, CookieName.ExpiresIn);
        const isAuth = typeof accessToken === 'string' && typeof refreshToken === 'string'
        && typeof expiresIn === 'string';
        console.log(event.path);
        console.log("Middleware: " + !isAuth);
        if (!isAuth) {
            await sendRedirect(event, '/');
        }
    }
});