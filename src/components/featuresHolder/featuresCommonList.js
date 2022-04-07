import React from 'react';

function FeaturesCommonList(props) {
    const {type,selectedFeatureList,setSelectedFeatureList,showFeature} = props;
    const viewsData = ["Front Camera","Back Camera", "Sim Insert", "Charging Port"];
    const troubleShootData = ["Sim Swap", "Activation Failure", "Contact / Data Transfer"];
    const header = type === "views" ? "Camera Angles" : "Common";
    const listData = type === "views" ? viewsData : troubleShootData;
    return ( 
        <div className="featuresCommonListWrap">
           <h3 className="featuredCommonListH3">{header}</h3>
           {
               listData.map((item,i)=>
                <div className={selectedFeatureList === item ? "featuresCommonListActiveText" : "featuresCommonListText"} key={i} 
                 onClick={()=>{setSelectedFeatureList(item);showFeature(item)}}>
                   {item}
                </div>
               )
           }
        </div>
    );
}

export default FeaturesCommonList;