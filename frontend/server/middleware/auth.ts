import { isAuth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
    const matcherPath = new RegExp("^\/((?!_nuxt|api\/auth-discord).*)");
    if (event.path !== '/' && matcherPath.test(event.path)) {
        if (!isAuth()) {
            await sendRedirect(event, '/');
        }
    }
});