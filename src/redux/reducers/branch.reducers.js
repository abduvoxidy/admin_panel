import {FETCH_BRANCHES, CREATE_BRANCHES, DELETE_BRANCHES, EDIT_BRANCHES} from "../types";

const initialState = {
    branches: []
}

export const branchReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FETCH_BRANCHES:
            return {
                ...state,
                branches: payload
            }
        case CREATE_BRANCHES:
            return {
                ...state,
                branches: [...state.branches, payload]
            }
        case DELETE_BRANCHES:
            return {
                ...state,
                branches: [...state.branches.filter(item => item.code !== payload)]
            }
        case EDIT_BRANCHES:
            const index = state.branches.findIndex(item => item.code === payload.code)
            const branches = [...state.branches.slice(0, index), payload, ...state.branches.slice(index + 1)]
            return {
                ...state,
                branches: [...branches]
            }
        default:
            return state
    }
}