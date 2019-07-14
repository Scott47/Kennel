import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Kennel from './Components/Kennel'
import { BrowserRouter as Router } from "react-router-dom"

import './index.css';

// class Foo extends Bar--> Component is another function that returns an object with a bunch of methods and properties. When we make a Kennel, it will contain all the properties of a Component.

class EmployeeList extends Component {
    render() {
        return (
            <article>
                <h1>Employee List</h1>
                <section>Jessica Younker</section>
                <section>Jordan Nelson</section>
                <section>Zoe LeBlanc</section>
                <section>Blaise Roberts</section>
            </article>
        );
    }
}

ReactDOM.render(
    <Router>
        <Kennel />
    </Router>
    , document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

