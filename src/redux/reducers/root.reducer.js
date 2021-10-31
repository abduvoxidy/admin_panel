import {combineReducers} from "redux";
import {branchReducer} from "./branch.reducers";
import {clientsReducer} from "./clients.reducer";
import {currenciesReducer} from "./currencies.reducer";
import {maritialReducer} from "./maritials.reducer";

export const rootReducer = combineReducers({
    branches: branchReducer,
    clients: clientsReducer,
    currencies: currenciesReducer,
    maritials:maritialReducer
})
