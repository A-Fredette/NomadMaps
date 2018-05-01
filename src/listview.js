/* eslint-disable no-undef */
import React, { Component } from 'react'
import './App.css'


class ListView extends React.Component {
  state = {
    filter: ''
  }

  updateFilter = (query) => {
    this.setState({filter: query})
    console.log(this.state.filter)
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
              <li className= 'interest-list' key={place.interest}>
                <hr></hr>
                <div>{place.interest}</div>
                {place.locations.map((place) =>(
                  <div>{place.name}</div>
                ))}
              </li>
            ))
          }
        </div>
      </div>
    )
  }
}

export default ListView
