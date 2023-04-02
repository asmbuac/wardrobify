import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const response = await fetch(url);
        try {
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setIsLoading(false);
                setError(null);
            }
        } catch (e) {
            setError(e);
        }

    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}

export default useFetch;
