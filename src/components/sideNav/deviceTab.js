import React from 'react';
import products from "../../mock/products";
import { setModelName } from '../utilities/DeviceControl'

function DeviceTabContent(props) {
    const {selectedBrand,setSelectedBrand,selectedDevice,setSelectedDevice,selectedVariant,showModel} = props;
    
    return ( 
        <div className="deviceTabContainer">
             <div className="deviceListWrap">
             <div className="brand-inside-nav">
             {
                selectedBrand !== null && 
                <>
                  <h3 className="brand-top-nav-text" style={{cursor:'pointer'}} onClick={()=>{setSelectedBrand(null)}}>Brands</h3>
                  <h3 className="brand-top-nav-text"> {">"} {selectedBrand.brand}</h3>
                </>
            }
             </div>
           
            <h3 className="deviceTabHeader">{selectedBrand === null ? "Brands" : selectedBrand.brand}</h3>
            {
                selectedBrand === null ?
                products.map((item,i)=>
                <div className="deviceTabBrandRow" key={i} onClick={()=>{setSelectedBrand(item)}}>
                   <h5 className="brandName">{item.brand}</h5>
                   <img src={require("../../assets/images/customer/chevron-right.png")} className="chevron-icon" alt="icon"/>
                 </div>
                )
                :
                selectedBrand.devices.map((item,i)=>
                <div className="deviceTabBrandRow" key={i} onClick={()=>{
                  setSelectedDevice(item);
                  showModel({
                    model:true,
                    path:item.variant[0],
                    persist:false
                   }); 
                   setModelName(item.views)
                  }}>
                   <h5 className={selectedDevice !==null && selectedDevice.name === item.name ? "brandNameBold":"brandName"}>{item.name}</h5>
                 </div>
                )
            }
             </div>
             {  selectedDevice !== null &&
                <div className="selectedDeviceContainer">
                     <img src={selectedVariant.image} className="selectedDeviceImage" alt="device"/>
                    <div className="selectedDeviceInnerContainer">
                       <h3 className="selectedDeviceName">{selectedDevice.displayName}</h3>
                    </div>
                    <div className="variantListRow">
                    {
                       selectedDevice.variant !== null ?
                        selectedDevice.variant.map((item,i)=>
                        <div key={i} className="variantButton" 
                          style={
                            item === selectedVariant ? 
                            {
                                backgroundColor:item.color,
                                boxShadow:item.color === "white" ? "0px 0px 0px 2px white, 0px 0px 0px 3px grey" : "0px 0px 0px 2px white, 0px 0px 0px 3px "+ item.color,
                                border:item.color !== "white" && "0px"
                            } 
                             :
                            {backgroundColor:item.color}
                          } 
                          onClick={()=>{
                            showModel({
                              model:true,
                              path:item,
                              persist:true
                            })
                          }}>
                        </div>
                        )
                       :
                       null
                     }
                    </div>
                </div>
             }
        </div>
     );
}

export default DeviceTabContent;