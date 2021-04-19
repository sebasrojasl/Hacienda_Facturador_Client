import React  from 'react'

export default React.createContext({
    headerinfo : [],
    products: [],
    addProductToBill: (product) => {},
    removeProductFromBill: (productId) => {}
});