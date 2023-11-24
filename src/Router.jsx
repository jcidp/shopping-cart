import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";

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
            ]
        }
    ]);
    return <RouterProvider router={router} />;
}

export default Router;