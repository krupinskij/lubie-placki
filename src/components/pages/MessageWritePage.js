import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class MessageWritePage extends React.Component {

    state = {
        title: "",
        content: ""
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;
    }

    changeTitle = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            title: value
        })
    }

    changeContent = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            content: value
        })
    }

    handleSubmit = event => {

        event.preventDefault();

        const message = {
            title: this.state.title,
            content: this.state.content
        }

        fetch("http://localhost:3004/messages/" + this.props.user.id + "/" + this.props.match.params.id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(resp => {
            this.props.history.push("/");
        })
    }

    render() {
        return(
            <div className="page">
                <form className="component component--wide" onSubmit={this.handleSubmit}>
                    <h2 className="form__header">Napisz wiadomość</h2>

                    <div className="form__section">
						<label className="form__label" htmlFor="title">Tytuł: </label>
						<input className="form__input" id="title" name="title" type="text" onChange={this.changeTitle} />
					</div>

					<div className="form__section">
						<label className="form__label" htmlFor="desc">Wiadomość: </label>
						<textarea className="form__textarea" id="desc" name="description" onChange={this.changeContent}></textarea>
					</div>

                    <input 
						className="form__submit form__submit--success"
						type="submit" value="Dodaj" />
                </form>
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
  )(withRouter(MessageWritePage))