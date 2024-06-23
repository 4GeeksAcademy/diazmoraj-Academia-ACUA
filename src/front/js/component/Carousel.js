import React from 'react'
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { CardProfessorHome } from './Card/CardProfessorHome';

export const Carousel = () => {

    const randomNumber = () => {
        let random = 0
        let lastRandom = null;
        do {
            random = Math.floor(Math.random() * 70)
        } while (random == lastRandom)
        lastRandom = random;
        return lastRandom;
    }

    const swiper = new Swiper('.swiper', {
        loop: true,
        modules: [Navigation],
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        breakpoints: {
            700: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            900: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            1080: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            }

        }
    });

    return (
        <React.Fragment>
            <div className="swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                    <div className="swiper-slide"><CardProfessorHome number={randomNumber()} /></div>
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-scrollbar"></div>
                <div className="swiper-button-next" style={{ paddingRight: '20px' }}></div>
                <div className="swiper-button-prev" style={{ paddingLeft: '10px' }}></div>
            </div>
        </React.Fragment >
    )
}
