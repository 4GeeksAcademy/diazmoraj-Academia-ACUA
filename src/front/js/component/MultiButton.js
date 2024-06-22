import React from 'react'

export const MultiButton = ({ color, text, width }) => {
    /*
    background-color: #ffc224;
    border: 2px solid #d0a42e;
    background: #5751E1;
    box-shadow: 4px 6px 0px #050071;
    border-radius: 50px;
    */
    let purple = {
        backgroundColor: '#5751e1',
        boxShadow: '4px 6px 0px #050071',
        border: '1px solid #5751e1',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        width: width + 'px',
    }

    let orange = {
        backgroundColor: '#ffc224',
        boxShadow: '4px 6px 0px #3d3d3d',
        border: '1px solid #000000',
        color: '#161439',
        fontWeight: '600',
        cursor: 'pointer',
        width: width + 'px',
    }

    const colorComparator = (propcolor) => {
        if (propcolor == 'purple') {
            return (purple)
        }
        else if (propcolor == 'orange') {
            return (orange)
        }
    }

    return (
        <React.Fragment>
            <div id='multiButton' style={colorComparator(color)}>
                {text}
            </div>
        </React.Fragment>
    )
}
