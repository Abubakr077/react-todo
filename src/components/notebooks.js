import React, {Component} from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Notebooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: '#', field: 'id'},
                {
                    title: 'Title', field: 'title',
                },
                {title: 'Description', field: 'description'},
                {title: 'Created At', field: 'createdAt',type: 'date'},
            ],
            data: this.props.data
        };
    }

    updateNoteBooks(data) {
        /////push data in store///
        this.props.dispatch({
            type: 'UPDATE_NOTE_BOOKS',
            data
        });
        this.setState({
            data
        })
    }

    render() {
        const {data, columns} = this.state;
        return (
            <MaterialTable
                title="My Todo Notes"
                columns={columns}
                data={data}
                onRowClick={((evt, selectedRow) => {
                    this.setState({selectedRow});
                    this.props.history.push(
                        {
                            pathname: '/details',
                            search: '/' + selectedRow.id,
                            state: {
                                notebook: selectedRow,
                                isSearched: false,
                                id: selectedRow.id
                            }
                        });
                })}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const d = [...data];
                                d.push(newData);
                                this.updateNoteBooks(d);
                            }, 300);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const d = [...this.state.data];
                                d[data.indexOf(oldData)] = newData;
                                this.updateNoteBooks(d);

                            }, 300);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                const d = [...this.state.data];
                                d.splice(data.indexOf(oldData), 1);
                                this.updateNoteBooks(d);
                            }, 300);
                        }),
                }}
                options={{
                    actionsColumnIndex: -1,
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps)(Notebooks);