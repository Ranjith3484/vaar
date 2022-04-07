import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import * as BABYLON from "babylonjs";
import * as ZapparBabylon from "@zappar/zappar-babylonjs";
import targetfile from "../../assets/faceMeshTemplate.png";
import { SceneLoader } from 'babylonjs';
import {GLTFFileLoader} from '@babylonjs/loaders';
import AssistView from "./assistView";
import NonAssistView from "./NonAssistView";
import {
  setScene,
  setFaceLandmarks,
  updateLandmarkPositions,
  createAnimations,
} from '../utilities/DevicePosition'
import { setDevice, setCanvas } from '../utilities/DeviceControl'
import { persist } from '../utilities/persist'
import { useSelector } from 'react-redux';

SceneLoader.RegisterPlugin(new GLTFFileLoader())

//Declare the variables to be used for the Face Landmarks
let leftEarLandmark = null;
let rightEarLandmark = null;
var scene = null;
var canvas = null;
var camera = null;
var faceTracker = null;
var engine = null;
// Face mesh
var faceMesh = null;

let pointerUp = true;
let pointerDown = false;
const annotationLines = []

var deviceAnimPath = null;
var deviceModelPath = null;
var devicePersist = null;
export function animateModel(){
  if(deviceAnimPath!=null){
    const modelScene3 = BABYLON.MeshBuilder.CreatePlane("unBoxPlane", {height:10000, width: 10000},scene);
    var mat3 = new BABYLON.StandardMaterial("black", scene);
    mat3.ambientColor = (0, 0, 0)
    mat3.diffuseTexture = new BABYLON.Texture("../../assets/black.jpeg",scene);

    modelScene3.material = mat3;
    modelScene3.visibility = 0.9;
    modelScene3.scaling.x =10;
    modelScene3.scaling.y =8;
    modelScene3.position.z = 5;
    BABYLON.SceneLoader.Append("", deviceAnimPath, scene, function (scene) {
      var walk = scene.getMeshByName("__root__");
      setScene(scene)
      //setDevice(scene)
        var walkScaling = {
           x:0.225,
           y:0.225,
           z:-0.225
        };
        var walkPosition = {
         x:0,
         y:-0.02,
         z:0.5
       };
       var walkRotation ={
         x:-0.5,
         y:0
       }

     //pushing rotation object to enable camera features
     walk.rotation = new BABYLON.Vector3(walkRotation.x, walkRotation.y);

     //pushing position object to enable camera features
     walk.position = new BABYLON.Vector3(walkPosition.x, walkPosition.y,walkPosition.z);

     //pushing scaling object to enable camera features
     walk.scaling = new BABYLON.Vector3(walkScaling.x,walkScaling.y,walkScaling.z);

     if (scene.animationGroups.length > 0) {
       for (let i = 0; i < scene.animationGroups.length; i++){
           scene.animationGroups[i].loopAnimation = false
           scene.animationGroups[i].speedRatio = 1.5
       }
     }
   })
  }
}

