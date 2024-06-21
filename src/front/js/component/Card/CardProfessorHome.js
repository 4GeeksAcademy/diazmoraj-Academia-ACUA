import React from 'react'


//Please take in account that this card only work with Carrousel, due his form, these are Li's

export const CardProfessorHome = () => {
    return (
        <React.Fragment>
            <div className="cardProfessor">
                <div className="card cardProff">
                    <img src="https://i.imgur.com/qTL6olW.png" className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px' }} />
                    <div className="card-body">
                        <p className="card-title fs-6 mediumWeight">Professor Name</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-secondary" style={{ fontSize: '15px' }}>Provincia: Lorem</li>
                            <li class="list-group-item text-secondary" style={{ fontSize: '15px' }}>Distrito: Lorem</li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

