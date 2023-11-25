import { useEffect, useState } from "react";

const useFetchAPI = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAPI() {
            try {
                const response = await fetch(url, options);
                if(response.status >= 400) {
                    throw new Error("server error");
                }
                const data = await response.json();
                setData(data);
            } catch(error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAPI();
    }, [url, options]);

    return {data, error, isLoading};
}

export default useFetchAPI;