export function setModel(){
  if(deviceModelPath!=null){
    // hide default babylon loader
    BABYLON.SceneLoaderFlags.ShowLoadingScreen = false;
    BABYLON.SceneLoader.Append("", deviceModelPath, scene, function (scene) {
       var walk = scene.getMeshByName("__root__");
       if (scene.animationGroups.length > 0) {
         for (let i = 0; i < scene.animationGroups.length; i++){
          scene.animationGroups[i].loopAnimation = false
          scene.animationGroups[i].speedRatio = 2.5
        }
    }
       //Initializes the scene variable inside the device position script
      setScene(scene)
      setDevice(scene)

       if(!devicePersist){
         persist.scaling = {
            x:0.0425,
            y:0.0425,
            z:-0.0425
         };
         persist.position = {
          x:-0.15,
          y:0,
          z:0.5
        };
        persist.rotation ={
          x:0,
          y:0
        }
       }

      //pushing rotation object to enable camera features
      walk.rotation = new BABYLON.Vector3(persist.rotation.x, persist.rotation.y);

      //pushing position object to enable camera features
      walk.position = new BABYLON.Vector3(persist.position.x, persist.position.y,persist.position.z);

      //pushing scaling object to enable camera features
      walk.scaling = new BABYLON.Vector3(persist.scaling.x,persist.scaling.y,persist.scaling.z);

      document.getElementById("canvasModel").focus();
       //keyboard events for moving and scaling up the model
       scene.onKeyboardObservable.add((kbInfo) => {
        let walk = scene.getMeshByName("__root__");
        switch (kbInfo.type) {
          default:
          case BABYLON.KeyboardEventTypes.KEYDOWN:
            switch (kbInfo.event.key) {
              default:
              case "a":
              case "ArrowLeft":
                walk.position.x -= 0.015;
                break;
              case "d":
              case "ArrowRight":
                walk.position.x += 0.015;
                break;
              case "w":
              case "ArrowUp":
                walk.position.y += 0.015;
                break;
              case "s":
              case "ArrowDown":
                walk.position.y -= 0.015;
                break;
              case "z":
              case "Z":
                walk.scaling.x += 0.005;
                walk.scaling.y += 0.005;
                walk.scaling.z -= 0.005;
                break;
              case "u":
              case "U":
                walk.scaling.x -= 0.005;
                walk.scaling.y -= 0.005;
                walk.scaling.z += 0.005;
                break;
            }
        }
        persist.position.x = parseFloat(walk.position.x);
        persist.position.y = parseFloat(walk.position.y);

        persist.scaling.x = parseFloat(walk.scaling.x);
        persist.scaling.y = parseFloat(walk.scaling.y);
        persist.scaling.z = parseFloat(walk.scaling.z);
      });

      //mouse pad events for rotating the model
      let currentPosition = { x: 0, y: 0 };
      var currentRotation = { x: 0, y: 0 };
      let clicked = false;
      scene.onPointerObservable.add((pointerInfo) => {
        var walk = scene.getMeshByName("__root__");
        switch (pointerInfo.type) {
          default:
          case BABYLON.PointerEventTypes.POINTERDOWN:
            currentPosition.x = pointerInfo.event.clientX;
            currentPosition.y = pointerInfo.event.clientY;
            currentRotation.x = walk.rotation.x;
            currentRotation.y = walk.rotation.y;
            clicked = true;
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            clicked = false;
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            if (!clicked) {
              return;
            }
            if (walk !== null) {
              walk.rotation.y =
                currentRotation.y -
                (pointerInfo.event.clientX - currentPosition.x) / 100.0;

              walk.rotation.x =
                currentRotation.x +
                (pointerInfo.event.clientY - currentPosition.y) / 100.0;
            }
            break;
          case BABYLON.PointerEventTypes.POINTERWHEEL:
            break;
          case BABYLON.PointerEventTypes.POINTERPICK:
            console.log("POINTER PICK");
            break;
          case BABYLON.PointerEventTypes.POINTERTAP:
            break;
          case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
            break;
        }
        persist.position.x = parseFloat(walk.position.x);
        persist.position.y = parseFloat(walk.position.y);

        persist.rotation.x = parseFloat(walk.rotation.x);
        persist.rotation.y = parseFloat(walk.rotation.y);
      });
      createAnimations()
    });
  }
}

