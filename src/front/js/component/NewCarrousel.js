import React from 'react'
import { CardProfessorHome } from './Card/CardProfessorHome';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import '../../styles/index.css'

export const NewCarrousel = ({ array }) => {

    const randomNumber = () => {
        let random = 0
        let lastRandom = null;
        do {
            random = Math.floor(Math.random() * 70)
        } while (random == lastRandom)
        lastRandom = random;
        return lastRandom;
    }

    return (
        <React.Fragment>
            <div className="container">
                <Swiper
                    loop='true'
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className="mySwiper"
                >
                    {array?.map((professor) => {
                        return (
                            <SwiperSlide>
                                <CardProfessorHome
                                    number={randomNumber()}
                                    key={professor.id}
                                    name={professor.name}
                                    lastName={professor.last_name}
                                    disctrict={professor.disctrict}
                                    province={professor.province}
                                /></SwiperSlide>
                        )
                    })}
                    <div className="swiper-button-next" style={{ paddingRight: '20px' }}></div>
                    <div className="swiper-button-prev" style={{ paddingLeft: '10px' }}></div>
                </Swiper>
            </div>
        </React.Fragment >
    )
}
