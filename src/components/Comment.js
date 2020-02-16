import React from 'react';

import { Link } from 'react-router-dom'

class Comment extends React.Component {

  state = {
    text: "",
    editing: false
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.comment.text
    })
  }

  handleEditClick = event => {
    this.setState({
      editing: true
    })
  }

  handleDeleteClick = event => {
    this.props.deleteComment(this.props.comment.id);
  }

  handleSaveClick = event => {
    this.setState({
      editing: false
    })
    this.props.updateComment(this.props.comment.id, this.state.text);
  }

  handleLikeClick = event => {
    this.props.likeComment(this.props.comment.id);
  }

  handleChangeText = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      text: value
    })
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className="component comment">
        <h2 className="comment__header">
          <img className="comment__avatar" src={`http://localhost:3004/users/${comment.user.id}/avatar`} alt={comment.user.username + "avatar"} />
          <Link className="comment__user" to={`/user/${comment.user.id}`}>{comment.user.username} </Link>
        </h2>
        <div className="comment__date">
          {this.props.comment.add_date}
        </div>
        {
          !this.state.editing ?
            <>
              <div className="comment__text">
                {this.state.text}
              </div>

              {
                this.props.user_id !== undefined &&

                (
                  this.props.user_id === this.props.comment.user.id &&

                    <div className="comment__buttons">
                      <button className="comment__button comment__button--delete" onClick={this.handleDeleteClick}>Usuń</button>
                      <button className="comment__button comment__button--edit" onClick={this.handleEditClick}>Edytuj</button>
                    </div>
                )

              }



            </>
            :
            <>
              <textarea className="comment__textarea" value={this.state.text} onChange={this.handleChangeText}></textarea>

              <div className="comment__buttons">
                <button className="comment__button comment__button--save" onClick={this.handleSaveClick}>Zapisz</button>
              </div>

            </>
        }


      </div>
    )
  }
}

export default Comment;