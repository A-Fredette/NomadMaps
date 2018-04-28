/* eslint-disable no-undef */
import React, { Component } from 'react'
import './App.css'


class ListView extends React.Component {

  render() {
    return (
      <div>
        <div classnName='list-filter'>
          <input
            type="text"
            placeholder="Filter"
            //onChange={(e) => this.updateInterest(e.target.value)}
            //TODO: When this filter is used, filter the list view to only show filter
          />
        </div>
      </div>
    )
  }
}

export default ListView