function CsrChatSection(props) {

const {endCall,micStatus, initialView, selectedVariant,persistModel,selectedFeaturesTab,deviceUnboxPath} = props;

const drawWidth = useSelector(state => state.annotate.width);
const annotateColor = useSelector(state => state.annotate.color);

useEffect(()=>{
  let scalingAnim = null;
if(selectedVariant){
  var path = selectedVariant.model;
  deviceModelPath = path;
  devicePersist = persistModel;
  setModel();
}
},[selectedVariant]);

useEffect(()=>{
  if(deviceUnboxPath!=null)
  {
      deviceAnimPath = deviceUnboxPath;
      animateModel();
  }
},[deviceUnboxPath]);

useEffect(() => {
  if(scene!==null){
    var drawLine = scene.getMeshByName("lines");
    setInterval(function() {
      console.log(drawLine)
      if (drawLine !== null){
        console.log("dispose function!!")
        drawLine.dispose();
      }


     } , 3000);
  }
},[scene])
  useEffect(() => {

     if(selectedFeaturesTab === "annotation" && selectedVariant){
      scene.onPointerObservable.observers[0].mask = 0;

       console.log("annotation feature")
       console.log(annotateColor);
      canvas = document.getElementById("canvasModel");

      // console.log(annotateColor)
    //   const engine = new BABYLON.Engine(canvas, true, {
    //    preserveDrawingBuffer: true,
    //    stencil: true,
    //  });

    // scene.clearColor = new BABYLON.Color3(10, 1, 0);
    var lineColor;
    if (annotateColor === "red") {
      lineColor = new BABYLON.Color3(1, 0, 0);

    }
    else if (annotateColor === "black"){
      lineColor = new BABYLON.Color3(0, 0, 0);

    }
    else{
      lineColor = new BABYLON.Color3(1, 1, 1);

    }


      const modelScene = BABYLON.MeshBuilder.CreatePlane("planeAnnotation", {height:20000, width: 10000},scene);
      //to appear over the model
      modelScene.position.z = 0.4
      modelScene.isVisible = false
       var linesed = [];

       linesed[0] = new BABYLON.Vector3(1, 10, 0);
       // Events
       var canvas = engine.getRenderingCanvas();
       var startingPoint;
       var currentMesh;
       var lines;
       var i;


       var getGroundPosition = function () {
           // Use a predicate to get position on the ground
           var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == modelScene; });
           if (pickinfo.hit) {
               return pickinfo.pickedPoint;
           }

           return null;
       }

       var onPointerDown = function (evt) {
        pointerUp = false;
        pointerDown = true;
           if (evt.button !== 0) {
               return;
           }

           // check if we are under a mesh
           var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== modelScene; });

               currentMesh = pickInfo.pickedMesh;
               startingPoint = getGroundPosition(evt);

               if (startingPoint) { // we need to disconnect camera from canvas
                   setTimeout(function () {
                       camera.detachControl(canvas);
                   }, 0);
               }

       }

       var onPointerUp = function () {
        pointerDown = false;
        pointerUp = true;
           if (startingPoint) {
               linesed = [];
               i = 0;
               camera.attachControl(canvas, true);
               startingPoint = null;
               setTimeout(()=>{
                for (let i = 0; i < annotationLines.length; i++) {
                  annotationLines[i].dispose()
                 }
               }, 3000)
               return;
           }
       }

       var onPointerMove = function (evt) {
         if (pointerDown && selectedFeaturesTab == "annotation"){
           if (!startingPoint) {
               return;
           }

           var current = getGroundPosition(evt);

           if (!current) {
               return;
           }

           lines =  BABYLON.Mesh.CreateLines("lines", linesed, scene);
           lines.color = lineColor;
          //  lines.mesh.scaling.setAll(100);
           linesed[i] = getGroundPosition(evt);
               i++;
           startingPoint = current;
           annotationLines.push(lines)
          }
       }

       canvas.addEventListener("pointerdown", onPointerDown, false);
       canvas.addEventListener("pointerup", onPointerUp, false);
       canvas.addEventListener("pointermove", onPointerMove, false);

      //  scene.render();

  }   else if(selectedFeaturesTab !== "annotation" && selectedVariant){

      let currentPosition = { x: 0, y: 0 };
      var currentRotation = { x: 0, y: 0 };
      let clicked = false;
      scene.onPointerObservable.add((pointerInfo) => {
        var walk = scene.getMeshByName("__root__");
        switch (pointerInfo.type) {
          default:
          case BABYLON.PointerEventTypes.POINTERDOWN:
            currentPosition.x = pointerInfo.event.clientX;
            currentPosition.y = pointerInfo.event.clientY;
            currentRotation.x = walk.rotation.x;
            currentRotation.y = walk.rotation.y;
            clicked = true;
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            clicked = false;
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            if (!clicked) {
              return;
            }
            if (walk !== null) {
              walk.rotation.y =
                currentRotation.y -
                (pointerInfo.event.clientX - currentPosition.x) / 100.0;

              walk.rotation.x =
                currentRotation.x +
                (pointerInfo.event.clientY - currentPosition.y) / 100.0;
            }
            break;
          case BABYLON.PointerEventTypes.POINTERWHEEL:
            break;
          case BABYLON.PointerEventTypes.POINTERPICK:
            console.log("POINTER PICK");
            break;
          case BABYLON.PointerEventTypes.POINTERTAP:
            break;
          case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
            break;
        }
        persist.position.x = parseFloat(walk.position.x);
        persist.position.y = parseFloat(walk.position.y);

        persist.rotation.x = parseFloat(walk.rotation.x);
        persist.rotation.y = parseFloat(walk.rotation.y);

      });
      scene.onPointerObservable.observers[0].mask = -1;
     }
  },[selectedFeaturesTab,selectedVariant]);
  useEffect(() => {
    canvas = document.getElementById("canvasModel");
      engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    scene = new BABYLON.Scene(engine);
    var light1 = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );
    light1.intensity = 2;
    // Create a Zappar AR camera
    camera = new ZapparBabylon.Camera("camera", scene);
    // Show Zappar's built-in UI to request camera permissions
    ZapparBabylon.permissionRequestUI().then(granted => {
    if (granted) {
      console.log(granted)
        // User granted the permissions so start the camera
        camera.start(true);
    } else {
        // User denied the permissions so show Zappar's built-in 'permission denied' UI
        ZapparBabylon.permissionDeniedUI();
    }
    });

    faceTracker = new ZapparBabylon.FaceTrackerLoader().load();
    // Face mesh
    faceMesh = new ZapparBabylon.FaceMeshGeometry('mesh', scene);
    const trackerTransformNode = new ZapparBabylon.FaceTrackerTransformNode('tracker', camera, faceTracker, scene);
    //Instantiates ear landmarks from the face tracker and passes these values to the face position script
    leftEarLandmark = new ZapparBabylon.FaceAnchorTransformNode('tracker', camera, faceTracker, ZapparBabylon.FaceLandmarkName.EAR_LEFT, scene);
    rightEarLandmark = new ZapparBabylon.FaceAnchorTransformNode('tracker', camera, faceTracker, ZapparBabylon.FaceLandmarkName.EAR_RIGHT, scene);
    setFaceLandmarks(leftEarLandmark, rightEarLandmark)

    const material = new BABYLON.StandardMaterial('mat', scene);
    material.diffuseTexture = new BABYLON.Texture(targetfile, scene);

    faceMesh.parent = trackerTransformNode;
    faceMesh.material = material;
    faceMesh.isVisible = false


    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001);
    document.getElementById("canvasModel").focus();

    window.addEventListener('resize', () => {
        engine.resize();
    });

  engine.stopRenderLoop();
    // Set up our render loop
    engine.runRenderLoop(() => {
        faceMesh.updateFromFaceTracker(faceTracker);
        camera.updateFrame();
        // Updates landmark variables every frame inside the device position script
        updateLandmarkPositions(leftEarLandmark, rightEarLandmark);
        scene.render();
    });
    }, []);

  console.log(drawWidth,annotateColor,"annotate values")

  return (
    <div className="csrViewContainer" id="csrViewContainer">
      <AssistView initialView={initialView} />
      <NonAssistView initialView={initialView} micStatus={micStatus}/>
       {/* controls */}
       <div className="csrControlsRow">
         <img src={require("../../assets/images/customer/mic_on.png")} id="csr-control-mic-mute" className="control-icon" alt="mic" style={{display:micStatus ? "" : "none"}}/>
         <img src={require("../../assets/images/customer/mic_off.png")} id="csr-control-mic-unmute" className="control-icon" alt="mic" style={{display:micStatus ? "none" : ""}}/>
         <img src={require("../../assets/images/customer/end-call.png")} className="control-icon" alt="mic" onClick={()=>{endCall()}}/>
      </div>

    </div>
  );
}

export default CsrChatSection;
