import React from 'react'
import { NavbarACUA } from '../component/NavbarACUA'

const HomeACUA = () => {

  return (
    <React.Fragment>
      <NavbarACUA />
      <div className='bannerAcua container-fluid bg-light d-flex justify-content-center align-items-end'>
        <div className="portraitBox">
          <div className="acuaPortraitText portraitPrimaryColor">
            <h1 className='actuaTitle' id='bannerTitle'>ACUA</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nobis nesciunt alias consequuntur debitis hic excepturi id rem aut, expedit</p>
          </div>
        </div>
        <div className="imageBox">
          <img className='bannerImage bannerImageSize' src="https://i.imgur.com/pOowMpC.png" alt="acua-member-with-guitar" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeACUA