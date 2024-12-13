import { isAuth } from "../utils/authenticate";
import { extractCookieAuthenticateFromServer } from "../utils/extract-cookies";

export default defineEventHandler(async (event) => {
    const matcherPath = new RegExp("^/((?!_nuxt|__nuxt_.*|api/(auth|logout)-discord))");
    if (event.path !== '/' && matcherPath.test(event.path)) {
        const cookies = extractCookieAuthenticateFromServer(event);
        const isDisconnected = !(await isAuth(cookies));
        if (isDisconnected) {
            throw createError({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
    }
});
