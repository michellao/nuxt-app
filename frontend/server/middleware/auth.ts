import { isAuth } from "~/utils/auth";
import { extractCookieAuthenticateFromServer } from "../utils/extract-cookies";

export default defineEventHandler(async (event) => {
    const matcherPath = new RegExp("^\/((?!_nuxt|api\/auth-discord|api/logout-discord).*)");
    if (event.path !== '/' && matcherPath.test(event.path)) {
        const cookies = extractCookieAuthenticateFromServer(event);
        if (!isAuth(cookies)) {
            await sendRedirect(event, '/');
        }
    }
});
