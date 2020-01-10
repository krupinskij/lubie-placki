import React from 'react';

import Recipe from './Recipe'

class RecipesList extends React.Component {
	render() {
		const recipes = this.props.recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)

		return (
			<div className="page">
				{recipes}
			</div>
		)
	}
}

export default RecipesList;