import React, { useEffect } from 'react'
import { NavbarACUA } from '../component/NavbarACUA'
import { CircleIcon } from '../component/CircleIcon'
import { MultiButton } from '../component/MultiButton'
import { Carousel } from '../component/Carousel'
import { CardGoals } from '../component/Card/CardGoals'
import { CardPlan } from '../component/Card/CardPlan'
import { Link } from 'react-router-dom'

const HomeACUA = () => {

  return (
    <React.Fragment>
      <NavbarACUA />
      <div className='bannerAcua container-fluid d-flex justify-content-center align-items-end'>
        <div className="portraitBox">
          <div className="acuaPortraitText portraitPrimaryColor" style={{ zIndex: '3' }}>
            <div className="boxPoints">
              <img className='pointsUpper' src="https://i.imgur.com/hJ1Q7yE.png" alt="" />
            </div>
            <h1 className='acuaTitle' id='bannerTitle'>ACUA</h1>
            <p className='acuaShortResume mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nobis nesciunt alias consequuntur debitis hic excepturi id rem aut, expedit</p>
            <MultiButton color='purple' text='Suscribete!' width='160' link='/signup' />
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
      <section className="ourProfessors" style={{ marginTop: '100px' }}>
        <div className="professorsTitleBox d-flex flex-column align-items-center">
          <h2 className='portraitPrimaryColor bigWeight fs-1'>Nuestros Profesores</h2>
          <p className='text-secondary mt-0'>¡Conoce quien esta detras de nuestra formacion!</p>
        </div>
        <div className="carousel container pb-3 mt-3 mb-3 d-flex flew-row justify-content-center">
          <Carousel />
        </div>
      </section>
      <section className="reachGoalsSection" style={{ marginTop: '100px', marginBottom: '100px' }}>
        <div className="goalsBox">
          <div className="goalsTitleBox d-flex flex-column align-items-center mb-3">
            <h2 className='portraitPrimaryColor bigWeight fs-1'>¡Alcanza Tus Objetivos!</h2>
            <p className='text-secondary mt-0 text-center'>¡Nuestra academia brinda el seguimiento y soporte necesario para llevar a cabo el aprendizaje que necesitass!</p>
          </div>
          <div className="cardGoalContainerBox container pb-3 mt-3 mb-3">
            <div className="container d-flex flex-row justify-content-center gap-4 flex-wrap">
              <CardGoals
                text='Profesores expertos'
                color="purple"
                iconName="fa-solid fa-book"
                iconColor="white"
                iconBackgroundColor='#5751e1' />
              <CardGoals
                text='Clases efectivas'
                color="yellow"
                iconName="fa-solid fa-certificate"
                iconColor="white"
                iconBackgroundColor='#ffc224' />
              <CardGoals
                text=' Multiples instrumentos'
                color="blue"
                iconName="fa-solid fa-graduation-cap"
                iconColor="white"
                iconBackgroundColor='#1bcbe3' />
            </div>
          </div>
        </div>
      </section>
      <section className="ourPlans">
        <div className="plansTitleBox container-fluid mt-3 mb-3 d-flex justify-content-center align-items-center">
          <h2 className='portraitPrimaryColor bigWeight fs-1 text-center text-white' style={{ zIndex: '3' }}>Conoce Nuestros</h2>
          <h2 className='portraitPrimaryColor bigWeight fs-1 text-center text-white ms-3 textPlanes' style={{ backgroundColor: '#ffc224', borderRadius: '15px', padding: '4px' }}>Planes</h2>
        </div>
        <div className="planCardBox container d-flex flex-row justify-content-center flex-wrap" style={{ marginBottom: '80px', marginTop: '100px', padding: '20px', gap: '30px' }}>
          <CardPlan
            planType='Plan 1 presencial - Virtual'
            price='¢65000' fontSz='50'
            planModality='por mes'
            firstFeature='Clases de 1 hora'
            secondFeature='1 vez por semana'
            thirdFeature='Instrumentos a disposicion' />
          <CardPlan
            planType='Domicilio'
            price='¢75000'
            fontSz='50'
            planModality='por mes'
            firstFeature='Clases de 1 hora'
            secondFeature='1 vez por semana'
            thirdFeature='Instrumentos a disposicion' />
          <CardPlan
            planType='Personalizado'
            price='Contacta con nosotros'
            fontSz='40'
            firstFeature='Clases de 1 hora'
            secondFeature='1 vez por semana'
            thirdFeature='Instrumentos a disposicion' />
        </div>
      </section>
      <div className="plansTitleBox container-fluid mt-3 mb-3 d-flex justify-content-center align-items-center"></div>
      <section className="aboutUs container" style={{ marginTop: '100px', paddingTop: '50px', paddingBottom: '40px', marginBottom: '80px' }}>
        <div className="sectionAboutUs container d-flex flex-row flex-wrap justify-content-around align-items-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <div className="textUs" style={{ width: '500px' }}>
            <h2 className='portraitPrimaryColor bigWeight fs-1 text-center text-white' style={{ zIndex: '3', paddingBottom: '55px' }}> Sobre <strong style={{ backgroundColor: '#ffc224', borderRadius: '15px', padding: '4px', fontWeight: '600' }}> Nosotros </strong></h2>
            <p className='text-white mt-0 text-left'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus laudantium accusantium magni? Minus laboriosam, sequi temporibus animi ratione, blanditiis illum quidem perferendis quae exercitationem quibusdam aliquam nisi nostrum nihil aliquid?</p>
            <p className='text-white mt-0 text-left'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus laudantium accusantium magni? Minus laboriosam, sequi temporibus animi ratione</p>
            <Link to='/signup'>
              <p className='text-white mt-0 text-center' style={{ paddingTop: '30px' }}> <strong>¡Comienza ahora mismo!</strong></p>
            </Link>
          </div>
          <div className="imgAboutUs">
            <img id='"imgAboutUs"' src="https://i.imgur.com/7lOAUrM.png" alt="logo-acua" style={{ width: '300px', marginTop: '20px' }} />
          </div>
        </div>
      </section>
      <section className="contactSection">

      </section>
    </React.Fragment >
  )
}

export default HomeACUA