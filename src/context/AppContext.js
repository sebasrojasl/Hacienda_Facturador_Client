import React from 'react';

export default React.createContext({
    logged: false,
    sessionKey: '',

    onChang: (name, val) => {},
    signIn: (sessionKey) => {}
});