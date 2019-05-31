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
      lat: 17.385044,
      lng: 78.486671,
      citySet: false,
      latlngChng: false
    }; 
    
    //bind functions
    //this.handleSelectChange = this.handleSelectChange.bind(this);

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
            isCitySet ? (<GoogleMapCustom lat={this.state.lat} lng={this.state.lng} />) : (<div></div>)
        
        }

        <Weather lat={this.state.lat} lng={this.state.lng} />
        
            
        </div>
      );
  }
}

export default Map;