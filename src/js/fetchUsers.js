// get request for getting any data
export const fetchData = async (url) => {
    return await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/${url}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                return data;
            } else {
                throw new Error('Data retrieval failed');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

// post request for posting user
export const postData = async (data, token) => {
    const formData = new FormData();
    console.log(data.name)
    formData.append('position_id', data.position_id);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('photo', data.photo);
    return await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'POST',
        body: formData,
        headers: {
            'Token': token,
        },
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.success) {
           return data
        } else {
        }
    }).catch(function (error) {
        console.log(error)
    });
};
