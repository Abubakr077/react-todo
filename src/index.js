import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AppReducer from "./reducers/appReducers";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
let initialData = {data: [
        {
            "id": 1,
            "title": "Sample task 1",
            "description": "Some description 1",
            "createdAt": new Date(),
        },
        {
            "id": 2,
            "title": "Sample task 2",
            "description": "Some description 2",
            "createdAt": new Date(),
        },
        {
            "id": 3,
            "title": "Sample task 3",
            "description": "Some description 3",
            "createdAt": new Date(),
        }
    ]}
const store = createStore(AppReducer,initialData);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
