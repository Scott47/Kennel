import React, { Component } from "react"
import "./Location.css"
import dog from "./DogIcon.svg"

export default class Location extends Component {
    state = {
        saveDisabled: false
    }
    // State property is local to LocationDetail.

    render() {
      return (
        <section className="location">
            <div key={ this.props.location.id } className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        <img src={ dog } className="icon--dog" />
                        {/* This component receives an animal object on props */}
                        { this.props.location.name }
                    </h4>
                    <h6 className="card-title">{ this.props.location.address }</h6>
                    <button onClick={
                            () => {
                            this.setState(
                                { saveDisabled: true },
                                () => this.props.dischargeLocation(this.props.location.id)
                            )
                        }
                    }
                    disabled={ this.state.saveDisabled }
                    className="card-link">Delete</button>
                </div>
            </div>
         </section>
        )
    }
}