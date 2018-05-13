/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react'

const mapStyle = {
  width: '80vw',
  height: '100vh'
}

let map
const darkTheme =  [
  {"featureType": "all","elementType": "all","stylers": [{"invert_lightness": true},{"saturation": "-9"},{"lightness": "0"},{"visibility": "simplified"}]},{"featureType": "landscape.man_made","elementType": "all","stylers": [{"weight": "1.00"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"weight": "0.49"}]},
  {"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "on"},{"weight": "0.01"},{"lightness": "-7"},{"saturation": "-35"}]},{"featureType": "road.highway","elementType": "labels.text","stylers": [{"visibility": "on"}]},
  {"featureType": "road.highway","elementType": "labels.text.stroke","stylers": [{"visibility": "off"}]},{"featureType": "road.highway","elementType": "labels.icon","stylers": [{"visibility": "on"}]}
]

const lightTheme = [
  {"featureType": "water","stylers": [{"color": "#19a0d8"}]}, {"featureType": "administrative","elementType": "labels.text.stroke","stylers": [{"color": "#ffffff"}, {"weight": 6}]}, {"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#e85113"}]}, {"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#efe9e4"}, {"lightness": -40}]}, {"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"color": "#efe9e4"}, {"lightness": -20}]},{"featureType": "road","elementType": "labels.text.stroke","stylers": [{"lightness": 100}]}, {"featureType": "road","elementType": "labels.text.fill","stylers": [{"lightness": -100}]},
  {"featureType": "road.highway","elementType": "labels.icon"}, {"featureType": "landscape","elementType": "labels","stylers": [{"visibility": "off"}]}, {"featureType": "landscape","stylers": [{"lightness": 20}, {"color": "#efe9e4"}]}, {"featureType": "landscape.man_made","stylers": [{"visibility": "off"}]}, {"featureType": "water","elementType": "labels.text.stroke","stylers": [{"lightness": 100}]}, {"featureType": "water","elementType": "labels.text.fill","stylers": [{"lightness": -100}]}, {"featureType": "poi","elementType": "labels.text.fill","stylers": [{"hue": "#11ff00"}]}, {"featureType": "poi","elementType": "labels.text.stroke","stylers": [{"lightness": 100}]}, {"featureType": "poi","elementType": "labels.icon","stylers": [{"hue": "#4cff00"}, {"saturation": 58}]}, {"featureType": "poi","elementType": "geometry","stylers": [{"visibility": "on"}, {"color": "#f0e4d3"}]}, {"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#efe9e4"}, {"lightness": -25}]}, {"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#efe9e4"}, {"lightness": -10}]}, {"featureType": "poi","elementType": "labels","stylers": [{"visibility": "simplified"}]}]

class Map extends Component {
  state = {
    map: {},
    address: ''
  }

  //creates and draws the initial map and stores it in this.props.map (app.js)
  componentDidMount = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 52.5200, lng: 13.4050}
    })
    this.props.setMap(map)
   }

  //updates state address with address or search result
  updateAddress = (address) => {
    this.setState({address: address})
  }

  //centers map on address coordinates
  goToLocation = (event) => {
    event.preventDefault()
    this.props.findCenter(this.state.address)
  }

  lightTheme = () => {
    this.props.map.setOptions({styles: lightTheme})
  }

  darkTheme = () => {
    this.props.map.setOptions({styles: darkTheme})
  }

   render() {
     return (
       <div className='map-area'>
         <div className='header'>
           <div className='search-bar'>
            <form className='location-search' onSubmit={this.goToLocation}>
              <div className="mdl-textfield mdl-js-textfield">
                <input
                  type='text'
                  placeholder='Where to, Nomad?'
                  className='mdl-textfield__input location-search'
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
         <div className='theme-options'>
           <div className='theme-button-container'>
             <button
               className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
               onClick={this.darkTheme}>
               Dark
             </button>
             <button
               className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
               onClick={this.lightTheme}>
               Light
             </button>
            </div>
         </div>
       </div>
         <div id='map' style={mapStyle}></div>
       </div>
     )
   }
}

export default Map
