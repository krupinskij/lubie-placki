import React from 'react';

import RecipeMini from './RecipeMini'

class RecipesList extends React.Component {
	
	render() {
		const recipes = this.props.recipes.map(recipe => <RecipeMini key={recipe.id} recipe={recipe}/>)

		return (
			<div>
				{recipes}
			</div>
		)
	}
}

export default RecipesList;