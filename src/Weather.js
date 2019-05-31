import React, { Component } from 'react';

import axios from "axios";

import ls from 'local-storage';


class Weather extends Component{

    constructor(props){
        super(props);
        console.log("Weather!");
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            temp: 'Loading',
            humd: 'Loading'
        }
    }

    setCity(){

    }

    getCity(){
        
    }

    componentDidUpdate(){
        
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
          lat: nextProps.lat,
          lng: nextProps.lng,
        });

        if(nextProps.lat !== this.props.lat){
            //different props
            //make a call
        const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=5cefd7cdb8580f4f859bb32b687317a6';

        var requestUrl = `${OPEN_WEATHER_MAP_URL}&lat=${nextProps.lat}&lon=${nextProps.lng}`;

        axios.get(requestUrl)
        .then(res => {
            console.log(res.data);
            if (res.data.cod && res.data.message) {
                throw new Error(res.data.message);
              } else {
                this.setState({
                    temp: res.data.main.temp,
                    humd: res.data.main.humidity
                });
                var counter = 0;
                //check value of counter
                if(ls.get("counter") === null){
                     //counter is not set
                     counter = 1;
                     ls.set("counter", 1);
                     var resTemp = "res"+counter;
                     ls.set(resTemp,res.data);
                    
                }else{
                   //counter is set
                    counter = parseInt(ls.get("counter"));
                    counter++;
                    //increment the result
                    var resTemp = "res"+counter;
                    ls.set(resTemp,res.data);

                    //increment the counter
                    ls.set("counter", counter);
                    
                }
                
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
            <h1>Weather</h1>
            <p>Temperature: {this.state.temp} </p>
            <p>Humidity: {this.state.humd}</p>
            <p>lat: {this.state.lat} lng: {this.state.lng}</p>
        </div>
    );
}
}

export default Weather;