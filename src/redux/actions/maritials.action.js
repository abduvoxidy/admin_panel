import {FETCH_MARITIALS, CREATE_MARITIALS, DELETE_MARITIALS, EDIT_MARITIALS} from "../types"
import axios from "axios"

/************************************** Get **************************************************/

export const fetchMaritials = () => dispatch => {
    axios.get(`http://localhost:7077/maritials`)
        .then(res => {
            dispatch({
                type: FETCH_MARITIALS,
                payload: res.data.data
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Create **************************************************/

export const createMaritials = params => dispatch => {
    axios.post(`http://localhost:7077/maritials`, params)
        .then(res => {
            dispatch({
                type: CREATE_MARITIALS,
                payload: params
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Delete **************************************************/

export const deleteMaritials = (code) => dispatch => {
    axios.delete(`http://localhost:7077/maritials/${code}`)
        .then(res => {
                dispatch({
                    type: DELETE_MARITIALS,
                    payload: code
                })
            }
        )
        .catch( error => {
            console.log(error)
        })
}

/************************************** Update **************************************************/

export const editMaritials = params => dispatch => {
    axios.put(`http://localhost:7077/maritials/${params.code}`, params)
        .then(res => {
            dispatch({
                type: EDIT_MARITIALS,
                payload: params
            })
        })
        .catch( error => {
            console.log(error)
        })
}