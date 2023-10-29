import {useFrame} from "@react-three/fiber";
import {easing} from "maath";
import {useSnapshot} from "valtio";
import state from "../store/index.js";
import {useRef} from "react";

const CameraRig = ({ children }) => {
  const group = useRef()
  const snap = useSnapshot(state)

  // Make Object rotate
  useFrame((state,delta)=>{
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Initial position of the model
    let targetPosition = [-0.4, 0, 2]
    if (snap.intro) {
      if(isBreakPoint) targetPosition = [0,0,2];
      if(isMobile) targetPosition = [0,1, 2.5]
    } else {
      isMobile ? targetPosition = [0,0,2.5] : targetPosition = [0,0,2];
    }

    // Set Camera Position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // Making Object rotate
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })
  return <group ref={group}>{children}</group>
}

export default CameraRig