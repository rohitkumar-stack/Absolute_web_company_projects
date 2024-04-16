import React, { useEffect } from 'react';
import { GET_LOGO } from '../../globals';

const MyComponent = () => {
    useEffect(() => {
        const fetchFaviconUrl = async () => {
            try {
                const response = await fetch(GET_LOGO);
                const data = await response.json();
                const faviconUrl = data.data.favicon; // Replace with the actual property name from your API response

                if (faviconUrl) {
                    
                    return faviconUrl;
                }
            } catch (error) {
                console.error('Error fetching favicon URL:', error);
                return null;
            }
        };

        const changeFavicon = async () => {
            const newFaviconUrl = await fetchFaviconUrl();

            if (newFaviconUrl) {
                const favicon = document.querySelector('link[rel="icon"]');
                if (favicon) {
                    favicon.href = newFaviconUrl;
                }
            }
        };
        // Call the function to change the favicon
        changeFavicon();

        // Clean up function (optional)
        return () => {
            // Revert the favicon to the original state or handle any cleanup
            changeFavicon('original_favicon_url.ico'); // Replace with the URL of your original favicon
        };
    }, []); // Empty dependency array to run the effect only once on component mount

    return (
        <></>
    );
};

export default MyComponent;