import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AppContext from '../context/AppContext'

const useStyles = (theme) => ({
    appBar: {
        width: '100%',
        margin: '0'
    }
});

class AppAppBar extends Component {
    static contextType = AppContext;
    
    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Facturador Hacienda
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }

}

export default withStyles(useStyles)(AppAppBar);