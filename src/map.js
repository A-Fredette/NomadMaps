/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react'
import Script from 'react-load-script'

const mapStyle = {
  width: '100%',
  height: '100vh',
  position: 'inherit'
}

let map
const darkTheme =  [
  {"featureType": "all","elementType": "all","stylers": [{"invert_lightness": true},{"saturation": "-9"},{"lightness": "0"},{"visibility": "simplified"}]},{"featureType": "landscape.man_made","elementType": "all","stylers": [{"weight": "1.00"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"weight": "0.49"}]},
  {"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "on"},{"weight": "0.01"},{"lightness": "-7"},{"saturation": "-35"}]},{"featureType": "road.highway","elementType": "labels.text","stylers": [{"visibility": "on"}]},
  {"featureType": "road.highway","elementType": "labels.text.stroke","stylers": [{"visibility": "off"}]},{"featureType": "road.highway","elementType": "labels.icon","stylers": [{"visibility": "on"}]}
]

class Map extends Component {
  state = {
    mapStatus: 'not called',
    map: {},
    address: ''
  }

  //updated state to refect Google API called (for conditional rendering)
  googleCalled = () => {
    this.setState({mapStatus: 'called'})
  }

  //error notification if Google API cannot be loaded
  handleError = () => {
    window.alert('There was a problem connecting to Google. Please try again later.')
  }

  //creates and draws the initial map and stores it in this.props.map (app.js)
  loadGoogleMap = () => {
    return new Promise((resolve, reject) => {
      map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 52.5200, lng: 13.4050},
          mapTypeControl: false,
          styles: darkTheme
      })
      resolve(map)
    })
  .then(map => {
    this.props.setMap(map) //sets map in App state for access by other components
    for (const each in this.props.interests) { //sets markers for interests that are set in the initial interests state
      this.props.getPlaces(this.props.interests[each])
      }})
  .catch(error => {
    window.alert('There was a problem connecting to Google. Please try again later.')
  })}



  //updates state address with address or search result
  updateAddress = (address) => {
    this.setState({address: address})
  }

  //centers map on address coordinates
  goToLocation = (event) => {
    event.preventDefault()
    this.props.findCenter(this.state.address)
  }

  openSidebar = () => {
    if (this.props.sidebar === 'closed') {
      const width = window.innerWidth

      if (width < 1135) {
        document.getElementsByClassName('hamburger-container')[0].style.left = '230px'
      }

      if (width < 1005) {
        document.getElementsByClassName('header')[0].style.left = '220px'
      }

      if (width < 650) {
        document.getElementsByClassName('location-search')[0].classList.add('hide')
        console.log(document.getElementsByClassName('location-search')[0])
      }

      //TODO: Add transition for sidebar opening and closing
      //document.getElementsByClassName("sidebar")[0].style.transition = "all 2s"
      //document.getElementsByClassName('hamburger-container')[0].classList.add('hide')
      document.getElementsByClassName("sidebar")[0].classList.remove('hide')
      document.getElementsByClassName('header')[0].style.width = '80%'
      document.getElementsByClassName('map-area')[0].style.width = '80%'
      this.props.resizeMap()
      this.props.toggle()
    }
  }

   //react-load-script (https://www.npmjs.com/package/react-load-script) used for loading Google maps to avoid life cycle conflicts
   render() {
     return (
     <div className='map-area'>
       <Script
        url="https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyCnk13B0GvH152PBNcvAyJRURzQyCgDInk&v=3"
        onCreate={this.googleCalled.bind(this)}
        onError={this.handleError.bind(this)}
        onLoad={this.loadGoogleMap.bind(this)}
        />
       <div>
         <div className='header'>
             <div className='hamburger-container' onClick={this.openSidebar}>
               <i className="fas fa-bars" tabIndex={1}></i>
             </div>
           <div className='search-bar'>
            <form className='location-search' onSubmit={this.goToLocation}>
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  type='text'
                  placeholder='Where to, Nomad?'
                  className='search mdl-textfield__input location-search'
                  value={this.state.address}
                  onChange={(e) => this.updateAddress(e.target.value)}/>
                  <label
                    className='mdl-textfield__label'
                    >Text...
                  </label>
                  <div className='search-button'>
                   <input
                    id='go-to-button'
                    type='submit'
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    value='Search'/>
                </div>
             </div>
           </form>
         </div>
         <div id='map' style={mapStyle}>
           {this.state.mapStatus !== 'loaded' ? (
             <h5 className='loading-map'>Loading Map...</h5>
           ) : (
             <div></div>
           )}
         </div>
       </div>
     </div>
   </div>
     )
   }
}

export default Map
