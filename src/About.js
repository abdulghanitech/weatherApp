import React, {Component} from "react";
import Header from "./Header";

class About extends Component{

    render(){
        return(
            
            <div>
                <Header />
                <h3 style={{color: "white", textAlign: "center", marginTop: "40vh"}}>A simple Weather App built using React, Google Maps and OpenWeather. </h3>
                <p style={{textAlign: "center"}}>Developed by <a href="https://abdulghani.me" style={{color: "#ffee07"}}>Abdul Ghani</a>< br/> Fork this project on <a href="https://github.com/abdulghani200/weatherApp" style={{color: "#212529"}}>Github</a></p>
            </div>
        );
    }
}

export default About;
