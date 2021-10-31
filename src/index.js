import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import 'antd/dist/antd.css'
import {applyMiddleware, createStore} from "redux"
import {rootReducer} from "./redux/reducers/root.reducer"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {Provider} from "react-redux"

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)),window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION())

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'))
reportWebVitals()