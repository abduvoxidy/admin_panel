import {FETCH_CLIENTS, CREATE_CLIENTS, DELETE_CLIENTS, EDIT_CLIENTS} from "../types";

const initialState = {
    clients: []
}

export const clientsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_CLIENTS:
            return {
                ...state,
                clients: payload
            }
        case CREATE_CLIENTS:
            return {
                ...state,
                clients: [...state.clients, payload]
            }
        case DELETE_CLIENTS:
            return {
                ...state,
                clients: [...state.clients.filter(item => item.code !== payload)]
            }
        case EDIT_CLIENTS:
            const index = state.clients.findIndex(item =>item.code === payload.code)
            const clients = [...state.clients.slice(0,index),payload,...state.clients.slice(index+1)]
            return {
                ...state,
                clients:[...clients]
            }
        default:
            return state
    }
}
