import React from "react"
import AdminPanel from "./components/Admin"
import {BrowserRouter} from "react-router-dom"

const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <AdminPanel/>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;