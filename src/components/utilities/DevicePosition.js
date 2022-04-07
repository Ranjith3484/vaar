import * as BABYLON from "babylonjs"

let scene = null;
let device = null;
let plane = null;
let leftEarLandmark = null;
let rightEarLandmark = null;
let leftAnchor = new BABYLON.Vector3(0.15, 0, 0.5);
let rightAnchor = new BABYLON.Vector3(-0.15, 0, 0.5);
let leftBoundry = null;
let rightBoundry = null;
let scalingDownAnim = null;
let scalingUpAnim = null;

const framerate = 30

export function createAnimations() {
    scalingDownAnim = new BABYLON.Animation(
        "scalingDownAnimation",
        "scaling",
        framerate,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    let keysDown = [];

    keysDown.push({
        frame: 0,
        value: new BABYLON.Vector3(0.0425, 0.0425, -0.0425)
        // value: 0.0425
    })

    keysDown.push({
        frame: 3,
        value: new BABYLON.Vector3(0, 0, 0)
        // value: 0
    })

    scalingDownAnim.setKeys(keysDown);
    device.animations = [];
    device.animations.push(scalingDownAnim)
}

export function setScene(loadedScene) {
    scene = loadedScene;
    device = scene.getMeshByName("__root__")
    plane = scene.getMeshByName("unBoxPlane")
    leftBoundry = true
    createAnimations()
}

export function setFaceLandmarks(leftEar, rightEar) {
    leftEarLandmark = leftEar;
    rightEarLandmark = rightEar;
}

export function updateLandmarkPositions(leftLandmark, rightLandmark) {

    if (rightAnchor !== null && device !== null && rightLandmark.position.x <= rightAnchor.x * 10) {
        if (leftBoundry) {
            leftBoundry = false
            rightBoundry = true

            setTimeout(async () => {
                var scaleDown = scene.beginAnimation(device, 0, 3, false)
                await scaleDown.waitAsync();
                device.position = leftAnchor
                scene.beginAnimation(device, 3, 0, false)
            })
        }
    }

    if (leftAnchor !== null && device !== null && leftLandmark.position.x >= leftAnchor.x * 10) {
        if(rightBoundry) {
            leftBoundry = true
            rightBoundry = false

            setTimeout(async () => {
                var scaleDown = scene.beginAnimation(device, 0, 3, false)
                await scaleDown.waitAsync();
                device.position = rightAnchor
                scene.beginAnimation(device, 3, 0, false)
            })
        }
    }
}

export function disposeScene() {
   if(scene !== null && device !== null){
      device.dispose();
   }
   if(plane !== null)
    plane.dispose();

}
