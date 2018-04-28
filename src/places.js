/* eslint-disable no-undef */
import React, { Component } from 'react'

const google = window.google

class Places extends Component {
  state = {
    query: '',
    //TODO: Interests should be managed in app state, pass through as a prop
    interests: [
      {
      id: '8292a3f9-598a-4f51-b964-424f466e31d0',
      interest: 'Co-Working'
      }
    ]
  }

//create Google autocomplete search box
componentDidMount = () => {
  let places = new google.maps.places.SearchBox(document.getElementById('autocomplete'))
  let service = new google.maps.places.PlacesService()
  var request = {
    location: 'pyrmont',
    radius: '500',
    query: 'restaurant'
  }
}

//utility function for creating a GUID
GUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0,
          v = c === 'x' ? r : (r&0x3|0x8)
      return v.toString(16)
  })
}

//As the user types, update the query state
updateInterest = (query) => {
  this.setState({query: query})
  console.log(this.state.query)
}

//when the user clicks add, create a new interest from query state
addInterest = (event) => {
  event.preventDefault()
  this.setState({interests: this.state.interests.concat([{id: this.GUID(),interest: this.state.query}])})
  console.log(this.state.interests)
}

//delete and interest when the minus sign is clicked on
deleteInterest = (target) => {
  console.log(target)
  let id = target.id
  let findIndex = this.state.interests.findIndex(thisBook => thisBook.id === id)
  console.log(findIndex)
  if (this.state.interests.length > -1) {
    let interestEdit = this.state.interests.splice(findIndex, 1)
    console.log(interestEdit)
    this.setState({interest: interestEdit})
  }
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
             onChange={(e) => this.updateInterest(e.target.value)}/>
           <input id='go-to-button' type='submit' value='Add'/>
        </form>
        {this.state.interests.map((interest) => (
            <li key={interest.id}>
              <div className="interest">{interest.interest}</div>
              <div onClick={(e) => this.deleteInterest(interest)}>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="fas fa-minus-circle"></i>
              </button>
              </div>
            </li>
          ))
        }
      </div>
    )
  }
}

export default Places
