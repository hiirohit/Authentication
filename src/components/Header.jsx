import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import Context from '../context/Context'

function Header() {
  const {userData} = useContext(Context)
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      
      <img
        src={assets.logo}
        alt="header"
        width={120}
        className="sm:w-24 mb-4 custom-computer-image"
      />

      <h5 className="font-semibold text-base sm:text-lg">
        Hey {userData ? userData.name : "Developer"} 👋
      </h5>

      <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mt-3 leading-tight">
        Welcome to our product
      </h1>

      <p className="text-gray-500 text-base sm:text-lg mt-4 max-w-md">
        Let’s start with a quick product tour and you can set up authentication in no time!
      </p>

      <button
        className="
         btn btn-outline-dark rounded-pill px-3
         "
      >
        Get Started
      </button>

    </div>
  )
}

export default Header
