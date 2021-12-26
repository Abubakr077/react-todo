import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {withStyles} from "@material-ui/styles/index";
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import NotebookDetails from './notebook-details';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import {Typography} from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    card: {
        Width: 50,
        marginTop: 50,
    },
    marginbody: {
        margin: 30,
    },
});

class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
         isFound: false,
            id: null,
            notebook: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            isFound: false,
            notebook: null

        });
    }
    handleSubmit (event){
        event.preventDefault();
        this.props.data.map((notebookNew) => {
            if(notebookNew.id == this.state.id) {
                this.setState({
                    isFound: true,
                    notebook: notebookNew
                });
            }
        })
    }

    render(){
        const { classes } = this.props;
        console.log(this.props.data)
        return(
            <div className={classes.marginbody}>
                <Card className={classes.card}>
                    <form onSubmit={this.handleSubmit}>
                <Paper className={classes.root}>
                    <InputBase
                        required
                        className={classes.input}
                        placeholder="TODO ID"
                        inputProps={{ 'aria-label': 'Todo ID' }}
                        id="id"
                        onChange={this.handleChange}
                    />
                    <Divider className={classes.divider} />
                    <IconButton type="submit" value="submit" className={classes.iconButton} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                    </form>
                </Card>
                <div >
                    { this.state.isFound ?
                        <NotebookDetails noteBook={this.state.notebook} isSearched={true}/>
                    :
                        <Typography  color="secondary" gutterBottom>
                            TODO not found
                        </Typography>
                    }
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default compose(
    connect(mapStateToProps),
    withRouter,
    withStyles(styles)
)(Search);