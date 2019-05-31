// Imports
import React, { Component } from 'react';

//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

// Import Search Bar Components
import SearchBar from 'material-ui-search-bar';


class Search extends Component {
  
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: '',
      lat: '',
      lng: ''
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.updateLocation = this.updateLocation.bind(this);

  }

  handleScriptLoad() { 
    // Declare Options For Autocomplete 
    var options = { types: ['(cities)'] }; 
    
    // Initialize Google Autocomplete 
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
                          document.getElementById('autocomplete'),
                          options ); 
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed',
                                  this.handlePlaceSelect); 
  }

  handlePlaceSelect() {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      console.log(addressObject.geometry.location.lat());
      console.log(addressObject.geometry.location.lng());
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
          lat: addressObject.geometry.location.lat(),
          lng: addressObject.geometry.location.lng(),
          latlng: {"lat": addressObject.geometry.location.lat(), "lng": addressObject.geometry.location.lng()}
        }
      );

      //callback parent
      this.props.city(this.state.city);
      this.props.latlng(this.state.latlng);

    }
  }

  updateLocation(){
    
    //callback parent
    this.props.city(this.state.city);
    this.props.latlng(this.state.latlng);

  }

  

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?v=3.&key=AIzaSyD66IEb_9HBiqxXr4Z2miiTZEsgzuL8X_U&libraries=geometry,drawing,places"
          onLoad={this.handleScriptLoad}
        />
        <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query} 
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default Search;