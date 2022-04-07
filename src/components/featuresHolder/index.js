import React, { useState } from 'react';
import FeaturesAnnotation from './featuresAnnotation';
import FeaturesCommonList from './featuresCommonList';
import { commonViewRotate } from '../utilities/DeviceControl'
import "./index.css";

function FeaturesHolder(props) {
  const {loadModel,showFeature, selectedFeaturesTab, setSelectedFeaturesTab,resetUnbox} = props;
  const [showFeatures,setShowFeatures] = useState(false);

  const [selectedFeatureList,setSelectedFeatureList] = useState("");
  return (
    <>
      { !showFeatures &&
         <img src={require("../../assets/images/customer/edit_icon.png")} onClick={()=>{setShowFeatures(true)}} className="featuresOpenerIcon" alt="edit icon"/>
      }
       {
         showFeatures &&
         <div className="featuresContainer">
             <div className="featuresInnerContainer">
               <div className="featuresNavHeader">
                  <h3 className="featuresContainerText">Edit</h3>
                  <img src={require("../../assets/images/customer/close.png")} className="featuresCloseIcon"  onClick={()=>{setShowFeatures(false);resetUnbox()}} alt="close"/>
               </div>
                <div className="featuresHeaderTab">
                  <h3 className={selectedFeaturesTab === "views" ? "featuresTabHeaderActiveText" : "featuresTabHeaderText"} onClick={()=>{setSelectedFeaturesTab("views")}}>Views</h3>
                  <h3 className={selectedFeaturesTab === "annotation" ? "featuresTabHeaderActiveText" : "featuresTabHeaderText"} 
                  // onClick={()=>{setSelectedFeaturesTab("annotation")}}
                  >Annotation</h3>
                  <h3 className={selectedFeaturesTab === "troubleshoot" ? "featuresTabHeaderActiveText" : "featuresTabHeaderText"} onClick={()=>{setSelectedFeaturesTab("troubleshoot")}}>Troubleshoot</h3>
                </div>
                <div className="featuresTabContent">
                  { selectedFeaturesTab === "views" &&
                    <FeaturesCommonList
                      type="views"
                      selectedFeatureList={selectedFeatureList}
                      setSelectedFeatureList={setSelectedFeatureList}
                      showFeature={showFeature}
                      onCLick={commonViewRotate(selectedFeatureList)}
                    />
                  }
                  { selectedFeaturesTab === "annotation" &&
                    <FeaturesAnnotation />
                  }
                  { selectedFeaturesTab === "troubleshoot" &&
                    <FeaturesCommonList
                      type="annotation"
                      selectedFeatureList={selectedFeatureList}
                      setSelectedFeatureList={setSelectedFeatureList}
                      showFeature={showFeature}
                    />
                  }
                </div>
                <div className="featuresButtonArea">
                    <button className="shareQRButton"
                    onClick={()=>{loadModel({
                      qr:true,
                      path:"access from state"
                    })}}
                    >Share QR</button>
                    <button className="unboxButton"
                    onClick={()=>{loadModel({
                      unBox:true,
                      path:"access from state"
                    })}}
                    >Unboxing</button>
               </div>
             </div>
         </div>
       }
    </>
   );
}

export default FeaturesHolder;
