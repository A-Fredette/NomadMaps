/* eslint-disable no-undef */
import React, { Component } from 'react'
import './App.css'


class ListView extends React.Component {
  state = {
    filter: ''
  }

  //updates filter state with entered text
  updateFilter = (query) => {
    this.setState({filter: query})
    console.log(this.state.filter)
  }

  //called when list item is clicked on
  clickMarker = (e) => {
    let findIndex = this.props.markers.findIndex(thisMarker => thisMarker.id === e.id)
    let marker = this.props.markers[findIndex]
    marker.setAnimation(google.maps.Animation.BOUNCE)
    setTimeout(() => {
      marker.setAnimation(null)
    }, 750)
    let infowindow = marker.infowindow
    infowindow.open(this.props.maps, marker)
    console.log(infowindow)
    console.log('matching marker :', this.props.markers[findIndex])
  }

  render() {
    return (
      <div>
        <div classnName='list-filter'>
          <input
            type="text"
            placeholder="Filter"
            onChange={(e) => this.updateFilter(e.target.value)}
            //TODO: When this filter is used, filter the list view to only places that meet filter text
          />
        </div>
        <div>
          {this.props.places.map((place) => (
              <div className='interest-list' key={place.interest}>
                <div>{place.interest}</div>
                <hr></hr>
                {place.locations.map((place) =>(
                  <li key={place.id} id={place.id} onClick={(e) => this.clickMarker(e.target)}>{place.name}</li>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default ListView
