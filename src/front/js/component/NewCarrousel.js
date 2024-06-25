import React from 'react'
import { register } from 'swiper/element'

register();

export const NewCarrousel = ({ array }) => {
    return (
        <React.Fragment>
            <div className="container">
                <swiper-container slides-per-view="3" speed="500" loop="true" css-mode="true">
                    <swiper-slide><div style={{ height: '200px', width: '200px', backgroundColor: 'red' }}>hola</div></swiper-slide>
                    <swiper-slide><div style={{ height: '200px', width: '200px', backgroundColor: 'red' }}>hola</div></swiper-slide>
                    <swiper-slide><div style={{ height: '200px', width: '200px', backgroundColor: 'red' }}>hola</div></swiper-slide>
                    <swiper-slide><div style={{ height: '200px', width: '200px', backgroundColor: 'red' }}>hola</div></swiper-slide>
                    <swiper-slide><div style={{ height: '200px', width: '200px', backgroundColor: 'red' }}>hola</div></swiper-slide>
                    <swiper-slide><div style={{ height: '200px', width: '200px', backgroundColor: 'red' }}>hola</div></swiper-slide>
                </swiper-container>
            </div>
        </React.Fragment>
    )
}
