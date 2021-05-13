import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class SignUp extends Component{
    static contextType = AppContext;

    render(){
        return(
            <div>
                <h1>Sign Up</h1>
            </div>
        );
    }   
}

export default SignUp;