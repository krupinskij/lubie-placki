import React from 'react'
import MessageMini from '../MessageMini';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PostPage extends React.Component {

    state = {
        id: -1,
        type: "sended",
        messages: []
    }

    fetchMessages = () => {
        fetch("http://localhost:3004/messages/" + this.state.id + "/" + this.state.type)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            this.setState({
                messages: resp
            }, () => console.log(this.state))
        })

    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        this.setState({
            id
        }, () => { this.fetchMessages() })
    }

    chooseMessages = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            type: value
        }, () => { this.fetchMessages() })
    }
    

    render() {

        if(+this.props.user.id !== +this.props.match.params.id) {
            this.props.history.push("/")
        }

        const messages = this.state.messages.map(message => {
            return ( <MessageMini key={message.id} message={message}/>)
        })

        return(
            <div className="page">
                <div className="component">
                    <div className="form__section form__section--inline">
                        <label className="form__label" htmlFor="type">Wiadomości: </label>
                        <select className="form__select" name="sort" onChange={this.chooseMessages}>
                            <option className="form__option" value="sended">wysłane</option>
                            <option className="form__option" value="received">odebrane</option>
                        </select>
                    </div>

                    <hr className="form__separator"/>

                    <div className="messages-list">
                        {messages}
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
  )(withRouter(PostPage))