import * as BABYLON from "babylonjs";
import { persist } from "./persist";

let scene = null;
let device = null;
let viewRotations = {front: 0, back: 0, sim: 0, charge: 0}

export function setDevice(loadedScene) {
    scene = loadedScene;
    device = scene.getMeshByName("__root__")

    console.log(document.getElementById('canvasModel'))
}

export function setCanvas(loadedScene, loadedCanvas) {
    console.log(loadedScene.getMeshByName("__root__"))
}

export function setModelName(item) {
    viewRotations = {front: item.front, back: item.back, sim: item.sim, charge: item.charge}
    console.log(viewRotations.front)
}

export function commonViewRotate(commonView) {
    console.log(scene)
    if(device !== null) {
        if (commonView === 'Front Camera') {
            device.rotation = new BABYLON.Vector3(0, 0, 0)
            device.rotation = viewRotations.front;
            persist.rotation = viewRotations.front;

            console.log(device)
        }
    
        if (commonView === 'Back Camera') {
            device.rotation = new BABYLON.Vector3(0, 0, 0)
            device.rotation = viewRotations.back
            persist.rotation = viewRotations.back
            console.log(device)
        }

        if (commonView === 'Sim Insert') {
            device.rotation = new BABYLON.Vector3(0, 0, 0)
            device.rotation = viewRotations.sim
            persist.rotation = viewRotations.sim
            console.log(device)
        }

        if (commonView === 'Charging Port') {
            device.rotation = new BABYLON.Vector3(0, 0, 0)
            device.rotation = viewRotations.charge
            persist.rotation = viewRotations.charge
            console.log(device)
        }
    }
}

function registerActions() {
    console.log('Registering Actions')
}