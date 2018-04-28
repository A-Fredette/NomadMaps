/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react'
import Map from './map.js'
import Places from './places.js'
import ListView from './listview.js'
import './App.css'

const google = window.google

class App extends Component {
  state = {
    view: 'places',
    interests: [
      {
      id: '8292a3f9-598a-4f51-b964-424f466e31d0',
      interest: 'Gyms'
      }
    ]
  }

  updateInterest = (search) => {
    console.log('Update Interest event called')
    let newItem = {id: 17, focus: search}
    console.log(newItem)
  }

  viewList = (event) => {
    event.preventDefault()
    this.setState({view: 'list'})
  }

  viewPlaces = (event) => {
    event.preventDefault()
    this.setState({view: 'places'})
  }

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div classnName='filter'>
            <input
              id='list-button'
              type='button'
              value='List'
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={(e) => this.viewList(e)}/>
            <input
              id='places-button'
              type='button'
              value='Interests'
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={(e) => this.viewPlaces(e)}/>
        </div>
          <div>
            {this.state.view === 'places' ?
            (<Places interests={this.state.interests}/>) :
            (<ListView/>)
            }
          </div>
      </div>
        <Map interests={this.state.interests}/>
      </div>
    )
  }
}

export default App
