import React, { useEffect } from 'react';
import * as BABYLON from 'babylonjs'
// import { Engine } from 'babylonjs';
import "./index.css";
import { changeAnnotateColor, changeAnnotateWidth } from '../../redux/actions';
import { useSelector,useDispatch } from 'react-redux';

function FeaturesAnnotation() {
    const color = ['red','black','white'];
    const dispatch = useDispatch();
    const drawWidth = useSelector(state => state.annotate.width);
    const annotateColor = useSelector(state => state.annotate.color);


    const changeWidth = (e) =>{
        dispatch(changeAnnotateWidth(parseInt(e.target.value)))
    }

    const changeColor = (val) =>{
      dispatch(changeAnnotateColor(val))
    }

    

    useEffect(()=>{
        // slider track color
        document.querySelectorAll(".slider").forEach(function(el) {       
            el.oninput =function(){            
            var valPercent = (el.valueAsNumber  - parseInt(el.min)) / 
                                (parseInt(el.max) - parseInt(el.min));
              var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop('+ valPercent+', black), color-stop('+ valPercent+', #cccccc));';
              el.style = style;
            };
            el.oninput();
          });
    },[])

    return ( 
        <div className="featuresCommonListWrap">
            <h3 className="featuredCommonListH3">Attributes</h3>
            <h4 className="featuresAnnotationSubHead">Brush Size</h4>
               <div className="sliderRow">
                   <div>
                   <div className="colorDotWrap">
                      <div className="colorDot"></div>
                   </div>
                   <h4 className="featuresAnnotationPixel">{drawWidth}px</h4>
                   </div>
                   <input className="slider" id="range" value={drawWidth} type="range" max="10" min="1" step="1" onChange={changeWidth}/>
               </div>
              <h4 className="featuresAnnotationSubHead">Color</h4>
              <div className="annotateColorRow">
                   {
                       color.map((item,i)=>
                       <div key={i} className="annotateColorButton" 
                       style={
                         item === annotateColor ? 
                         {
                             backgroundColor:item,
                             boxShadow: "0px 0px 0px 2px white, 0px 0px 0px 3px grey",
                         } 
                          :
                         {backgroundColor:item}
                       } 
                       onClick={()=>{changeColor(item)}}>
                 </div>
                       )
                   }
              </div>
        </div>
     );
}

export default FeaturesAnnotation;