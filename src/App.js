/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react'
import Map from './map.js'
import Places from './places.js'
import ListView from './listview.js'
import 'whatwg-fetch' //polyfill for fetch
import './App.css'

const colors = {
  green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  purple: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  state: 4
}

class App extends Component {
  state = {
    view: 'places',
    map: '',
    markers:[],
    mapCenter: {
      lat: 52.5200,
      lng: 13.4050
    },
    interests: [
      {
      id: '8292a3f9-598a-4f51-b964-424f466e31d0',
      interest: 'Co Working Spaces',
      color: colors.green,
      css: {color: '#58f958'},
      calls: 0
      },
      {
      id: '092203d0-2d1f-4000-9838-7171c21dfa72',
      interest: 'Coffee Shops',
      color: colors.red,
      css: {color: '#f06b6b'},
      calls: 0
      },
      {
      id: '4bda6a6f-8180-47c4-9396-2eb8a96c58de',
      interest: 'Gyms',
      color: colors.blue,
      css: {color: '#778ee1'},
      calls: 0
    }
    ],
    places: []
  }

  //sets markers for interests that are set in the initial interests state
  componentDidMount = () => {
    setTimeout(() => {
      for (const each in this.state.interests) {
        this.getPlaces(this.state.interests[each])
      }
    }, 2000)
  }

