import {request} from './common'

export const login = (username, password) => {
    console.log({username, password});
    return request("POST", "login/", {username, password})
};

export const topics = () => request("GET", "topics/");

export const getTicketList = () => request("GET", "tickets/");

export const getTicket = (id) => request("GET", `ticket/${id}/`);

export const resolveTicket = (id) => request("POST", `ticket/${id}/resolve/`);

export const sendMessage = (id, content) => request("POST", `ticket/${id}/`, {content});

export const sendImage = (id, form) => request("POST", `ticket/${id}/image`, form);