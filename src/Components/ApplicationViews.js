import { Route } from 'react-router-dom';
import React, { Component } from "react";
import { withRouter } from 'react-router'
import AnimalList from './animal/AnimalList';
import LocationList from './location/LocationList';
import EmployeeList from './employee/EmployeeList';
import OwnerList from './owner/ownerList';
import AnimalManager from "../modules/AnimalManager";
import OwnerManager from '../modules/OwnerManager';
import EmployeeManager from '../modules/EmployeeManager';
import LocationManager from '../modules/EmployeeManager';
import AnimalDetail from './animal/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import "./employee/Employee.css"
import "./animal/Animal.css"


// import AnimalManager from "../modules/AnimalManager"
class ApplicationViews extends Component {

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

    deleteAnimal = id => AnimalManager.deleteAnimal(id)
    .then(AnimalManager.getAll)
    .then(animals => {
        this.props.history.push("/animals")
        this.setState({ animals: animals })
    })

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
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    // Find() loops through animals and runs a comparison
                    let animal = this.state.animals.find(animal => animal.id === +(props.match.params.animalId))

                    // If the animal wasn't found, create a defalut one
                    if (!animal) {
                        animal = {id:404, name:404, breed: "Dog not found"}
                    }
                    // return animal object and pass it method of this.deleteAnimal AnimalDetail gets rendered, then, pass it a variable.
                    return <AnimalDetail animal={ animal }
                    deleteAnimal={ this.deleteAnimal } />

                }} />

                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    // Find() loops through animals and runs a comparison
                    let employee = this.state.animals.find(employee => employee.id === +(props.match.params.employeeId))

                    // If the animal wasn't found, create a defalut one
                    if (!employee) {
                        employee = {id:404, name:404, breed: "Employee not found"}
                    }
                    // return animal object and pass it method of this.deleteAnimal AnimalDetail gets rendered, then, pass it a variable.
                    return <EmployeeDetail employee={ employee } />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }

}
export default withRouter(ApplicationViews)