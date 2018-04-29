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
             onChange={(e) => this.updateQuery(e.target.value)}/>
           <input id='go-to-button' type='submit' value='Add'/>
        </form>
        {this.props.interests.map((interest) => (
            <li className= 'interest-list' key={interest.id}>
              <div className="interest">{interest.interest}</div>
              <div className= 'button-container' onClick={(e) => this.deleteInterest(interest)}>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                  <i class="fas fa-minus-circle"></i>
                </button>
              </div>
              <div className= 'button-container'>
              <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="fas fa-map-marker"></i>
              </button>
            </div>
            <hr></hr>
            </li>
          ))
        }
      </div>
    )
  }
}

export default Places