  //utility function for creating a GUID
  GUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0,
          //eslint-disable-next-line
          v = c === 'x' ? r : (r&0x3|0x8)
        return v.toString(16)
    })
  }

  //updates interests based on query entry (controlled in places.js)
  updateInterest = (query) => {
    let newInterest = {
      id: this.GUID(),
      interest: query,
      calls: 0
    }
    switch (colors.state) {
      case 1:
        newInterest.color = colors.green
        newInterest.css = {color: '#58f958'}
        colors.state = 2
        break

      case 2:
        newInterest.color = colors.red
        newInterest.css = {color: '#f06b6b'}
        colors.state = 3
        break

      case 3:
        newInterest.color = colors.blue
        newInterest.css = {color: '#778ee1'}
        colors.state = 4
        break

      case 4:
        newInterest.color = colors.purple
        newInterest.css = {color: '#c973e7'}
        colors.state = 5
        break

      case 5:
        newInterest.color = colors.yellow
        newInterest.css = {color: '#e8ea66'}
        colors.state = 1
        break

      default:
        newInterest.color = colors.red
        newInterest.css = {color: '#f06b6b'}
        colors.state = 3
        break
    }
    this.setState({interests: this.state.interests.concat([newInterest])}) //set interest with associated color
  }

  //removes places associated with deleted interests from this.state.places
  removePlaces = (deletedInterest) => {
    let filteredPlaces = this.state.places.filter(place => place.interest !== deletedInterest)
    this.setState({places: filteredPlaces})
  }

  //delete interest state on event
  deleteInterest = (target) => {
    let id = target.id
    let findIndex = this.state.interests.findIndex(thisInterest => thisInterest.id === id)
    if (this.state.interests.length > -1) {
      let interestEdit = this.state.interests.splice(findIndex, 1)
      this.setState({interest: interestEdit})
    }
    //removes markers of deleted interest
    for (let marker in this.state.markers) {
      if (this.state.markers[marker].interest.interest === target.interest) {
        this.state.markers[marker].setMap(null)
      }
    }
    this.removePlaces(target.interest)
  }

  //reset the calls number of all interests
  resetMarkerCalls = () => {
    let updatedInterests = this.state.interests
    for (let interest in updatedInterests) {
      updatedInterests[interest].calls = 0
    }
    this.setState({interests: updatedInterests})
  }

  //removes all markers from the map, resets marker calls and removes all places
  removeMarkers = () => {
    let updatedInterests = this.state.interests
    for (let marker in this.state.markers) {
      this.state.markers[marker].setMap(null)
    }
    this.resetMarkerCalls()
    this.setState({places: []})
  }

  //view list view in sidebar
  viewList = (event) => {
    event.preventDefault()
    this.setState({view: 'list'})
  }

  //view places view in sidebar
  viewPlaces = (event) => {
    event.preventDefault()
    this.setState({view: 'places'})
  }

  //map is created and called in map.js, but stored in app.js state
  setMap = (map) => {
    this.setState({map: map})
  }

  //add places to state
  addPlaces = (interest, response) => {
    this.setState({places: this.state.places.concat({interest: interest.interest, locations: response})})
  }

  //Finds the lat/lng coordinates of an address or location string
  findCenter = (address) => {
    let geocoder = new google.maps.Geocoder()
    geocoder.geocode({address: address}, ((response, status) => {
      if (status === 'OK') {
        let lat = response[0].geometry.location.lat()
        let lng = response[0].geometry.location.lng()
        this.setState({places: []}) //remove all places
        this.state.map.setCenter({lat:lat, lng:lng}) //centers the map at the new coordinates
        this.setState({mapCenter: {lat:lat, lng:lng} }) //update the lat/lng state for access by other methos
        this.resetMarkerCalls() //reset marker calls
        for (const each in this.state.interests) { //get places/markers for new location
          this.getPlaces(this.state.interests[each])
        }
      } else {
        console.log('Geocoder unsuccessful: ', status)
        window.alert('Unable to find location, please try again')
        return
      }
    }))
  }

  //method for handling fetch errors
  handleErrors = (response, info) => {
    if (!response.ok) {
      console.log('name of  failed search: ', info)
      throw error('name of  failed search: ', info)
      //window.alert("There's and issue getting information from either Google or Foursquare. Please close the window and try again later.", response.statusText)
    }
    return response
  }

  //gets places via google API from interest and locations that are stored in state
  getPlaces = (interest) => {
    if (interest.calls === 0) {
      let targetInterest = interest.interest
      let service = new google.maps.places.PlacesService(this.state.map)
      service.textSearch( //must provide location to return results
        {query: targetInterest,
        rankby: prominence, //ranks by prominence of location. remove line if buggy.
        location: {lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng},
        radius: '300'}, ((response, status) => {
        if (status === 'OK') {
          this.addPlaces(interest, response) //add places to state
          for (let place in response){
            this.foursquareInfo(response[place], interest) //get place info, create Google InfoWindow and Markers
          }
        } else {
          console.log('Places text search failed ', status)
          window.alert('No results')
        }
      }))
      interest.calls = 1
    }
  }

  //aync function for getting Foursquare Venue ID based on coordinates and name
  //returns a object with info for the venue
  getId = (lat, lng, name, info) => {
    return new Promise((resolve, reject) => {
      info.name = name
      fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&llAcc=1000&intent=match&name=${name}&client_id=NNJGDXP3DFPSLBOIHH4SVZBTYQKQ5IF1L5IZPFBYOXO4EL0R&client_secret=FAVRM415CZFX4C21VR4QENHLXMGH0BUMEDZSKQVSOVY5GBEH&v=20180115`,
      { method: 'GET'})
      .then(response => this.handleErrors(response, name))
      .then(response => {
        return response.json()})
      .then(data => {
        if (data.response.venues.length >= 1) {
          info.foursquareId = data.response.venues[0].id
          info.link = `http://foursquare.com/v/${info.foursquareId}`
          resolve(info)
        } else {
          info.foursquareId = 'no match'
          resolve(info)
        }
      }).catch(error => console.log(error))
    })
  }

  //async function for getting Foursquare photos of a venue
  getPhotos = (info) => {
    return new Promise((resolve, reject) => {
      if (info.foursquareId === 'no match') {
        info.photoURL = 'Kein Foto'
        resolve(info)
      } else {
        fetch(`https://api.foursquare.com/v2/venues/${info.foursquareId}/photos?&limit=1&client_id=NNJGDXP3DFPSLBOIHH4SVZBTYQKQ5IF1L5IZPFBYOXO4EL0R&client_secret=FAVRM415CZFX4C21VR4QENHLXMGH0BUMEDZSKQVSOVY5GBEH&v=20180115`,
        { method: 'GET' })
      .then(response => {
        return response.json()
      }).then(data => { //keeping this step in case use is expanded to multiple images
        let photosArray = data.response.photos.items
        return photosArray
      }).then(photos => {
        info.photoURL = (photos[0]) ? photos[0].prefix+'width150'+photos[0].suffix : 'Kein Foto'
        resolve(info)
    }).catch(error => console.log(error))
    }
  })
}

