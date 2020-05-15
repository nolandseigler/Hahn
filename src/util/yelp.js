import API_KEYS from '/keys';
// Since fetch() is a browser API, older browsers may not support it. To increase the accessibilty of Ravenous to a wider audience of users, we’ll need to add a fetch() polyfill to support older browsers.
//Within the Ravenous directory in your terminal, run npm install whatwg-fetch --save to install the whatwg-fetch polyfill and add it to your package.json file.

export const Yelp = {
    search(term, location, sortBy) {
        //use CORS Anywhere to get through CORS restrictions
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${API_KEYS.YELP.API_KEY}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if(jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => ({
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }));
                }
            });
    }
};
