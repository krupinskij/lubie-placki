import React from 'react'

class CommentInput extends React.Component {

    state = {
        text: ""
    }

    handleChangeText = event => {
        const target = event.target;
        const value = target.value;

        this.setState({
            text: value
        })
    }

    handleSendClick = () => {
        this.props.postComment(this.state.text);
        this.setState({
            text: ""
        })
    }

    render() {
        return(
            <div className="component comment">
                <h2 className="comment__header">Dodaj komentarz:</h2>

                <textarea className="comment__textarea" name="text" value={this.state.text} onChange={this.handleChangeText}></textarea>

                <button className="comment-input__button" onClick={ this.handleSendClick }>
                    Wyślij
                </button>
            </div>
        )
    }
}

export default CommentInput;