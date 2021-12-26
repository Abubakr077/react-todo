import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar';
import { BrowserRouter , Route} from 'react-router-dom';
import Login from './components/login-github';
import Notebooks from "./components/notebooks";
import NotebookDetails from "./components/notebook-details";
import Search from "./components/search";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Route exact path ='/' component={Login} />
                <Route path ='/notebooks' component={Notebooks} />
                <Route path='/details' component={NotebookDetails} />
                <Route path='/search' component={Search} />
            </div>
            </BrowserRouter>
        );
    }
}
export default App;