import { Route } from 'react-router-dom';
import React, { Component } from "react";
import AnimalList from './animal/AnimalList';
import LocationList from './location/LocationList';
import EmployeeList from './employee/EmployeeList';
import OwnerList from './owner/ownerList';
import AnimalManager from "../modules/AnimalManager";
import OwnerManager from '../modules/OwnerManager';
import EmployeeManager from '../modules/EmployeeManager';
import LocationManager from '../modules/EmployeeManager';

// import AnimalManager from "../modules/AnimalManager"
export default class ApplicationViews extends Component {

    state = {
        locations: [],
        animals: [],
        employees: [],
        owners: []
    }

    componentDidMount() {
        const newState = {}

        AnimalManager.getAll()
            .then(animals => newState.animals = animals)
        EmployeeManager.getAll()
            .then(employees => newState.employees = employees)
        OwnerManager.getAll()
            .then(owners => newState.owners = owners)
        LocationManager.getAll()
            .then(locations => newState.locations = locations)
            .then(() => this.setState(newState))
    }

    deleteAnimal = (id) => {
        return AnimalManager.removeAndList(id)
        .then(animals => this.setState({
            animals: animals
          })
        )
      }

    deleteOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(e => e.json())
        .then(owners => this.setState({
            owners: owners
        }))
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }

}
