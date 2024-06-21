import React from 'react'

const LogButton = (props) => {

    let text = props.text
    return (
        <React.Fragment>
            <div id='loginButton'>
                {text}
            </div>
        </React.Fragment>
    )
}

export default LogButton