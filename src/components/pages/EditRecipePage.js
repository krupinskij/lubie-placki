import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { updateRecipe, deleteUpdateRecipeNotification } from '../../redux/updateRecipeRedux/actions/updateRecipe';
import { updateIngredients, deleteUpdateIngredientsNotification } from '../../redux/updateRecipeRedux/actions/updateIngredients';
import { updateDirections, deleteUpdateDirectionsNotification } from '../../redux/updateRecipeRedux/actions/updateDirections';
import { updateHints, deleteUpdateHintsNotification } from '../../redux/updateRecipeRedux/actions/updateHints';
import { updatePhoto, deleteUpdatePhotoNotification } from '../../redux/updateRecipeRedux/actions/updatePhoto';

import {
	required,
	nonBlank,
	isNumber
} from '../../validation/requirements';
import { validate, canSubmit } from '../../validation/validator';



class EditRecipePage extends React.Component {

	state = {
		title: '',
		titleValid: {
			isValid: true
		},

		description: '',

		type: '',

		ingredients: [],

		ingredientsValid: {
			isValid: true
		},

		directions: [],
		directionsValid: {
			isValid: true
		},

		hints: [],
		hintsValid: {
			isValid: true
		},

		photo: '',

		toSubmit: true
	}

	componentDidMount = () => {
		const id = this.props.match.params.id;

		fetch('http://localhost:3004/recipes/' + id)
			.then(resp => resp.json())
			.then(resp => {

				const title = resp.title;
				const description = resp.description;
				const type = resp.type;

				const ingredients = resp.ingredients.map(i => {
					return {
						key: i.id,
						name: i.name,
						quantity: i.quantity,
						unit: i.unit
					}
				})

				const directions = resp.directions.map(d => {
					return {
						key: d.id,
						text: d.text
					}
				})

				const hints = resp.hints.map(h => {
					return {
						key: h.id,
						text: h.text
					}
				})

				this.setState({
					id,
					title,
					description,
					type,
					ingredients,
					directions,
					hints
				})
			})
	}

	//#region Title

