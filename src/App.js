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
    map: '',
    mapCenter: {
      lat: 52.5106,
      lng: 13.4422
    },
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

  //updates interests based on query entry (controlled in places.js)
  updateInterest = (query) => {
    this.setState({interests: this.state.interests.concat([{id: this.GUID(),interest: query}])})
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

  viewList = (event) => {
    event.preventDefault()
    this.setState({view: 'list'})
  }

  viewPlaces = (event) => {
    event.preventDefault()
    this.setState({view: 'places'})
  }

  setMap = (map) => {
    this.setState({map: map})
  }

  createMarker = (location) => {
    console.log('get marker fired')
    console.log('location: ', location)
    const marker = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP
    })
    marker.setMap(this.state.map)
  }

  getPlaces = (interest) => {
    console.log('get places fired')
    let targetInterest = interest.interest
    console.log('interest: ', targetInterest)
    let service = new google.maps.places.PlacesService(this.state.map)
    //must provide location to return results
    service.textSearch(
      {query: targetInterest,
      location: {lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng},
      radius: '500'}, ((response, status) => {
      console.log('status: ', status)
      if (status === 'OK') {
        console.log(response)
        for (let place in response) {
          this.createMarker({lat: response[place].geometry.location.lat(), lng: response[place].geometry.location.lng()})
        }
      } else {
        console.log('Places text search failed ', status)
        window.alert('No results')
      }
      console.log(this.state.map)
    }))
  }

  //Finds the lat/lng coordinates of an address or location string
  findCenter = (address) => {
    let geocoder = new google.maps.Geocoder()
    geocoder.geocode({address: address}, ((response, status) => {
      if (status === 'OK') {
        let lat = response[0].geometry.location.lat()
        let lng = response[0].geometry.location.lng()
        this.state.map.setCenter({lat:lat, lng:lng}) //centers the map at the new coordinates
        this.setState({mapCenter: {lat:lat, lng:lng} }) //update the lat/lng state for access by other methos
      } else {
        console.log('Geocoder unsuccessful: ', status)
        window.alert('Unable to find location, please try again')
        return
      }
    }))
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
              getPlaces={this.getPlaces}
              updateInterest={this.updateInterest}
              deleteInterest={this.deleteInterest}
            />)
            :
            (<ListView/>)
            }
          </div>
      </div>
        <Map
          interests={this.state.interests}
          getPlaces={this.getPlaces}
          findCenter={this.findCenter}
          map={this.state.map}
          setMap={this.setMap}/>
      </div>
    )
  }
}

export default App
