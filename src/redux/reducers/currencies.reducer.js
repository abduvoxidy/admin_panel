import {FETCH_CURRENCIES, EDIT_CURRENCIES, DELETE_CURRENCIES, CREATE_CURRENCIES} from "../types";

const initialState = {
    currencies: []
}
export const currenciesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_CURRENCIES:
            return {
                ...state,
                currencies: payload
            }
        case CREATE_CURRENCIES:
            return {
                ...state,
                currencies: [...state.currencies,payload]
            }
        case DELETE_CURRENCIES:
            return {
                ...state,
                currencies: [...state.currencies.filter(item => item.code !== payload)]
            }
        case EDIT_CURRENCIES:
            const index = state.currencies.findIndex(item=>item.code === payload.code)
            const currencies = [...state.currencies.slice(0,index),payload , ...state.currencies.slice(index + 1)]
        return {
                ...state,
                currencies: [...currencies]
        }
        default: return state
    }
}