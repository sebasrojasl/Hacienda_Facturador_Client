import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "../node_modules/react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import homepage from "./components/homepage"
import bill from "./components/Bill"
import BillContext from "./context/bill-context"


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
            <Route path="/" component={homepage} exact />
            <Route path="/factura" component={bill} exact />
          </Switch>
        </BrowserRouter>
      </BillContext.Provider>
    );
  }
}

export default App;
