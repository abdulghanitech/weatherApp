import React, {Component} from "react";
import Header from "./Header";
import Tile from "./Tile";
import ls from "local-storage";


class Dashboard extends Component{

    constructor(){
        super();
        this.getStoredData = this.getStoredData.bind(this);
    }

    getStoredData(){
        if(ls.get("city") === null){
            //empty data
            var cities = []
            return cities;
        }else{
            //data is present
            var cities = JSON.parse(ls.get("city"));
            console.log(cities);
            return cities;
        }
    }

    render(){
        const tiles = [];
        //limit counter to 9, to show only 9 tiles
        var offset = 0;
        var cities = this.getStoredData();
        if(cities.length > 0){
            if(cities.length > 9){
                offset = cities.length - 10;
            }
            for(var i = cities.length-1; i >= offset; i--){
                tiles.push(<div className="col-md-4"><Tile city={cities[i].name} temp={cities[i].temp} humd={cities[i].humd}/></div>);
            }
        }
     
        return(
            <div className="container">
                <Header />   
                <div className="row">
                    {tiles} 
                </div>                
            </div>          
        );
    }
}

export default Dashboard;