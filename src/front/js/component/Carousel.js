import React, { useEffect } from 'react'
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { CardProfessorHome } from './Card/CardProfessorHome';

export const Carousel = ({ array }) => {

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
                slidesPerGroup: 1,
            },
            900: {
                slidesPerView: 3,
                slidesPerGroup: 1,
            },
            1080: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            }

        }
    });

    return (
        <React.Fragment>
            <div className="swiper">
                <div className="swiper-wrapper">
                    {array?.map((arrayItem) => {
                        return (
                            <div className="swiper-slide">
                                <CardProfessorHome
                                    number={randomNumber()}
                                    key={arrayItem.id}
                                    name={arrayItem.name}
                                    lastName={arrayItem.last_name}
                                    disctrict={arrayItem.disctrict}
                                    province={arrayItem.province}
                                />

                            </div>)
                    })}
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-scrollbar"></div>
                <div className="swiper-button-next" style={{ paddingRight: '20px' }}></div>
                <div className="swiper-button-prev" style={{ paddingLeft: '10px' }}></div>
            </div>
        </React.Fragment >
    )
}
