import React from 'react'

// LeftNavMenuItem component for rendering individual menu items in the sidebar
const LeftNavMenuItem = ({text, icon, action, className}) => {
    return (
        <div 
            className={"text-white text-sm cursor-pointer flex items-center h-10 px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " + className}
            onClick={action}
        >
            <span className='text-xl mr-5'>{icon}</span>
            {text}
        </div>
    )
}

export default LeftNavMenuItem