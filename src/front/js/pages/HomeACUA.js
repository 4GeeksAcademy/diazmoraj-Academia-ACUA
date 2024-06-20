import React from 'react'
import { NavbarACUA } from '../component/NavbarACUA'
import { CircleIcon } from '../component/CircleIcon'

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
            <h1 className='actuaTitle' id='bannerTitle'>ACUA</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nobis nesciunt alias consequuntur debitis hic excepturi id rem aut, expedit</p>
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
            <div className="firstUser">
              <CircleIcon imageURL="https://i.imgur.com/z1ePcdj.png" height='45' padding='2' />
            </div>
            <div className="secondUser">
              <CircleIcon imageURL="https://i.imgur.com/yAnz4w2.png" height='45' padding='2' />
            </div>
          </div>

          <img className='bannerImage bannerImageSize' src="https://i.imgur.com/pOowMpC.png" alt="acua-member-with-guitar" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomeACUA