export default defineEventHandler(async (event) => {
    const matcherPath = new RegExp("^/((?!_nuxt|__nuxt_.*|api/(auth|logout)-discord|api/users/@me))");
    if (event.path !== '/' && matcherPath.test(event.path)) {
        const cookies = extractCookieAuthenticateFromServer(event);
        const isAuth = typeof cookies["access-token"] === 'string' && typeof cookies["refresh-token"] === 'string' && await event.$fetch('/api/users/@me') !== null;
        if (!isAuth) {
            throw createError({
                statusCode: 403,
            });
        }
    }
});
