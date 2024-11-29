import { isAuth } from "~/utils/auth";
import { extractCookieAuthenticateFromServer } from "../utils/extract-cookies";

export default defineEventHandler(async (event) => {
    const matcherPath = new RegExp("^/((?!_nuxt|__nuxt_.*|api/(auth|logout)-discord))");
    if (event.path !== '/' && matcherPath.test(event.path)) {
        const cookies = extractCookieAuthenticateFromServer(event);
        if (!isAuth(cookies)) {
            throw createError({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
    }
});
