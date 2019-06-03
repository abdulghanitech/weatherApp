import React, {Component} from "react";
import Header from "./Header";

class About extends Component{

    render(){
        return(
            
            <div>
                <Header />
                <h3 style={{color: "white", textAlign: "center", marginTop: "40vh"}}>A simple Weather App built using React, Google Maps and OpenWeather. </h3>
            </div>
        );
    }
}

export default About;
