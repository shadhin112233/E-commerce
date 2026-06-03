import React from 'react'
import './Hero.css'
import hand_icon from '../Asset/hand_icon.png'
import arrow_icon from '../Asset/arrow.png'
import hero_img from '../Asset/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>

        <div className="hero-hand-icon">
          <p>New</p>
          <img src={hand_icon} alt="" />
        </div>

        <p>Collections</p>
        <p>For Everyone</p>

        <div className="hero-latest-button">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  )
}

export default Hero