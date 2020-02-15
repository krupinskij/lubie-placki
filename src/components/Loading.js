import React from 'react'

import spinner from '../svg/spinner.svg';

class Loading extends React.Component {
    render() {
        return(
            <div className="modal">
                <div className="modal__content">
                    <img className="modal__spinner" src={spinner} alt="Loading spinner"/>
                    <div className="modal__message">{this.props.message}</div>
                </div>
            </div>
        )
    }
}

export default Loading;