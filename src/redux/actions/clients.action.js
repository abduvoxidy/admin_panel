import {FETCH_CLIENTS, CREATE_CLIENTS, DELETE_CLIENTS, EDIT_CLIENTS} from "../types"
import axios from "axios"

/************************************** Get **************************************************/

export const fetchClients = () => dispatch => {
    axios.get(`http://localhost:7077/clients`)
        .then(res => {
            dispatch({
                type: FETCH_CLIENTS,
                payload: res.data.data
            })
        })
        .catch( error => {
            console.log(error)
        })

}

/************************************** Create **************************************************/

export const createClients = params => dispatch => {
    axios.post(`http://localhost:7077/clients`, params)
        .then(res => {
            dispatch({
                type: CREATE_CLIENTS,
                payload: params
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Delete **************************************************/

export const deleteClients = code => dispatch => {
    axios.delete(`http://localhost:7077/clients/${code}`)
        .then(res => {
            dispatch({
                type: DELETE_CLIENTS,
                payload: code
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Update **************************************************/

export const editClients = params => dispatch =>{
    axios.put(`http://localhost:7077/clients/${params.code}`,params)
        .then(res =>{
            dispatch({
                type:EDIT_CLIENTS,
                payload:params
            })
        })
        .catch( error => {
            console.log(error)
        })
}