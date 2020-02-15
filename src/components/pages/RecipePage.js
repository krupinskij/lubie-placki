import React from 'react';
import Recipe from '../Recipe';
import RecipePhotosController from '../RecipePhotosController';
import CommentsList from '../CommentsList';

import { connect } from 'react-redux'

class RecipePage extends React.Component {

    state = {
        recipe: {},
        loading: true,
        user: null
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        fetch("http://localhost:3004/recipes/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    recipe: resp,
                    loading: false
                })
            })

        fetch("http://localhost:3004/users")
        .then(resp => resp.json())
        .then(user => {
            this.setState({ user })
        })
    }

    render() {

        if(this.state.loading) return(<div>Ładowanie...</div>)

        return(
            <div className="page">
                <Recipe recipe={this.state.recipe}/>

                <RecipePhotosController 
                    recipe_id={this.state.recipe.id} 
                    photos_count={this.state.recipe.recipePhotos}
                    user_id={this.state.user!=null ? this.state.user.id : undefined}
                />

                <CommentsList 
                    recipe_id={this.state.recipe.id} 
                    user_id={this.state.user!=null ? this.state.user.id : undefined} 
                    comments={this.state.comments}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
	
	return {
	  token: state.token,
	}
  }
  
  export default connect(
	mapStateToProps
  )(RecipePage)