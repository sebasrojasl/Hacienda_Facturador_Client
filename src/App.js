import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "../node_modules/react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import home from "./components/Home"
import bill from "./components/Bill"
import visualizer from "./components/BillVisualizer"
import BillContext from "./context/bill-context"
import sigIn from "./components/SignIn"
import sigUp from "./components/SignUp"
import homepage from "./components/homepage"

class App extends Component {
  state = {
    headerinfo : [],
    products: []
  }

addProductToBill = product => {
  console.log('Adding product', product);
};
removeProductFromBill = productId => {
  console.log('Removing product with id:' + productId);
};

  render() {
    return (
      <BillContext.Provider value = {{
        products: this.state.products, 
        headerinfo: this.state.headerinfo,
        addProductToBill: this.addProductToBill,
        removeProductFromBill: this.removeProductFromBill
      }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={home} exact />
            <Route path="/homepage" component={homepage} exact />
            <Route path="/factura" component={bill} exact />
            <Route path="/visualizador" component={visualizer} exact />
            <Route path="/login" component={sigIn} exact />
            <Route path="/registro" component={sigUp} exact />
          </Switch>
        </BrowserRouter>
      </BillContext.Provider>
    );
  }
}

export default App;
