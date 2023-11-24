import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Landing from "./components/Landing";

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
                {index: true, element: <Landing />},
            ]
        }
    ]);
    return <RouterProvider router={router} />;
}

export default Router;