// Imports
import React, { Component } from 'react';

import Search from "./SearchBar";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import GoogleMapCustom from "./GoogleMapCustom";

import Weather from "./Weather";

class Map extends Component{
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: '',
      lat: 17.315044,
      lng: 78.426671,
      citySet: false,
      latlngChng: false
    }; 
  }


  handleSelectChange(newCity){
    this.setState({
        city: newCity
        
    });
    console.log(newCity);
  }

  handleLocationChange(location){
    console.log(location);
      this.setState({
          lat: location.lat,
          lng: location.lng,
          citySet: true
          
      });
  }

  render(){
      const isCitySet = this.state.city;     
      return(
        <div>
        <MuiThemeProvider>
            <Search 
            city={this.handleSelectChange.bind(this)}
            latlng={this.handleLocationChange.bind(this)}
                />
        </MuiThemeProvider>
        {
            isCitySet ? (<div><GoogleMapCustom lat={this.state.lat} lng={this.state.lng} /> <Weather lat={this.state.lat} lng={this.state.lng} city={this.state.city}/></div>) : (<div></div>)
        
        }            
        </div>
      );
  }
}

export default Map;