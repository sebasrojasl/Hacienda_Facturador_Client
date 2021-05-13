import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class SignIn extends Component{
    static contextType = AppContext;

    render(){
        return(
            <div>
                <h1>Sign In</h1>
            </div>
        );
    }   
}

export default SignIn;