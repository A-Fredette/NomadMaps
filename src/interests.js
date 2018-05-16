/* eslint-disable no-undef */
import React, { Component } from 'react'

class Interests extends Component {
  state = {
    query: '',
  }

//TODO: create Google autocomplete search box for interests
componentDidMount = () => {
}

//As the user types, update the query state
updateQuery = (query) => {
  this.setState({query: query}, () => {
  })
}

//when the user clicks add, create a new interest from query state
addInterest = (event) => {
  event.preventDefault()
  if (this.state.query === '') {
    window.alert('Your interest cannot be blank')
  } else {
    this.props.updateInterest(this.state.query)
  }
}

//passes interest to be deleted to prop function for deletion
delete = (interest) => {
  this.props.deleteInterest(interest)
}
  //TODO: (not for graduation) allow users to customize the color of the markers
  render() {
    return (
    <div>
      <div>
        <form onSubmit={this.addInterest}>
          <input id='add-interest-button'
            className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
            type='submit'
            value='Add'/>
          <input
             id='autocomplete'
             type='text'
             placeholder='  Add Interest'
             value={this.state.query}
             onChange={(e) => this.updateQuery(e.target.value)}/>
        </form>
        <hr></hr>
        {this.props.interests.map((interest) => (
          <div className='interest-container' key={interest.id}>
            <li className= 'interest-list' key={interest.id} role='List'>
              <div className= 'button-container' onClick={(e) => this.delete(interest)}>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                  <i className="fas fa-minus-circle" role='Button'></i>
                </button>
              </div>
              <div className= 'button-container' onClick={(e) => this.props.getPlaces(interest)}>
              <button className="marker-icon mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                  style={interest.css}>
                <i className="fas fa-map-marker" role='Button'></i>
              </button>
            </div>
              <div className="interest">{interest.interest}</div>
            <hr className='bottom-hr'></hr>
            </li>
          </div>
          ))
        }
        <div>
          <div className='remove-button-container'>
            <button
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={this.props.removeMarkers}>
            Remove All Markers
            </button>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Interests
