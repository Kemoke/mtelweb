export const user = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user;
        default:
            return {};
    }
};

export const ticket = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TICKET':
            return action.ticket;
        default:
            return {};
    }
};