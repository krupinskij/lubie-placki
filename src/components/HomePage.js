import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

class HomePage extends React.Component {
	state = {
		recipes: [],
		type: ""
	}

	fetchData = (parsed = queryString.parse(this.props.history.location.search)) => {

		this.setState({
			type: parsed.type
		})

		fetch("http://localhost:3004/recipes" + (parsed.type ? `?type=${parsed.type}` : ''))
			.then(resp => resp.json())
			.then(resp => {
				this.setState({
					recipes: resp
				})
			})
	}

	componentDidUpdate = () => {
		const parsed = queryString.parse(this.props.history.location.search);
		if(this.state.type!==parsed.type) this.fetchData(parsed);
	}

	componentDidMount = () => {
		this.fetchData();
	}

	

	render() {
		const recipes = this.state.recipes.map(recipe => {

			const ingredients = recipe.ingredients.map(ingredient => {
				return (
					<li key={ingredient.id}>
						{ingredient.name} - {ingredient.quantity}{ingredient.unit}
					</li>
				)
			})

			const directions = recipe.directions.map(direction => {
				return (
					<li key={direction.id}>
						{direction.text}
					</li>
				)
			})

			const hints = recipe.hints.map(hint => {
				return (
					<li key={hint.id}>
						{hint.text}
					</li>
				)
			})

			return (
				<div key={recipe.id}>
					<h2>
						<Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
					</h2>
					<div>
						<h3>Zdjęcie: </h3>
						<img src={`http://localhost:3004/recipes/recipephotos/${recipe.id}`} alt={recipe.title}/>
					</div>
					<div>
						<h3>Opis: </h3>
						{recipe.description}
					</div>
					<div>
						<h3>Składniki:</h3>
						<ul>
							{ingredients}
						</ul>
					</div>
					<div>
						<h3>Sposób wykonania:</h3>
						<ol>
							{directions}
						</ol>
					</div>
					<div>
						<h3>Wskazówki:</h3>
						<ul>
							{hints}
						</ul>
					</div>
				</div>
			)
		})

		return (

			<div>
				{recipes}
			</div>
		)
	}
}

export default HomePage;