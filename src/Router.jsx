import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Shop from "./components/Shop";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Header />,
            errorElement: (
                <Header>
                    <ErrorPage />
                </Header>
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