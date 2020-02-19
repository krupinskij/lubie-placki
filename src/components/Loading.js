import React from 'react'

import spinner from '../svg/spinner.svg';


import { connect } from 'react-redux'

class Loading extends React.Component {
    render() {
        if(!this.props.loading.active) return(<div/>);

        const messages = this.props.loading.messages.map((m,i) => <div key={i} className='modal__message'>{m}</div>)
        return (
            <div className='modal'>
                <div className='modal__content'>
                    <img className='modal__spinner' src={spinner} alt='Loading spinner' />

                    <div className='modal__messages'>
                        {messages}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading
    }
}

export default connect(
    mapStateToProps
)(Loading)