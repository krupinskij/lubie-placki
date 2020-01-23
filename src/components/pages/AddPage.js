import React from 'react';

import { connect } from 'react-redux'

import history from '../../helpers/history'

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
		],

		photo: ""
	}

	changeValue = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		})
	}

	changePhoto = (event) => {
		const target = event.target;
		const value = target.files[0];

		this.setState({
			photo: value
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

		const photoBlob = this.state.photo;


		fetch("http://localhost:3004/recipes/" + this.props.user.id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recipeData)
		}).then(resp => resp.json()).then(resp => {
			const promiseIngredients = fetch(`http://localhost:3004/recipes/${resp.id}/ingredients`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(ingredients)
			});
			const promiseDirections = fetch(`http://localhost:3004/recipes/${resp.id}/directions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(directions)
			});
			const promiseHints = fetch(`http://localhost:3004/recipes/${resp.id}/hints`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(hints)
			});
			const promiseRecipePhoto = fetch(`http://localhost:3004/recipes/${resp.id}/recipephoto`, {
				method: 'POST',
				headers: {
					'Content-Type': "image/jpeg"
				},
				body: photoBlob
			});

			Promise.all([promiseIngredients, promiseDirections, promiseHints, promiseRecipePhoto])
			.then(() => {
				history.push("/");
				window.location.reload(false);
			});

		})
	}

	render() {

		const {user} = this.props;

		if(user==null) return <div className="page">Musisz być zalogowany</div>

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
			<div className="page">
				<form className="form add-recipe-form" onSubmit={this.handleSubmit}>
					<h2 className="form__header">Dodaj przepis</h2>

					<div className="form__section">
						<label className="form__label for__label--required" htmlFor="title">Nazwa ciasta: </label>
						<input className="form__input" id="title" name="title" type="text" onChange={this.changeValue} />
					</div>
					
					<div className="form__section">
						<label className="form__label" htmlFor="desc">Opis: </label>
						<textarea className="form__textarea" id="desc" name="description" onChange={this.changeValue}></textarea>
					</div>

					<div className="form__section">
						<label className="form__label for__label--required" htmlFor="type">Typ ciasta: </label>
						<input className="form__input" id="type" name="type" type="text" onChange={this.changeValue}/>
					</div>

					<div className="form__section">
						<label className="form__label for__label--required" htmlFor="photo">Zdjęcie ciasta: </label>
						<input id="photo" name="photo" type="file" onChange={this.changePhoto}/>
					</div>

					<div className="form__section">
						<label className="form__label for__label--required">Składniki: </label>
						<input type="button" value="Dodaj składnik" onClick={this.addIngredient}/>
						<ul>
							{ingredients}
						</ul>
					</div>

					<div className="form__section">
						<label className="form__label for__label--required">Sposób wykonania: </label>
						<input type="button" value="Dodaj sposób" onClick={this.addDirection}/>
						<ol>
							{directions}
						</ol>
					</div>

					<div className="form__section">
						<label className="form__label">Wskazówki: </label>
						<input type="button" value="Dodaj wskazówkę" onClick={this.addHint}/>
						<ul>
							{hints}
						</ul>
					</div>

					<input type="submit" value="Dodaj" />
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
	
	return {
	  user: state.user,
	}
  }
  
  export default connect(
	mapStateToProps
  )(AddPage)