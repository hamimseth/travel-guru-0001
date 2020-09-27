import { Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Context } from "../../App";
import './TravelArea.css'

const TravelArea = (props) => {

  const [showPlace, setShowPlace] = useContext(Context);
  const { title, description, img } = props.place;

  const backgroundImageStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "border-box",
    width: "98%",
    borderRadius:"10px",
    margin:"2px"
  }
  
  const travelAreaHandler=()=>{
    setShowPlace(props.place)
  }
  
  return (

    <Grid item xs={12} md={4}>
        <div className="travel-area" 
            onClick={travelAreaHandler} 
            style={backgroundImageStyle}>

          <h2 style={{ marginTop: "250px", textAlign: "center", color: "#3b5998" }}>
              {title}
          </h2>
        </div>

    </Grid>
  );
};

export default TravelArea;
