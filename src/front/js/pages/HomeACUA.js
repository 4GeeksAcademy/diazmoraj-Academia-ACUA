import React from 'react'
import { NavbarACUA } from '../component/NavbarACUA'
import { CircleIcon } from '../component/CircleIcon'
import { MultiButton } from '../component/MultiButton'

const HomeACUA = () => {

  return (
    <React.Fragment>
      <NavbarACUA />
      <div className='bannerAcua container-fluid d-flex justify-content-center align-items-end'>
        <div className="portraitBox">
          <div className="acuaPortraitText portraitPrimaryColor">
            <div className="boxPoints">
              <img className='pointsUpper' src="https://i.imgur.com/hJ1Q7yE.png" alt="" />
            </div>
            <h1 className='acuaTitle' id='bannerTitle'>ACUA</h1>
            <p className='acuaShortResume'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nobis nesciunt alias consequuntur debitis hic excepturi id rem aut, expedit</p>
            <MultiButton color='purple' text='Suscribete!' width='160' />
          </div>
        </div>
        <div className="imageBox">
          <div className="cardFollowers d-flex flex-column pt-2 align-items-center">
            <div className="text pt-2 pb-0 mb-0">
              <p className='portraitSecundaryColor'><strong className='text-dark mediumWeight 500'>+2K</strong> Estudiantes!</p>
            </div>
            <div className="studensIcons d-flex flex-row">
              <CircleIcon imageURL="https://i.imgur.com/jWojpCS.png" height='50' padding='3' />
              <CircleIcon imageURL="https://i.imgur.com/K6ACBeJ.png" height='50' padding='3' />
              <CircleIcon imageURL="https://i.imgur.com/vdfRemM.png" height='50' padding='3' />
              <CircleIcon imageURL="https://i.imgur.com/v0igEMu.png" height='50' padding='3' />
              <CircleIcon imageURL="https://i.imgur.com/3v56FcY.png" height='50' padding='3' />
            </div>
          </div>
          <div className="cardFollowers p-2" id='secondCard'>
            <div className="firstUser d-flex flex-row align-items-center justify-content-around pe-2">
              <CircleIcon imageURL="https://i.imgur.com/z1ePcdj.png" height='45' padding='2' />
              <p className='mediumWeight pt-1'>Queen Latifah</p>
            </div>
            <div className="secondUser d-flex flex-row align-items-center justify-content-around pe-2">
              <CircleIcon imageURL="https://i.imgur.com/yAnz4w2.png" height='45' padding='2' />
              <p className='mediumWeight pt-1'>Michel Jones</p>
            </div>
          </div>
          <img className='arrowPng' src="https://i.imgur.com/DBQCFkR.png" alt="" />
          <img className='bannerImage bannerImageSize' src="https://i.imgur.com/pOowMpC.png" alt="acua-member-with-guitar" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeACUA