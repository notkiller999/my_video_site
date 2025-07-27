const services = () => {
    const getData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const createSlide = (data, wrapper) => {
        data.hits.forEach(video => {            

                const slide = `
                    <div class="slider-item h-full ml-2 mr-2 transition-all hover:scale-110" >
                        <div>
                            <div class="max-h-full overflow-hidden relative">
                                <img class="max-w-full max-h-full object-cover" src=${video.videos.large.thumbnail} alt=${video.tags}>
                            </div>
                            <a href=${video.id}
                                <div>${video.user}</div>
                            </a>
                        </div>
                    </div>
                `;
                wrapper.insertAdjacentHTML('beforeend', slide);                   
            });
    }

    return { getData, createSlide };
}

export default services;