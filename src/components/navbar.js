import React from 'react';
import Notebooks from './notebooks'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import {DeleteIcon, VerifiedUser , SupervisedUserCircleRounded} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function NavBar() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        My Todo Notes APP
                    </Typography>
                    <Button variant="contained" color="secondary" component={Link} to="/notebooks/" className={classes.button} >Home</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/search/" className={classes.button} >Search</Button>
                    <IconButton className={classes.button} aria-label="user">
                        <SupervisedUserCircleRounded />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <body>

            </body>
        </div>
    );
}