import React from 'react'

const Button = ( { title , id , rightIcon , leftIcon , containerClass } ) => {
  return (
    <a href="https://youtu.be/3QPfIu-_Ixo?si=1-2IJ73RwCPi1v6R">
      <button id={id} className={`flex items-center justify-center group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}>
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>
          { title }
        </div>
      </span>
      
      {rightIcon}
    </button>
    </a>
  )
}

export default Button