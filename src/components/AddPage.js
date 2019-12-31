import React from 'react';

class AddPage extends React.Component {

	state = {
		title: "",
		description: "",
		type: "",

		ingredients: [
			{
				name: "",
				quantity: "",
				unit: ""
			}
		],

		directions: [
			{
				text: ""
			}
		],
		hints: [
			{
				text: ""
			}
		]
	}

	changeValue = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		})
	}

	addIngredient = () => {
		const ingredients = this.state.ingredients;
		this.setState({
			ingredients: [...ingredients, { name: "", quantity: "", unit: "" }],
		})
	}

	changeIngredientName = (event, index) => {
		const input = event.target;
		const ingredients = this.state.ingredients;
		const ingredient = ingredients[index];

		const newIngredient = { ...ingredient, name: input.value };
		ingredients[index] = newIngredient;

		this.setState({
			ingredients: ingredients
		})
	}

	changeIngredientQuantity = (event, index) => {
		const input = event.target;
		const ingredients = this.state.ingredients;
		const ingredient = ingredients[index];

		const newIngredient = { ...ingredient, quantity: input.value };
		ingredients[index] = newIngredient;

		this.setState({
			ingredients: ingredients
		})
	}

	changeIngredientUnit = (event, index) => {
		const input = event.target;
		const ingredients = this.state.ingredients;
		const ingredient = ingredients[index];

		const newIngredient = { ...ingredient, unit: input.value };
		ingredients[index] = newIngredient;

		this.setState({
			ingredients: ingredients
		})
	}

	addDirection = () => {
		const directions = this.state.directions;
		this.setState({
			directions: [...directions, { text: "" }],
		})
	}

	changeDirectionText = (event, index) => {
		const input = event.target;
		const directions = this.state.directions;
		const direction = directions[index];

		const newDirection = { ...direction, text: input.value };
		directions[index] = newDirection;

		this.setState({
			directions
		})
	}

	addHint = () => {
		const hints = this.state.hints;
		this.setState({
			hints: [...hints, { text: "" }],
		})
	}

	changeHintText = (event, index) => {
		const input = event.target;
		const hints = this.state.hints;
		const hint = hints[index];

		const newHint = { ...hint, text: input.value };
		hints[index] = newHint;

		this.setState({
			hints
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const recipeData = {
			title: this.state.title,
			description: this.state.description,
			type: this.state.type
		}

		const ingredients = this.state.ingredients;
		const directions = this.state.directions.map((d, i) => {return {...d, direction_order: i }});
		const hints = this.state.hints;

		fetch("http://localhost:3004/recipes", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recipeData)
		}).then(resp => resp.json()).then(resp => {
			fetch(`http://localhost:3004/recipes/${resp.id}/ingredients`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(ingredients)
			});
			fetch(`http://localhost:3004/recipes/${resp.id}/directions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(directions)
			}).then(resp => console.log(resp));
			fetch(`http://localhost:3004/recipes/${resp.id}/hints`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(hints)
			});
		})
	}

	render() {
		const ingredients = this.state.ingredients.map((a, i) => {
			return (
				<li key={i}>
					<input type="text" onChange={(event) => { this.changeIngredientName(event, i) }} />
					<input type="text" onChange={(event) => { this.changeIngredientQuantity(event, i) }} />
					<input type="text" onChange={(event) => { this.changeIngredientUnit(event, i) }} />
				</li>
			)
		});

		const directions = this.state.directions.map((a, i) => {
			return (
				<li key={i}>
					<textarea onChange={(event) => { this.changeDirectionText(event, i) }} />
				</li>
			)
		});

		const hints = this.state.hints.map((a, i) => {
			return (
				<li key={i}>
					<textarea onChange={(event) => { this.changeHintText(event, i) }} />
				</li>
			)
		});

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<h1>Dodaj przepis</h1>

					<label htmlFor="title">Nazwa ciasta: </label>
					<input id="title" name="title" type="text" onChange={this.changeValue} />

					<label htmlFor="desc">Opis: </label>
					<textarea id="desc" name="description" onChange={this.changeValue}></textarea>

					<label htmlFor="type">Typ ciasta: </label>
					<input id="type" name="type" type="text" onChange={this.changeValue}/>

					<h2>Składniki: </h2>
					<input type="button" value="Dodaj składnik" onClick={this.addIngredient}/>
					<ul>
						{ingredients}
					</ul>

					<h2>Sposób wykonania: </h2>
					<input type="button" value="Dodaj sposób" onClick={this.addDirection}/>
					<ol>
						{directions}
					</ol>

					<h2>Wskazówki: </h2>
					<input type="button" value="Dodaj wskazówkę" onClick={this.addHint}/>
					<ul>
						{hints}
					</ul>

					<input type="submit" value="Dodaj" />
				</form>
			</div>
		)
	}
}

export default AddPage;