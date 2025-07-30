const services = () => {

    const _apiUrl = 'https://pixabay.com/api/videos/?key=51491907-60b56695abcda45f567adef59';

    const getData = async (url) => {
        try {
            const response = await fetch(_apiUrl + url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    return { getData};
};

export default services;