import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { VBreadcrumbs, VBtn, VList } from 'vuetify/components';

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'light',
            themes: {
                light: {
                    dark: false,
                    colors: {
                        primary: "#34618E",
                        secondary: "#525F70",
                        "on-primary": "#FFFFFF",
                        "on-secondary": "FFFFFF",
                        surface: "#F8F9FF",
                        "on-surface": "#191C20",
                        background: "#F8F9FF",
                        "on-background": "#191C20",
                        error: "#BA1A1A",
                        "on-error": "#FFFFFF",
                    }
                }
            }
        },
        aliases: {
            VBtnSecondary: VBtn,
            VListCustom: VList,
            VBreadcrumbsCustom: VBreadcrumbs,
        },
        defaults: {
            VBtn: {
                color: 'primary',
                variant: 'flat'
            },
            VBtnSecondary: {
                color: 'secondary',
                variant: 'flat',
                rounded: 'xl',
                height: 40,
            },
            VBreadcrumbsCustom: {
                divider: '>'
            },
            VListCustom: {
                baseColor: 'primary',
                bgColor: 'background',
            },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi
            }
        },
    });
    app.vueApp.use(vuetify);
});
