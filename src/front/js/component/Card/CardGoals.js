import React from 'react'

export const CardGoals = ({ color, text, iconName, iconColor, iconBackgroundColor }) => {


    let blue = {
        backgroundColor: '#f1fdff',
        height: '200px',
        width: '380px',
        borderRadius: '15px',
        boxShadow: '8px 8px 0px #c9e4e9',
    }

    let purple = {
        backgroundColor: '#edeaff',
        height: '200px',
        width: '380px',
        borderRadius: '15px',
        boxShadow: '8px 8px 0px #d8d4f3',
    }

    let yellow = {
        backgroundColor: '#fff7e2',
        height: '200px',
        width: '380px',
        borderRadius: '15px',
        boxShadow: '8px 8px 0px #e5decb',
    }

    const colorComparator = (propcolor) => {
        if (propcolor == 'purple') {
            return (purple)
        }
        else if (propcolor == 'blue') {
            return (blue)
        }
        else if (propcolor == 'yellow') {
            return (yellow)
        }
    }

    return (
        <React.Fragment>
            <div className="cardGoal p-2" style={colorComparator(color)}>
                <div className="title d-flex flex-row justify-content-center gap-3 pt-4 pe-3">
                    <i class={iconName} style={{ fontSize: '25px', color: `${iconColor}`, backgroundColor: `${iconBackgroundColor}`, width: '51px', textAlign: 'center', padding: '10px', borderRadius: '60%' }}></i>
                    <p className="mediumWeight fs-5">Profesores Expertos</p>
                </div>
                <div className="goalBody">
                    <p className='text-dark p-4 text-center' style={{ fontSize: '15px' }}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda repudiandae, eligendi!</p>
                </div>
            </div>
        </React.Fragment >
    )
}
