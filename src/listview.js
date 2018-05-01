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
    console.log(e.id) //place id that will also match marker id
    //google.maps.event.trigger(marker[e.id], 'click')
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
