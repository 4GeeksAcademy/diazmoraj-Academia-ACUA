import React from 'react'
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { CardProfessorHome } from './Card/CardProfessorHome';

export const Carousel = () => {

    const swiper = new Swiper('.swiper', {
        modules: [Navigation],
        loop: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        breakpoints: {
            900: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            }
        }
    });

    return (
        <React.Fragment>
            <div className="swiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                    <div className="swiper-slide"><CardProfessorHome /></div>
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-scrollbar"></div>
            </div>
        </React.Fragment >
    )
}
