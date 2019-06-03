import React, {Component} from "react";
import Card from "react-bootstrap/Card";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faTint } from '@fortawesome/free-solid-svg-icons';

library.add(faCloudSun);
library.add(faTint);

class Tile extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.city}</Card.Title>                  
                    <Card.Text>
                    <h1>{this.props.temp} <FontAwesomeIcon icon="cloud-sun" color="yellow"  /></h1>
                    <h1>{this.props.humd} <FontAwesomeIcon icon="tint" color="skyblue" /></h1>              
                    </Card.Text>                
                </Card.Body>
            </Card>
        );
    }
}

export default Tile;