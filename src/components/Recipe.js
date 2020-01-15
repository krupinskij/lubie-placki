import React from 'react'

import { Link } from 'react-router-dom'

class Recipe extends React.Component {
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
            <div className="recipe">
                <h2 className="recipe__header">
                    <Link className="recipe__title" to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </h2>
                <div className="recipe__author">
                    autor: <Link className="recipe__user" to={`/user/${recipe.user.id}`}>{recipe.user.username}</Link>
                </div>

                <img className="recipe__photo" src={`http://localhost:3004/recipes/recipephotos/${recipe.id}`} alt={recipe.title} />
                
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

export default Recipe