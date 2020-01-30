import React from 'react';

import Comment from './Comment'
import CommentInput from './CommentInput';

class CommentsList extends React.Component {

    state = {
        comments: [],
        loadingComments: true
    }

    componentDidMount = () => {
        fetch("http://localhost:3004/comments/recipe/" + this.props.recipe_id)
        .then(resp => resp.json())
        .then(comments => { 
            this.setState({ 
                comments,
                loadingComments: false
            }) 
        })
    }

    postComment = text => {
        fetch("http://localhost:3004/comments/recipe/" + this.props.recipe_id + "/user/" + this.props.user_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: text
        })
        .then(this.componentDidMount);
    }

    deleteComment = (id) => {
        fetch("http://localhost:3004/comments/" + id, {
            method: 'DELETE'
        })
        .then(this.componentDidMount);
    }

    updateComment = (id, text) => {
        fetch("http://localhost:3004/comments/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: text
        })
        .then(this.componentDidMount);
    }

    likeComment = (id) => {
        fetch("http://localhost:3004/comments/" + id + "/like", {
            method: 'POST'
        })
        .then(this.componentDidMount);
    }
	
	render() {

        if(this.state.loadingComments) return (<div>Ładowanie...</div>);

		const comments = this.state.comments.map(comment => <Comment key={comment.id}
            
            comment={comment}
            deleteComment={this.deleteComment}
            updateComment={this.updateComment}

            likeComment={this.likeComment}

            user_id={this.props.user_id}
        />)

		return (
			<div>
                <CommentInput postComment={this.postComment}/>

				{comments}
			</div>
		)
	}
}

export default CommentsList;