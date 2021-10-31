import {FETCH_BRANCHES, CREATE_BRANCHES, DELETE_BRANCHES, EDIT_BRANCHES} from "../types"
import axios from "axios"

/************************************** Get **************************************************/

export const fetchBranches = () => dispatch => {
    axios.get(`http://localhost:7077/branches`)
        .then(res => {
            dispatch({
                type: FETCH_BRANCHES,
                payload: res.data.data
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Create **************************************************/

export const createBranches = params => dispatch => {
    axios.post(`http://localhost:7077/branches`, params)
        .then(res => {
            dispatch({
                type: CREATE_BRANCHES,
                payload: params
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Delete **************************************************/

export const deleteBranches = code => dispatch => {
    axios.delete(`http://localhost:7077/branches/${code}`)
        .then(res => {
            dispatch({
                type: DELETE_BRANCHES,
                payload: code
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Update **************************************************/

export const editBranches = params => dispatch => {
    axios.put(`http://localhost:7077/branches/${params.code}`, params)
        .then(() => {
            dispatch({
                type: EDIT_BRANCHES,
                payload: params,
            });
        })
        .catch( error => {
            console.log(error)
        })
}














