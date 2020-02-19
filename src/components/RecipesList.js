import React from 'react';

import RecipeMini from './RecipeMini'

import { connect } from 'react-redux'

import { getRecipesByType, deleteGetRecipesNotification } from '../redux/getRecipesRedux/actions/getRecipesByType';
import { getRecipesBySort } from '../redux/getRecipesRedux/actions/getRecipesBySort';
import { getRecipesBySearch } from '../redux/getRecipesRedux/actions/getRecipesBySearch';
import { getRecipesByUser } from '../redux/getRecipesRedux/actions/getRecipesByUser';

import { deleteRecipe, deleteDeleteRecipeNotification } from '../redux/deleteRecipeRedux/actions/deleteRecipe';


class RecipesList extends React.Component {

	state = {
		recipes: []
	}

	componentDidMount = () => {

		const page = this.props.page;

		if(this.props.type !== undefined) this.getRecipes(this.props.getRecipesByType, this.props.type, page);
		else if(this.props.sort !== undefined) this.getRecipes(this.props.getRecipesBySort, this.props.sort, page);
		else if(this.props.search !== undefined) this.getRecipes(this.props.getRecipesBySearch, this.props.search, page);
		else if(this.props.user_id !== undefined) this.getRecipes(this.props.getRecipesByUser, this.props.user_id, page);
		else this.setState({ recipes: [] })

	}

	componentWillReceiveProps = props => {

		const page = props.page;
		
		if(!(
			props.type !== this.props.type || 
			props.sort !== this.props.sort || 
			props.search !== this.props.search || 
			props.user_id !== this.props.user_id || 
			props.page !== this.props.page)) return;

		if(props.type !== undefined) this.getRecipes(props.getRecipesByType, props.type, page);
		else if(props.sort !== undefined) this.getRecipes(props.getRecipesBySort, props.sort, page);
		else if(props.search !== undefined) this.getRecipes(props.getRecipesBySearch, props.search, page);
		else if(props.user_id !== undefined) this.getRecipes(props.getRecipesByUser, props.user_id, page);
		else this.setState({ recipes: [] })
	}

	
	getRecipes = (func, property, page) => {
		func(property, page)
		.then(recipes => {
			this.setState({ recipes })

			setTimeout(this.props.deleteGetRecipesNotification, 3000);

			let length = Math.floor((recipes.length + 9) / 10);
			if(length === 0) length = 1;

			this.props.setLength(length);
		})
	}

	deleteRecipe = recipe_id => {
		this.props.deleteRecipe(this.props.token, recipe_id)
		.then(recipe => {
			setTimeout(this.props.deleteDeleteRecipeNotification, 3000);

			if(recipe === undefined) return;
			
			this.componentDidMount();
		});
	}
	
	render() {
		const recipes = this.state.recipes.map(recipe => <RecipeMini key={recipe.id} 
		
			recipe={recipe}

			deleteRecipe={this.deleteRecipe}
			
		/>)

		return (
			<div>
				{recipes}
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
	getRecipesByType: (type, page) => dispatch(getRecipesByType(type, page)),
	getRecipesBySort: (sort, page) => dispatch(getRecipesBySort(sort, page)),
	getRecipesBySearch: (search, page) => dispatch(getRecipesBySearch(search, page)),
	getRecipesByUser: (user, page) => dispatch(getRecipesByUser(user, page)),
	deleteRecipe: (token, recipe_id) => dispatch(deleteRecipe(token, recipe_id)),

	deleteDeleteRecipeNotification: () => dispatch(deleteDeleteRecipeNotification()),
	deleteGetRecipesNotification: () => dispatch(deleteGetRecipesNotification())

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesList)