// components/ConfettiWrapper.jsx
import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const ConfettiWrapper = ({ children }) => {
  const { width, height } = useWindowSize()

  
  return (
    <div className="relative">
      <Confetti width={width} height={height} />
      {children}
    </div>
  )
}

export default ConfettiWrapper
