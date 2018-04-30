/* eslint-disable no-undef */
import React, { Component } from 'react'

const google = window.google

class Places extends Component {
  state = {
    query: '',
  }

//TODO: create Google autocomplete search box for interests
componentDidMount = () => {
}

//As the user types, update the query state
updateQuery = (query) => {
  this.setState({query: query})
  console.log(this.state.query)
}

//when the user clicks add, create a new interest from query state
addInterest = (event) => {
  event.preventDefault()
  this.props.updateInterest(this.state.query)
}

//passes interest to be deleted to prop function for deletion
delete = (interest) => {
  this.props.deleteInterest(interest)
}

  render() {
    return (
      <div>
        <form onSubmit={this.addInterest}>
          <input
             id='autocomplete'
             type='text'
             placeholder='Interest'
             value={this.state.query}
             onChange={(e) => this.updateQuery(e.target.value)}/>
           <input id='go-to-button' type='submit' value='Add'/>
        </form>
        <hr></hr>
        {this.props.interests.map((interest) => (
            <li className= 'interest-list' key={interest.id}>
              <div className= 'button-container' onClick={(e) => this.delete(interest)}>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                  <i className="fas fa-minus-circle"></i>
                </button>
              </div>
              <div className="interest">{interest.interest}</div>
              <div className= 'button-container' onClick={(e) => this.props.getPlaces(interest)}>
              <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i className="fas fa-map-marker"></i>
              </button>
            </div>
            <hr></hr>
            </li>
          ))
        }
        <div>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            onClick={this.props.removeMarkers}>
          Remove Markers
          </button>
        </div>
      </div>
    )
  }
}

export default Places
