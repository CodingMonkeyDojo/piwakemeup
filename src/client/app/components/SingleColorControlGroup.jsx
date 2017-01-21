import React from 'react'
import ColorToggle from './ColorToggle.jsx'
import ColorSlider from './ColorSlider.jsx'

let SingleColorControlGroup = ({color, onToggle, toggleStatus, powerLevel, onSlide}) => {
    return (
        <div style={{display: 'flex', padding: '10px'}}>
            <div>
                <ColorToggle colorLabel={color} initialStatus={toggleStatus} onToggle={onToggle} />
            </div>
            <div style={{marginLeft: '50px', marginTop:'15px'}}>
                <ColorSlider color={color} powerLevel={powerLevel} onChange={onSlide} />
            </div>
        </div>
    )
}

export default SingleColorControlGroup;