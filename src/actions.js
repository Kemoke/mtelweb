export function setUser(user) {
    return {
        type: "SET_USER",
        user: user
    }
}

export function setActiveTicket(ticket) {
    return {
        type: "SET_TICKET",
        ticket: ticket
    }
}