import * as axios from "axios";

export const HOST_URL = "https://api.mtel.kemoke.net/";

export const request = (verb, url, body = {}) => {
    return axios({
        method: verb,
        url: HOST_URL + url,
        data: body,
        headers: {'Authorization': `Token ${localStorage.getItem('token')}`}
    }).then(res => {
        if(res.status === 403){
            throw res.data;
        }
        if(res.status !== 200){
            alert("Error in request, check console");
            throw res.data;
        } else {
            return res.data;
        }
    });
};