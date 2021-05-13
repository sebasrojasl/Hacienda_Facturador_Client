import React, { Component } from 'react';
import AppContext from './AppContext'

class GlobalState extends Component{
    state = {
        logged: false,
        sessionKey: ''
    };
    
    onChange = (name, val) => {}

    signIn = (key) => {
        this.setState({
            sessionKey: key,
            logged: true
        });
    }

    render(){
        return (
            <AppContext.Provider value={{
                logged: this.state.logged,
                sessionKey: this.state.sessionKey,
                onChange: this.onChange,
                signIn: this.signIn
            }}> 
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default GlobalState;