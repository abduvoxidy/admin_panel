import React from "react";
import { Route, Switch} from "react-router-dom"
import Home from "./pages/Home";
import Branches from "./pages/Branches";
import Clients from "./pages/Clients";
import Currencies from "./pages/Currencies";
import Maritials from "./pages/Maritials";

export const Routes = () =>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/branch" component={Branches}/>
        <Route exact path="/clients" component={Clients}/>
        <Route exact path="/currency" component={Currencies}/>
        <Route exact path="/marital" component={Maritials}/>
    </Switch>

