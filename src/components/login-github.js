import React from 'react';
import {makeStyles} from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Login = () => {
    return(
        <div>
        <Button variant="contained" color="secondary" className={useStyles().button }
                justify = "center" component={Link} to="/notebooks/" >Login with github </Button>
        </div>
    )
}
export default Login