import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import OrderDetails from "./pages/OrderDetails";
import CreateTable from "./pages/CreateTable";
import CreateItem from "./pages/CreateItem";

import './index.css'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/main" exact component={Main} />
            <Route path="/order/create" exact component={Main} />
            <Route exact path="/order/:id" component={OrderDetails} />
            <Route path="/item/create" exact component={CreateItem} />
            <Route path="/table/create" exact component={CreateTable} />
        </BrowserRouter>
    );
}