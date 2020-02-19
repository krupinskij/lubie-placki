import React from 'react'

import RatingController from './RatingController';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { deleteRecipe, deleteDeleteRecipeNotification } from '../redux/deleteRecipeRedux/actions/deleteRecipe';

import history from '../helpers/history'

class Recipe extends React.Component {

    state = {
        user: null
    }

    componentDidMount = () => {
        fetch("http://localhost:3004/users", {
            headers: {
                'securityTokenValue': this.props.token
            }
        })
            .then(resp => resp.json())
            .then(user => {
                this.setState({ user })
            })
    }

    handleDelete = event => {

        this.props.deleteRecipe(this.props.token, this.props.recipe.id)
            .then(recipe => {
                setTimeout(this.props.deleteDeleteRecipeNotification, 3000);
			
                if(recipe === undefined) return;

                history.push("/");
            });

    }

    render() {
        const recipe = this.props.recipe;

        const ingredients = recipe.ingredients.map(ingredient => {
            return (
                <li key={ingredient.id}>{ingredient.name} - {ingredient.quantity}{ingredient.unit}</li>
            )
        })

        const directions = recipe.directions.map(direction => {
            return (
                <li key={direction.id}>{direction.text}</li>
            )
        })

        const hints = recipe.hints.map(hint => {
            return (
                <li key={hint.id}>{hint.text}</li>
            )
        })
        return (
            <div className="recipe component">
                <h2 className="recipe__header">
                    <Link className="recipe__title" to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </h2>

                <RatingController recipe={recipe} token={this.props.token} />

                <div className="recipe__author">
                    Dodano {recipe.add_date} przez: <Link className="recipe__user" to={`/user/${recipe.user.id}`}>{recipe.user.username} </Link>
                    {
                        this.state.user !== null && this.state.user.id === recipe.user.id &&
                        <>
                            <button className="recipe__delete" onClick={this.handleDelete}>Usuń</button>
                            <Link className="recipe__edit" to={"/edit/" + recipe.id}>Edytuj</Link>
                        </>
                    }
                </div>

                <img className="recipe__photo" src={`http://localhost:3004/recipes/${recipe.id}/photo`} alt={recipe.title} />

                <div className="recipe__section">
                    <h3>Opis: </h3>
                    {recipe.description}
                </div>

                <div className="recipe__section">
                    <h3>Składniki:</h3>
                    <ul>
                        {ingredients}
                    </ul>
                </div>

                <div className="recipe__section">
                    <h3>Sposób wykonania:</h3>
                    <ol>
                        {directions}
                    </ol>
                </div>

                <div className="recipe__section">
                    <h3>Wskazówki:</h3>
                    <ul>
                        {hints}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => ({
    deleteRecipe: (token, recipe_id) => dispatch(deleteRecipe(token, recipe_id)),

	deleteDeleteRecipeNotification: () => dispatch(deleteDeleteRecipeNotification())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Recipe)