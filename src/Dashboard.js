import React, {Component} from "react";
import Header from "./Header";
import Tile from "./Tile";
import ls from "local-storage";


class Dashboard extends Component{

    constructor(){
        super();
        this.getCity = this.getCity.bind(this);
        this.getTemp = this.getTemp.bind(this);
        this.getHumd = this.getHumd.bind(this);
        this.getCounter = this.getCounter.bind(this);
        this.getStoredData = this.getStoredData.bind(this);
    }

    getCounter(){
        if(ls.get("counter") === null){
            //counter empty, no recent searches  
            return 0;      
        }else{
            //counter not empty
            var counter = parseInt(ls.get("counter"));
            return counter;

        }
    }

    getCity(res){
        console.log(res);
        if(ls.get(res) === null){
            //empty
        }else{
            var tempData = ls.get(res);
            console.log(tempData.name);
            return tempData.name;
        }       
    }

    getTemp(res){
        if(ls.get(res) === null){
            //empty
        }else{
            var tempData = ls.get(res);
            console.log(tempData.main.temp);
            return tempData.main.temp;
        }      
    }

    getHumd(res){
        if(ls.get(res) === null){
            //empty
        }else{
            var tempData = ls.get(res);
            console.log(tempData.main.humidity);
            return tempData.main.humidity;
        }     
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
        var length = this.getCounter();
        var offset = 0;
       /*  if(length > 9){
            offset = length - 9;
        } */
    /*     for(var i = length; i > offset; i--){  

            tiles.push(<div className="col-md-4"><Tile city={this.getCity("res"+i)} temp={this.getTemp("res"+i)} humd={this.getHumd("res"+i)}/></div>);
        } */

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
                <h1>Dashboard</h1>
                <div className="row">
                {tiles} 
                </div>
                         
                
            </div>
            
        );
    }
}

export default Dashboard;