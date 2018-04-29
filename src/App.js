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
  
  //utility function for creating a GUID
  GUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0,
            v = c === 'x' ? r : (r&0x3|0x8)
        return v.toString(16)
    })
  }

  updateInterest = (query) => {
    this.setState({query: query})
    this.setState({interests: this.state.interests.concat([{id: this.GUID(),interest: this.state.query}])})
    console.log(this.state.interests)
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
            (<Places
              interests={this.state.interests}
              updateInterest={this.updateInterest}/>) :
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
