import React, {Component} from 'react';
import {
    Card, CardContent, Button, Typography, ExpansionPanel,
    ExpansionPanelSummary, ExpansionPanelDetails, Grid,
    IconButton, ListItemSecondaryAction, Icon, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon,
    Delete as DeleteIcon,
    EditOutlined as EditIcon
} from '@material-ui/icons';
import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


const styles = theme => ({
    card: {
        Width: 70,
        marginTop: 50,
    },
    title: {
        fontSize: 28,
    },
    pos: {
        marginBottom: 12,
    },
    marginbody: {
        margin: 30,
    },
});

class NotebookDetails extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dense: false,
            open: false,
            noteBook: props.isSearched ? props.noteBook : props.location.state.notebook,
            notes: [],
            title: '',
            content: '',
            noteId: '',
            isEdit: false
        };


        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseSave = this.handleCloseSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditNote = this.handleEditNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    handleCloseSave = (e) => {
        const {isEdit, noteId, notes, title, content} = this.state;
        this.setState({
            open: false
        });
        if (isEdit) {
            this.setState({
                isEdit: false
            })
            notes.map((note) => {
                if (note.noteId === noteId) {
                    this.state.notes.splice(notes.indexOf(note.noteId), 1);
                }
            });
        }
        this.state.notes.push({
            title,
            content,
            noteId: Math.random(),
        });
        let obj = {
            id: this.state.noteBook.id,
            points: this.state.notes
        }
        this.props.dispatch({
            type: 'ADD_POINTS',obj}
        );
    };

    handleEditNote = note => index => {
        this.setState({
            isEdit: true,
            content: note.content,
            title: note.title,
            noteId: note.noteId
        });

        this.handleClickOpen();
    };

    handleDeleteNote = note => index => {

        this.state.notes.splice(this.state.notes.indexOf(note.noteId), 1);
        this.setState({
            content: '',
            title: '',
            noteId: ''
        });

    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false,
            isEdit: false,
            title: '',
            content: ''
        })
    }

    render() {
        const {classes} = this.props;
        const {noteBook, isEdit, notes, open, title, content} = this.state;

        return (
            <div className={classes.marginbody}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="secondary" gutterBottom>
                            Todo Details # {noteBook.id}
                        </Typography>
                        <div className="wrapper">
                            <ul className="main-nav">
                                <li>
                                    <Typography fontWeight="fontWeightBold" variant="body2" component="p">
                                        Title
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {noteBook.title}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography fontWeight="fontWeightBold" variant="body2" component="p">
                                        Description
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {noteBook.description}
                                    </Typography>
                                </li>
                                <li>
                                    <Typography fontWeight="fontWeightBold" variant="body2" component="p">
                                        Created At
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {noteBook.createdAt}
                                    </Typography>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="secondary" gutterBottom>
                            Add more points here
                        </Typography>

                        {notes.map((note, index) =>

                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography className={classes.heading}>{note.title}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item xs={12} md={12}>
                                        <div className={classes.demo}>
                                            <div>
                                                {note.content}
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="Delete"
                                                                onClick={this.handleDeleteNote(note, index)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="Edit"
                                                                onClick={this.handleEditNote(note, index)}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </div>
                                        </div>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )}

                        <IconButton onClick={this.handleClickOpen}>
                            <Icon className={classes.icon} color="secondary" fontSize="large">
                                add_circle
                            </Icon>
                        </IconButton>

                    </CardContent>
                </Card>
                <div>
                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle
                            id="form-dialog-title">{isEdit ? 'Edit Point' : 'Create New Point'}</DialogTitle>

                        <form action="/" method="POST" onSubmit={(e) => {
                            e.preventDefault();
                            this.handleCloseSave();
                        }}>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    onChange={this.handleChange}
                                    value={title}
                                    label="Point Title"
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="content"
                                    onChange={this.handleChange}
                                    label="Point Content"
                                    value={content}
                                    type="string"
                                    fullWidth
                                    multiline={true}
                                    rows={2}
                                    rowsMax={7}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="secondary">
                                    {isEdit ? 'Edit' : 'Save'}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </div>
            </div>
        );
    }
}

NotebookDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
export default
connect(mapStateToProps)
(withStyles(styles)
(NotebookDetails));