	changeTitle = event => {
		const target = event.target;
		const value = target.value;

		const valid = validate(
			required(value)
		);

		const toSubmit = canSubmit(
			valid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			title: value,
			titleValid: valid,
			toSubmit
		})
	}

	//#endregion

	//#region Description

	changeDescription = event => {
		const target = event.target;
		const value = target.value;

		this.setState({
			description: value
		})
	}

	//#endregion

	//#region Type

	changeType = event => {
		const target = event.target;
		const value = target.value;

		this.setState({
			type: value
		})
	}

	//#endregion

	//#region Photo

	changePhoto = event => {
		const target = event.target;
		const value = target.files[0];

		this.setState({
			photo: value,
		})
	}

	deleteImage = event => {

		this.setState({
			photo: ''
		})
	}

	//#endregion

	//#region Ingredients

	addIngredient = event => {
		event.preventDefault();

		const ingredients = [...this.state.ingredients, { key: Math.random(), name: '', quantity: '', unit: '' }];

		const valid = validate(
			nonBlank(ingredients, 3)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.photoValid,
			valid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			ingredients,
			ingredientsValid: valid,
			toSubmit
		})
	}

	deleteIngredient = (event, index) => {
		event.preventDefault();

		const ingredients = this.state.ingredients;
		ingredients.splice(index, 1);

		const valid = validate(
			nonBlank(ingredients, 3)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			ingredients,
			ingredientsValid: valid,
			toSubmit
		})
	}

	changeIngredientName = (event, index) => {
		const input = event.target;
		const ingredients = this.state.ingredients;
		const ingredient = ingredients[index];

		const newIngredient = { ...ingredient, name: input.value };
		ingredients[index] = newIngredient;

		const valid = validate(
			nonBlank(ingredients, 3)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			ingredients,
			ingredientsValid: valid,
			toSubmit
		})
	}

	changeIngredientQuantity = (event, index) => {
		const input = event.target;
		const ingredients = this.state.ingredients;
		const ingredient = ingredients[index];

		const newIngredient = { ...ingredient, quantity: input.value };
		ingredients[index] = newIngredient;

		const valid = validate(
			nonBlank(ingredients, 3),
			isNumber(input.value)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			ingredients,
			ingredientsValid: valid,
			toSubmit
		})
	}

	changeIngredientUnit = (event, index) => {
		const input = event.target;
		const ingredients = this.state.ingredients;
		const ingredient = ingredients[index];

		const newIngredient = { ...ingredient, unit: input.value };
		ingredients[index] = newIngredient;

		const valid = validate(
			nonBlank(ingredients, 3)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			ingredients,
			ingredientsValid: valid,
			toSubmit
		})
	}

	//#endregion

	//#region Directions

	addDirection = event => {
		event.preventDefault();

		const directions = [...this.state.directions, { key: Math.random(), text: '' }];

		const valid = validate(
			nonBlank(directions, 1)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.ingredientsValid,
			valid,
			this.state.hintsValid
		)

		this.setState({
			directions,
			directionsValid: valid,
			toSubmit
		})
	}

	deleteDirection = (event, index) => {
		event.preventDefault();

		const directions = this.state.directions;
		directions.splice(index, 1);

		const valid = validate(
			nonBlank(directions, 1)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.ingredientsValid,
			valid,
			this.state.hintsValid
		)

		this.setState({
			directions,
			directionsValid: valid,
			toSubmit
		})
	}

	changeDirectionText = (event, index) => {
		const input = event.target;
		const directions = this.state.directions;
		const direction = directions[index];

		const newDirection = { ...direction, text: input.value };
		directions[index] = newDirection;

		const valid = validate(
			nonBlank(directions, 1)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.ingredientsValid,
			valid,
			this.state.hintsValid
		)

		this.setState({
			directions,
			directionsValid: valid,
			toSubmit
		})
	}

	//#endregion

	//#region Hints

	addHint = event => {
		event.preventDefault();

		const hints = [...this.state.hints, { key: Math.random(), text: '' }];

		const valid = validate(
			nonBlank(hints, 1)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			valid
		)

		this.setState({
			hints,
			hintsValid: valid,
			toSubmit
		})
	}

	deleteHint = (event, index) => {
		event.preventDefault();

		const hints = this.state.hints;
		hints.splice(index, 1);

		const valid = validate(
			nonBlank(hints, 1)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			valid
		)

		this.setState({
			hints,
			hintsValid: valid,
			toSubmit
		})
	}

	changeHintText = (event, index) => {
		const input = event.target;
		const hints = this.state.hints;
		const hint = hints[index];

		const newHint = { ...hint, text: input.value };
		hints[index] = newHint;

		const valid = validate(
			nonBlank(hints, 1)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			valid
		)

		this.setState({
			hints,
			hintsValid: valid,
			toSubmit
		})
	}

	//#endregion

	//#region Submit

	handleSubmit = (event) => {
		event.preventDefault();

		const recipe = {
			title: this.state.title,
			description: this.state.description,
			type: this.state.type
		}

		const ingredients = this.state.ingredients.map(i => {
			return {
				name: i.name,
				quantity: i.quantity,
				unit: i.unit
			}
		});

		const directions = this.state.directions.map((d, i) => {
			return {
				text: d.text,
				direction_order: i
			}
		});

		const hints = this.state.hints.map(h => {
			return {
				text: h.text
			}
		});

		const photo = this.state.photo;

		const token = this.props.token;
		const recipe_id = this.state.id;

		if (photo !== '') {
			Promise.all([
				this.props.updateRecipe(token, recipe_id, recipe),
				this.props.updateIngredients(token, recipe_id, ingredients),
				this.props.updateDirections(token, recipe_id, directions),
				this.props.updateHints(token, recipe_id, hints),
				this.props.updatePhoto(token, recipe_id, photo)
			])
				.then(() => {
					setTimeout(this.props.deleteUpdateRecipeNotification, 3000);
					setTimeout(this.props.deleteUpdateIngredientsNotification, 3000);
					setTimeout(this.props.deleteUpdateDirectionsNotification, 3000);
					setTimeout(this.props.deleteUpdateHintsNotification, 3000);
					setTimeout(this.props.deleteUpdatePhotoNotification, 3000);

					this.props.history.push('/');
				})
		} else {
			Promise.all([
				this.props.updateRecipe(token, recipe_id, recipe),
				this.props.updateIngredients(token, recipe_id, ingredients),
				this.props.updateDirections(token, recipe_id, directions),
				this.props.updateHints(token, recipe_id, hints)
			])
				.then(() => {

					setTimeout(this.props.deleteUpdateRecipeNotification, 3000);
					setTimeout(this.props.deleteUpdateIngredientsNotification, 3000);
					setTimeout(this.props.deleteUpdateDirectionsNotification, 3000);
					setTimeout(this.props.deleteUpdateHintsNotification, 3000);

					this.props.history.push('/');
				})
		}
	}

	//#endregion

	render() {

		if (this.props.token == null) return <div className='page'>Musisz być zalogowany</div>

		const ingredients = this.state.ingredients.map((a, i) => {
			return (
				<li className='form-ingredient' key={a.key}>
					<input className='form-ingredient__name' value={a.name} type='text' onChange={(event) => { this.changeIngredientName(event, i) }} />
					<input className='form-ingredient__quantity' value={a.quantity} type='text' onChange={(event) => { this.changeIngredientQuantity(event, i) }} />
					<input className='form-ingredient__unit' value={a.unit} type='text' onChange={(event) => { this.changeIngredientUnit(event, i) }} />
					<button className='form__button form__button--delete' onClick={(event) => { this.deleteIngredient(event, i) }}>Usuń</button>
				</li>
			)
		});

		const directions = this.state.directions.map((a, i) => {
			return (
				<li className='form-direction' key={a.key}>
					<textarea className='form-direction__text' value={a.text} onChange={(event) => { this.changeDirectionText(event, i) }} />
					<button className='form__button form__button--delete' onClick={(event) => { this.deleteDirection(event, i) }}>Usuń</button>
				</li>
			)
		});

		const hints = this.state.hints.map((a, i) => {
			return (
				<li className='form-hint' key={a.key}>
					<textarea className='form-hint__text' value={a.text} onChange={(event) => { this.changeHintText(event, i) }} />
					<button className='form__button form__button--delete' onClick={(event) => { this.deleteHint(event, i) }}>Usuń</button>
				</li>
			)
		});

		return (
			<div className='page'>
				<form className='component component--wide form add-recipe-form' onSubmit={this.handleSubmit}>
					<h2 className='form__header'>Dodaj przepis</h2>

					<div className='form__section'>
						<label className='form__label for__label--required' htmlFor='title'>Nazwa ciasta: </label>
						<input className='form__input' value={this.state.title} id='title' name='title' type='text' onChange={this.changeTitle} />
						{
							!this.state.titleValid.isValid &&
							<span className='form__warning'>
								{this.state.titleValid.message}
							</span>
						}
					</div>

					<div className='form__section'>
						<label className='form__label' htmlFor='desc'>Opis: </label>
						<textarea className='form__textarea' value={this.state.description} id='desc' name='description' onChange={this.changeDescription}></textarea>
					</div>

					<div className='form__section form__section--inline'>
						<label className='form__label' htmlFor='type'>Typ ciasta: </label>
						<select className='form__select' value={this.state.type} name='type' onChange={this.changeType}>
							<option className='form__option' value='makowiec'>makowiec</option>
							<option className='form__option' value='sernik'>sernik</option>
							<option className='form__option' value='piernik'>piernik</option>
							<option className='form__option' value='jablecznik'>jablecznik</option>
							<option className='form__option' value='swiateczne'>swiateczne</option>
							<option className='form__option' value='inne'>inne</option>
						</select>
					</div>

					<hr className='form__separator' />

					<div className='form__section'>
						<label className='form__label for__label--required' htmlFor='photo'>Zdjęcie ciasta:
							<label className='form__button form__button--add' htmlFor='photo'>Dodaj zdjęcie
								<input className='form__file' id='photo' name='photo' type='file' onChange={this.changePhoto} />
							</label> 
						</label>
						{
							this.state.photo === '' ?
								<div className='form__image'>
									<img className='form__image-sample' src={`http://localhost:3004/recipes/${this.props.match.params.id}/photo`} alt='sample' />
								</div>
								:
								<div className='form__image'>
									<img className='form__image-sample' src={URL.createObjectURL(this.state.photo)} alt='sample' />
									<button className='form__image-delete' onClick={this.deleteImage}>X</button>
								</div>
						}
					</div>

					<hr className='form__separator' />

					<div className='form__section'>
						<label className='form__label for__label--required'>
							Składniki: <button className='form__button form__button--add' onClick={this.addIngredient}>Dodaj</button>
						</label>
						<ul>
							{ingredients}
						</ul>
						{
							!this.state.ingredientsValid.isValid &&
							<span className='form__warning'>
								{this.state.ingredientsValid.message}
							</span>
						}
					</div>

					<hr className='form__separator' />

					<div className='form__section'>
						<label className='form__label for__label--required'>
							Sposób wykonania: <button className='form__button form__button--add' onClick={this.addDirection}>Dodaj</button>
						</label>
						<ol>
							{directions}
						</ol>
						{
							!this.state.directionsValid.isValid &&
							<span className='form__warning'>
								{this.state.directionsValid.message}
							</span>
						}
					</div>

					<hr className='form__separator' />

					<div className='form__section'>
						<label className='form__label'>
							Wskazówki: <button className='form__button form__button--add' onClick={this.addHint}>Dodaj</button>
						</label>
						<ul>
							{hints}
						</ul>
						{
							!this.state.hintsValid.isValid &&
							<span className='form__warning'>
								{this.state.hintsValid.message}
							</span>
						}
					</div>

					<input
						className={this.state.toSubmit ? 'form__submit form__submit--success' : 'form__submit form__submit--error'}
						type='submit' value='Dodaj' />
				</form>
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
	updateRecipe: (token, recipe_id, recipe) => dispatch(updateRecipe(token, recipe_id, recipe)),
	updateIngredients: (token, recipe_id, ingredients) => dispatch(updateIngredients(token, recipe_id, ingredients)),
	updateDirections: (token, recipe_id, directions) => dispatch(updateDirections(token, recipe_id, directions)),
	updateHints: (token, recipe_id, hints) => dispatch(updateHints(token, recipe_id, hints)),
	updatePhoto: (token, recipe_id, photos) => dispatch(updatePhoto(token, recipe_id, photos)),

	deleteUpdateRecipeNotification: () => dispatch(deleteUpdateRecipeNotification()),
	deleteUpdateIngredientsNotification: () => dispatch(deleteUpdateIngredientsNotification()),
	deleteUpdateDirectionsNotification: () => dispatch(deleteUpdateDirectionsNotification()),
	deleteUpdateHintsNotification: () => dispatch(deleteUpdateHintsNotification()),
	deleteUpdatePhotoNotification: () => dispatch(deleteUpdatePhotoNotification())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(EditRecipePage))