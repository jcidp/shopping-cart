import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AppLayout from "./components/AppLayout";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Shop from "./components/Shop";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppLayout />,
            errorElement: (
                <AppLayout>
                    <ErrorPage />
                </AppLayout>
            ),
            children: [
                {index: true, element: <Home />},
                {path: "shop", element: <Shop />},
            ]
        }
    ]);
    return <RouterProvider router={router} />;
}

export default Router;