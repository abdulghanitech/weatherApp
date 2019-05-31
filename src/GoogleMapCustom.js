import React, { Component } from 'react';

class GoogleMapCustom extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
        }
    }

     componentDidMount() {
         new window.google.maps.Map(this.refs.map, {
            zoom: 12,
            center: {
                lat: this.state.lat,
                lng: this.state.lng
             }
          });
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          lat: nextProps.lat,
          lng: nextProps.lng,
        });
        new window.google.maps.Map(this.refs.map, {
            zoom: 12,
            center: {
                lat: nextProps.lat,
                lng: nextProps.lng
             }
          });
      }
    

  render() {
      return <div className="google-map" ref="map" />
  }
}

export default GoogleMapCustom;