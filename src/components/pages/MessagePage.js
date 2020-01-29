import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class MessagePage extends React.Component {

    state = {
        id: -1,
        message: null

    }

    fetchMessages = () => {
        fetch("http://localhost:3004/messages/" + this.state.id)
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                message: resp
            }, () => console.log(this.state))
        })
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        this.setState({
          id  
        }, () => {this.fetchMessages()})
    }

    render() {
        if(this.state.message===null) return <div>Loading</div>

        const message = this.state.message;

        if(this.props.user===null || (this.props.user.id!==message.sender.id && this.props.user.id!==message.receiver.id) ) {
            this.props.history.push("/");
        }

        return(
            <div className="page">
                <div className="component">
                    <h2 className="message__title">
                        {message.title} <span className="message__date">{message.date}</span> 
                    </h2>
                    <div className="message__user">
                        od {message.sender.username} do {message.receiver.username}
                    </div>

                    <div className="message__content">
                        {message.content}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      user: state.user,
    }
  }
  
  export default connect(
    mapStateToProps
  )(withRouter(MessagePage))