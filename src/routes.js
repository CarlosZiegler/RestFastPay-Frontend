import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import OrderDetails from "./pages/OrderDetails";
import EditOrder from "./pages/EditOrder";
import CreateOrder from "./pages/CreateOrder";
import CreateTable from "./pages/CreateTable";
import CreateItem from "./pages/CreateItem";
import Checkout from "./pages/CheckoutOrder";
import QRCode from "./pages/GenerateQrcode";
import GeneratorPdf from "./pages/GeneratorPdf";
import SuccessPayment from "./pages/Success";
import PaymentMethod from "./pages/PaymentMethod";
import PaymentSuccess from "./pages/PaymentSucess";


import './index.css'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/main" exact component={Main} />
            <Route exact path="/order/:id" component={OrderDetails} />
            <Route exact path="/order/edit/:id" component={EditOrder} />
            <Route exact path="/create/order" component={CreateOrder} />
            <Route path="/item/create" exact component={CreateItem} />
            <Route path="/table/create" exact component={CreateTable} />
            <Route path="/checkout/order/:id" exact component={Checkout} />
            <Route path="/checkout/generate/:id" exact component={QRCode} />
            <Route path="/checkout/payment/:id" exact component={PaymentMethod} />
            <Route path="/checkout/paid/success/:id" exact component={PaymentSuccess} />
            <Route path="/checkout/payment2/:id" exact component={SuccessPayment} />
        </BrowserRouter>
    );
}