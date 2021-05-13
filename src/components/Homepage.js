import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class Homepage extends Component{
    static contextType = AppContext;

    render(){
        return(
            <div>
                <h1>Homepage</h1>
            </div>
        );
    }
}

export default Homepage;