//async function for getting the Foursquare hours of a location
getHours = (info) => {
  return new Promise((resolve, reject) => {
    if (info.foursquareId === 'no match') {
      info.hours = 'Hours Not Available'
      resolve(info)
    } else {
      fetch(`https://api.foursquare.com/v2/venues/${info.foursquareId}/hours?&client_id=NNJGDXP3DFPSLBOIHH4SVZBTYQKQ5IF1L5IZPFBYOXO4EL0R&client_secret=FAVRM415CZFX4C21VR4QENHLXMGH0BUMEDZSKQVSOVY5GBEH&v=20180115`,
        { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        info.hours = (data.response.hours.timeframes) ? data.response.hours.timeframes[0].open[0] : 'Hours Not Available'
        resolve(info)})
      .catch(error => console.log(error))
    }
  })
}

//method for getting location information from Foursquare's API
//response is a Google places API response (this.getPlaces)
foursquareInfo = (response, interest) => {
  const lat = response.geometry.location.lat()
  const lng = response.geometry.location.lng()
  const id = response.id //GUID
  const name = response.name.replace(/[^a-zA-Z ]/g, "") //remove special charecters (source: https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript)
  let info = {} //this object will be passed through all async foursquare functions and contain all info needed to create an infowindow

  this.getId(lat, lng, name, info) //get venue Foursquare ID (async)
  .then(idResult => {
    return this.getPhotos(idResult)}) //get venue Photos from Foursquare (async)
  .then(photoResult => {
    return this.getHours(photoResult)}) //get venue hours from Foursquare (async)
  .then(response => {
    return this.createWindow(name, response)})
  .then(infowindow => {
    this.createMarker(lat, lng, name, id, interest, infowindow)})
  .catch(error => console.log(error))
}

//creates a marker and associated infowindow
createMarker = (lat, lng, name, id, interest, infowindow) => {
  const marker = new google.maps.Marker({   //creating the marker
    position: {lat: lat, lng: lng},
    animation: google.maps.Animation.DROP,
    id: id,
    infowindow: infowindow, //storing infowindow in marker for easy access
    interest: interest,
    clickCount: 0
  })
  //event listener for click to open infowindow (close on second click)
  marker.addListener('click', () => {
    if (marker.clickCount === 0) {
      marker.clickCount = 1
      infowindow.open(this.state.map, marker)
      marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 750)
    } else {
      infowindow.close()
      marker.clickCount = 0
    }
  })
  marker.setIcon(interest.color)
  marker.setMap(this.state.map) //places marker on map
  this.setState({markers: this.state.markers.concat(marker)})
}

//create a google infowindow, populated by info from Foursquare API
createWindow = (name, info) => {
  let photoHTML = (info.photoURL !== 'Kein Foto') ? `<img src=${info.photoURL} alt=${name+' image'}></img>` : '<h4>No Photos Available</h4>'
  let hoursHTML = (info.hours !== 'Hours Not Available') ? `<p className='hours-text'>${info.hours.start} to ${info.hours.end}</p>` : `<p className='hours-text'>Hours Not Available</p>`
  let linkHTML = (info.link) ? `<a href=${info.link}><h4 className='name'>${name}</a>` : `<h4 className='name'>${name}</h4>`
  const infowindow = new google.maps.InfoWindow({
    content: `<div className='infowindow-div'>
        ${linkHTML}
        <div className='picture-container'>
          ${photoHTML}
        </div>
        <div className='hours'>
          ${hoursHTML}
        </div>
      </div>`
    })
  return infowindow
}


  //TODO:Enable service worker + offline first

  //TODO:Enable Focus (tabbing)
  //TODO:Site elements are defined semantically (ARIA)
  //TODO:Responsive design and styling overhaul

  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='filter'>
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
              map={this.state.map}
              interests={this.state.interests}
            />)
            }
          </div>
          <div className='powered-by-container'>
            <p>Powered By:</p>
            <div className='google-logo'>
              <i className="fab fa-google"></i>
            </div>
            <div className='foursquare-logo'>
              <i className="fab fa-foursquare"></i>
            </div>
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
