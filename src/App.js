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
    markers:[],
    infowindow: [],
    mapCenter: {
      lat: 52.5106,
      lng: 13.4422
    },
    interests: [
      {
      id: '8292a3f9-598a-4f51-b964-424f466e31d0',
      interest: 'Co Working Spaces'
      }
    ],
    places: []
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

  createMarker = (response) => {
    for (let place in response) {
      const location = {lat: response[place].geometry.location.lat(), lng: response[place].geometry.location.lng()}
      const id = response[place].id
      const name = response[place].name
      const infowindow = new google.maps.InfoWindow({
        content: name
      })
      const marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        id: id,
        infowindow: infowindow
      })
      this.setState({infowindow: this.state.infowindow.concat(infowindow)})
      marker.addListener('click', () => {
        infowindow.open(this.state.map, marker)
        marker.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(() => {
          marker.setAnimation(null)
        }, 750)
      })
      marker.setMap(this.state.map)
      this.setState({markers: this.state.markers.concat(marker)})
    }
  }

  //add places to state
  addPlaces = (interest, response) => {
    //TODO: fix function so duplicate interests cannot be entered
      console.log('responses: ', response)
      this.setState({places: this.state.places.concat({interest: interest.interest, locations: response})})
      console.log('state places: ', this.state.places)
  }

  //gets places via google API
  getPlaces = (interest) => {
    console.log('get places fired')
    let targetInterest = interest.interest
    let service = new google.maps.places.PlacesService(this.state.map)
    service.textSearch( //must provide location to return results
      {query: targetInterest,
      location: {lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng},
      radius: '500'}, ((response, status) => {
      console.log('status: ', status)
      if (status === 'OK') {
        console.log('Google places status: ', status)
        this.addPlaces(interest, response)
        this.createMarker(response)
      } else {
        console.log('Places text search failed ', status)
        window.alert('No results')
      }
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

  //TODO:Enable filter of location list
  //TODO:Only filtered markers should appear
  //TODO:Update API calls to async (Fetch API or XHR)
  //TODO:Enable error handling for failed API calls
  //TODO:Attach another third party library to the location info for a given place
  //TODO:Enable service worker + offline first
  //TODO:Deleting an interest removes its associated places from list
  //TODO:Ability to customize color of Marker by interest
  //TODO:Enable Focus (tabbing)
  //TODO:Site elements are defined semantically (ARIA)
  //TODO:Alternative text for all images
  //TODO:Responsive design and styling over haul

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div classnName='filter'>
            <input
              id='places-button'
              type='button'
              value='Interests'
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={(e) => this.viewPlaces(e)}/>
            <input
              id='list-button'
              type='button'
              value='List'
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={(e) => this.viewList(e)}/>
        </div>
          <div>
            {this.state.view === 'places' ?
            (<Places
              interests={this.state.interests}
              getPlaces={this.getPlaces}
              updateInterest={this.updateInterest}
              deleteInterest={this.deleteInterest}
              removeMarkers={this.removeMarkers}
            />)
            :
            (<ListView
              places={this.state.places}
              markers={this.state.markers}
              infowindow={this.state.infowindow}
              map={this.state.map}
            />)
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
