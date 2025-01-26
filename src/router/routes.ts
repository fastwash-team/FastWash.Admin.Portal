import { createBrowserRouter } from "react-router-dom";

// Layout
import {
    AuthenticatedLayout,
    // OnboardingLayout
} from "@/layout"

// Pages
import {
    LoginPage, 
    DashboardPage, 
    VerifyAuthPage
} from "@/router/pages";


// Paths

import {
    ADMIN_DASHBOARD,
    ADMIN_LOGIN,
    // ADMIN_FAQS,
    // ADMIN_TERMS_AND_CONDITIONS,
    ADMIN_VERIFY_AUTH
} from "@/router/paths";

const appRoutes = createBrowserRouter([
    {
        Component: AuthenticatedLayout,
        children: [
            {
                path: ADMIN_DASHBOARD,
                Component: DashboardPage,
            },
            // {
            //     path: ADMIN_FAQS,
            //     Component: DashboardPage,
            // },
        ],
    },
    {
        path: ADMIN_VERIFY_AUTH,
        Component: VerifyAuthPage,
    },
    {
        path: ADMIN_LOGIN,
        Component: LoginPage,
    },
])

export default appRoutes;

