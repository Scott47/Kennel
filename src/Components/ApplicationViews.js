import { Route } from 'react-router-dom';
import React, { Component } from "react";
import { withRouter } from 'react-router'
import AnimalList from './animal/AnimalList';
import AnimalDetail from './animal/AnimalDetail';
import AnimalForm from './animal/AnimalForm';
import AnimalManager from "../modules/AnimalManager";
import EmployeeList from './employee/EmployeeList';
import EmployeeDetail from './employee/EmployeeDetail'
import EmployeeManager from '../modules/EmployeeManager';
import LocationList from './location/LocationList';
import LocationDetail from './location/LocationDetail';
import LocationManager from '../modules/LocationManager';
import OwnerList from './owner/ownerList';
import OwnerManager from '../modules/OwnerManager';
import "./animal/Animal.css";
import "./employee/Employee.css";
import "./location/Location.css";


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
    addAnimal = animal =>
     AnimalManager.post(animal)
        .then(() => AnimalManager.getAll())
        .then(animals =>
        this.setState({animals: animals})
    );

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
                    return <AnimalList {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    // Find() loops through animals and runs a comparison
                    let animal = this.state.animals.find(animal => animal.id === +(props.match.params.animalId))
                    // If the animal wasn't found, create a defalut one
                    if (!animal) {
                        animal = {id:404, name:404, breed: "Dog not found"}
                    }
                    // return animal object and pass it method of this.deleteAnimal  AnimalDetail gets rendered, then, pass it a variable.
                    return <AnimalDetail animal={ animal }
                    deleteAnimal={ this.deleteAnimal } />
                }} />
                <Route path="/animals/new"
                render={(props) => {
                    return <AnimalForm {...props} addAnimal={this.addAnimal}
                    employees={this.state.employees} />
                }} />

                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    // Find() loops through employees and runs a comparison
                    let employee = this.state.employees.find(employee => employee.id === +(props.match.params.employeeId))

                    // If the employe wasn't found, create a defalut one
                    if (!employee) {
                        employee = {id:404, name:404, breed: "Employee not found"}
                    }
                    return <EmployeeDetail employee={ employee } />
                }} />

                 <Route exact path="/locations" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    // Find() loops through location and runs a comparison
                    let location = this.state.locations.find(location => location.id === +(props.match.params.locationId))
                    // If the location wasn't found, create a defalut one
                    if (!location) {
                        location = {id:404, name:404, address: "Location not found"}
                    }
                    // return location object and pass it method of this.deleteLocation LocationDetail gets rendered, then, pass it a variable.
                    return <LocationDetail location={ location } />
                }} />

                <Route path="/owners" render={(props) => {
                    return <OwnerList deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}
export default withRouter(ApplicationViews)