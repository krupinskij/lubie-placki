import React from 'react';

import Comment from './Comment'
import CommentInput from './CommentInput';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addComment, deleteAddCommentNotification } from '../redux/commentRedux/actions/addComment';
import { deleteComment, deleteDeleteCommentNotification } from '../redux/commentRedux/actions/deleteComment';
import { updateComment, deleteUpdateCommentNotification } from '../redux/commentRedux/actions/updateComment';

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
        this.props.addComment(this.props.token, this.props.recipe_id, text)
        .then(resp => {
            setTimeout(this.props.deleteDeleteCommentNotification, 3000);
            
            if(resp === undefined) return;
            this.componentDidMount();
        })
    }

    deleteComment = id => {
        this.props.deleteComment(this.props.token, id)
        .then(resp => {
            setTimeout(this.props.deleteDeleteCommentNotification, 3000);

            if(resp === undefined) return;
            this.componentDidMount();
        })
    }

    updateComment = (id, text) => {
        this.props.updateComment(this.props.token, id, text)
        .then(resp => {
            if(resp === undefined) return;

            setTimeout(this.props.deleteUpdateCommentNotification, 3000);
            this.componentDidMount();
        })
    }
	
	render() {

        if(this.state.loadingComments) return (<div>Ładowanie...</div>);

		const comments = this.state.comments.map(comment => <Comment key={comment.id}
            
            comment={comment}
            deleteComment={this.deleteComment}
            updateComment={this.updateComment}
        />)

		return (
			<div>
                <CommentInput postComment={this.postComment}/>

				{comments}
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
		token: state.token,
		loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => ({
	addComment: (token, recipe_id, text) => dispatch(addComment(token, recipe_id, text)),
	deleteComment: (token, comment_id) => dispatch(deleteComment(token, comment_id)),
    updateComment: (token, comment_id, text) => dispatch(updateComment(token, comment_id, text)),
    
    deleteAddCommentNotification: () => dispatch(deleteAddCommentNotification()),
    deleteDeleteCommentNotification: () => dispatch(deleteDeleteCommentNotification()),
    deleteUpdateCommentNotification: () => dispatch(deleteUpdateCommentNotification())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CommentsList))