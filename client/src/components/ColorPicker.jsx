import React from 'react'
import {useSnapshot} from "valtio";
import { SketchPicker } from "react-color";
import state from "../store/index.js";

const ColorPicker = () => {
  const snap = useSnapshot(state)

  return (
      <div
        className='absolute left-full ml-3'
      >
        <SketchPicker
         color={snap.color}
         disableAlpha
         onChange={(color) => state.color = color.hex}
         // presetColors = {['']}
        />
      </div>
  )
}

export default ColorPicker