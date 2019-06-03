import React, { Component } from 'react';

import axios from "axios";

import ls from 'local-storage';

import Card from "react-bootstrap/Card";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faTint } from '@fortawesome/free-solid-svg-icons';

library.add(faCloudSun);
library.add(faTint);


class Weather extends Component{

    constructor(props){
        super(props);
        console.log("Weather!");
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            description: "",
            temp: 'Loading',
            humd: 'Loading'
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState({
          lat: nextProps.lat,
          lng: nextProps.lng,
        });

        if(nextProps.lat !== this.props.lat){
            //different props
            //make a call
        const OPEN_WEATHER_MAP_URL = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=5cefd7cdb8580f4f859bb32b687317a6';

        var requestUrl = `${OPEN_WEATHER_MAP_URL}&lat=${nextProps.lat}&lon=${nextProps.lng}`;

        axios.get(requestUrl)
        .then(res => {
            console.log(res.data);
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message);
              } else {
                this.setState({
                    temp: res.data.main.temp,
                    humd: res.data.main.humidity,
                    description: res.data.weather[0].description
                });
                
                //get previous data
                var cities = ls.get("city");
                var receivedData;
                var receivedDataArray = []; 
                if(cities === null){
                   //empty cities
                   //add new data to it
                   var tempData = {"name": res.data.name,"temp": res.data.main.temp, "humd": res.data.main.humidity};
                   receivedDataArray.push(tempData);
                   console.log(receivedDataArray);
                   //convert to JSON
                    var dataToBePushed = JSON.stringify(receivedDataArray);
                    ls.set("city",dataToBePushed);

                }else{
                    //cities are there
                    //retrieve data
                    console.log(cities);    
                    receivedData = JSON.parse(cities);   
                    console.log(receivedData);        
                    //add new data to it
                    var tempData = {"name": res.data.name,"temp": res.data.main.temp, "humd": res.data.main.humidity};
                    //push it
                    receivedData.push(tempData);
                    console.log(receivedData);
                    //convert to JSON
                    var dataToBePushed = JSON.stringify(receivedData);
                    ls.set("city",dataToBePushed);
                }
                
                return res.data;
              }
            }, function (res) {
                throw new Error(res.data.message);
            });
        }        

    }

render(){
    return(
        <div>
            <Card style={{ width: '70vw', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Body>                                    
                    <Card.Text>
                    <h1>{this.props.city}</h1>      
                    <h3>Temperature {this.state.temp} <FontAwesomeIcon icon="cloud-sun" color="yellow" /> | Humidity {this.state.humd} <FontAwesomeIcon icon="tint" color="skyblue" /></h3>
                    <h3>{this.state.description}</h3>                            
                    </Card.Text>                
                </Card.Body>
            </Card>
        </div>
    );
}
}

export default Weather;