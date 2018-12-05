import {config} from './apiConfig';

function getApiUrl(rows) {
    let apiUrl = '',
        apiParams = '';
    if (config.proxyadress) {
        apiUrl += config.proxyadress;
    }
    if (config.url) {
        apiUrl += config.url;
    }
    if (config.params) {
        apiParams += config.params;
    }
    
    return  `${apiUrl}?rows=${rows}&${apiParams}`;
}

export function getData(rows){
    return fetch(getApiUrl(rows))
        .then(function(response){
            return response.json()
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.text);
            }
            return data;
        })
        .catch(console.log);
}