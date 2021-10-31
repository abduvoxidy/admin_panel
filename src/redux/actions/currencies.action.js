import {FETCH_CURRENCIES, CREATE_CURRENCIES, DELETE_CURRENCIES, EDIT_CURRENCIES} from "../types"
import axios from "axios"

/************************************** Get **************************************************/

export const fetchCurrencies = () => dispatch => {
    axios.get(`http://localhost:7077/currencies`)
        .then(res => {
            dispatch({
                type: FETCH_CURRENCIES,
                payload: res.data.data
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Create **************************************************/

export const createCurrencies = params => dispatch => {
    axios.post(`http://localhost:7077/currencies`, params)
        .then(res => {
            dispatch({
                type: CREATE_CURRENCIES,
                payload: params
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Delete **************************************************/

export const deleteCurrencies = code => dispatch => {
    axios.delete(`http://localhost:7077/currencies/${code}`)
        .then(res => {
            dispatch({
                type: DELETE_CURRENCIES,
                payload: code
            })
        })
        .catch( error => {
            console.log(error)
        })
}

/************************************** Update **************************************************/

export const editCurrencies = params => dispatch => {
    axios.put(`http://localhost:7077/currencies/${params.code}`, params)
        .then(res => {
            dispatch({
                type: EDIT_CURRENCIES,
                payload: params
            })
        })
        .catch( error => {
            console.log(error)
        })
}