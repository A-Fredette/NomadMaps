/* eslint-disable no-undef */
import React, { Component } from 'react'
import './App.css'

class ListView extends Component {
  state = {
    filter: 'No Filter'
  }

  //TODO: (Not required for graudation) Set google auto complete search boxes

  //Display all markers in the markers prop
  resetMarkers = () => {
    for (let marker in this.props.markers) {
      this.props.markers[marker].setMap(this.props.map)
    }
  }

  //Displays only the markers with interests matching the markers props
  matchMarkers = (interest) => {
    for (let marker in this.props.markers) {
      console.log(this.props.markers[marker].interest.interest)
      if (this.props.markers[marker].interest.interest === interest) {
        this.props.markers[marker].setMap(this.props.map)
      } else {
        this.props.markers[marker].setMap(null)
      }
    }
  }

  //updates filter state with entered text
  updateFilter = (query, callback) => {
    this.setState({filter: query}, () => {
      console.log(this.state.filter)
      if (this.state.filter !== 'No Filter') {
        this.matchMarkers(query)
      } else {
        this.resetMarkers()
      }
    })}

  //called when list item is clicked on to access the associated marker
  clickMarker = (e) => {
    let findIndex = this.props.markers.findIndex(thisMarker => thisMarker.id === e.id)
    let marker = this.props.markers[findIndex] //find associated marker by matching IDs

    if (marker.clickCount === 0) {
      marker.setAnimation(google.maps.Animation.BOUNCE) //set and timeout marker animation (one bounce)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 750)

      marker.infowindow.open(this.props.maps, marker) //open inforwindow
      marker.clickCount = 1
    } else {
      marker.infowindow.close()
      marker.clickCount = 0
    }
  }

//includes conditional logic for applying filter when drop down filter menu is used
//TODO: (not required for graduating) Update to a text filter based on location names and types
  render() {
    return (
      <div>
        <div className='list-filter'>
          <div>
          <select value={this.state.value} role='Menu' onChange={(e) => this.updateFilter(e.target.value)}>
            <option value='No Filter'>No Filter</option>
            {this.props.interests.map((interest) => (
                <option key={interest.id} role='Menuitem' value={interest.interest}>{interest.interest} </option>
            ))}
            </select>
          </div>
        </div>
        <div>
          {this.state.filter !== 'No Filter' ? (
            <div>
            {this.props.places.filter(place => place.interest === this.state.filter).map((place) => (
                <div className='interest-list' key={place.interest}>
                  <div className='interest-header' role='Heading'><h6>{place.interest}</h6></div>
                  <hr></hr>
                  {place.locations.map((place) =>(
                    <li key={place.id} id={place.id} onClick={(e) => this.clickMarker(e.target)}>{place.name}</li>
                  ))}
                </div>
              ))
            }
            <hr></hr>
          </div>
        ) : (
          <div>
            {this.props.places.map((place) => (
                <div className='interest-list' key={place.interest}>
                  <div className='interest-header' role='Heading'><h6>{place.interest}</h6></div>
                  <hr></hr>
                  {place.locations.map((place) =>(
                    <li key={place.id} id={place.id} onClick={(e) => this.clickMarker(e.target)}>{place.name}</li>
                  ))}
                </div>
              ))
            }
          </div>
        )
      }
        </div>
      </div>
    )
  }
}

export default ListView
