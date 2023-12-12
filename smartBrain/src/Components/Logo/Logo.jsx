import React from 'react'
import {Tilt} from 'react-tilt'
import { LiaBrainSolid } from "react-icons/lia";
import './Logo.css'
const Logo = () => {
  return (
    <div className='ma4 mt0'>
        <Tilt className='Tilt br2 shadow-2' style={{ height: 150, width: 150 }}>
            <div className='Tilt-inner pa3' ><LiaBrainSolid size={110} style={{paddingTop:'5px'}}/></div>
            {/* we will use image later */}
        </Tilt>
    </div>
  )
}

export default Logo