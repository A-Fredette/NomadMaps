/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react'
import axios from 'axios'

const mapStyle = {
  width: '80vw',
  height: '100vh'
}

let map
const google = window.google
const darkTheme =  [
  {"featureType": "all","elementType": "all","stylers": [{"invert_lightness": true},{"saturation": "-9"},{"lightness": "0"},{"visibility": "simplified"}]},{"featureType": "landscape.man_made","elementType": "all","stylers": [{"weight": "1.00"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"weight": "0.49"}]},
  {"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "on"},{"weight": "0.01"},{"lightness": "-7"},{"saturation": "-35"}]},{"featureType": "road.highway","elementType": "labels.text","stylers": [{"visibility": "on"}]},
  {"featureType": "road.highway","elementType": "labels.text.stroke","stylers": [{"visibility": "off"}]},{"featureType": "road.highway","elementType": "labels.icon","stylers": [{"visibility": "on"}]}
]

const lightTheme = [
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#19a0d8"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e85113"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -40
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon"
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "color": "#efe9e4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#11ff00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#4cff00"
            },
            {
                "saturation": 58
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f0e4d3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    }
]

class Map extends Component {
  state = {
    map: {},
    address: '',
    theme: '',
    bounds: '',
    mapCenter: {
      lat: 52.5106,
      lng: 13.4422
    }
  }

  componentDidMount = () => {
    console.log("Component did mount fired")
    //creates and draws the initial map and stores it in this.state.map
      map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng}
    })
    this.props.setMap(map)
    console.log(map)
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
    this.setState({theme: lightTheme})
    this.props.map.setOptions({styles: this.state.theme})
  }

  darkTheme = () => {
    this.setState({theme: darkTheme})
    this.props.map.setOptions({styles: this.state.theme})
  }

  //Axios for handling HTTP requests Source: https://www.npmjs.com/package/axios
  axiosRequest = (event) => {
    event.preventDefault() //stop the form from reloading the page --> this causes componentDidMount to fire again
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCnk13B0GvH152PBNcvAyJRURzQyCgDInk')
  .then(response => {
    console.log(response)
    let coordinates = response.data.results[0].geometry.location
    console.log('Successfull HTTP request: ', coordinates)
    this.updateCenter(coordinates)
  })
  .catch(error => {
    console.log(error)
    })
  }

   render() {
     return (
       <div className='map-area'>
          <form className='location-search' onSubmit={this.goToLocation}>
            <div className="mdl-textfield mdl-js-textfield">
              <input
                type='text'
                placeholder='Where to?'
                className='mdl-textfield__input location-search'
                value={this.state.address}
                onChange={(e) => this.updateAddress(e.target.value)}/>
                <label
                  className='mdl-textfield__label'
                  for='sample1'>Text...
                </label>
             <input
                id='go-to-button'
                type='submit'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                value='Search'/>
           </div>
         </form>
         <div className='theme-options'>
           <h5>Theme Options</h5>
           <button
             className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
             onClick={this.darkTheme}>
             Dark</button>
           <button
             className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
             onClick={this.lightTheme}>
             Light</button>
         </div>
         <div id='map' style={mapStyle}></div>
       </div>
     )
   }
}

export default Map
