import {FETCH_MARITIALS, CREATE_MARITIALS, DELETE_MARITIALS, EDIT_MARITIALS} from "../types";

const initialState = {
    maritials:[]
}

export const maritialReducer =(state=initialState,{type,payload})=>{
    switch (type) {
        case FETCH_MARITIALS:
            return{
                ...state,
                maritials: payload
            }
        case CREATE_MARITIALS:
            return {
                ...state,
                maritials: [...state.maritials , payload]
            }
        case DELETE_MARITIALS:
            return {
                ...state,
                maritials: [...state.maritials.filter(item => item.code !== payload)]
            }
        case EDIT_MARITIALS:
            const index = state.maritials.findIndex(item =>item.code === payload.code)
            const maritials = [...state.maritials.slice(0,index),payload,...state.maritials.slice(index + 1)]
            return {
                ...state,
                maritials: [...maritials]
            }
        default:
            return state
    }
}