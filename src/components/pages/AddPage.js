import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addRecipe, deleteAddRecipeNotification } from '../../redux/addRecipeRedux/actions/addRecipe';
import { addIngredients, deleteAddIngredientsNotification } from '../../redux/addRecipeRedux/actions/addIngredients';
import { addDirections, deleteAddDirectionsNotification } from '../../redux/addRecipeRedux/actions/addDirections';
import { addHints, deleteAddHintsNotification } from '../../redux/addRecipeRedux/actions/addHints';
import { addPhoto, deleteAddPhotoNotification } from '../../redux/addRecipeRedux/actions/addPhoto';
import { addTags, deleteAddTagsNotification } from '../../redux/addRecipeRedux/actions/addTags';

import { 
	required,
	nonBlank,
	isNumber,
	isFile
} from '../../validation/requirements';
import { validate, canSubmit } from '../../validation/validator';



class AddPage extends React.Component {

	state = {
		title: '',
		titleValid: { 
            isValid: false,
            message: 'To pole nie może być puste'
		},
		
		description: '',

		type: 'makowiec',

		ingredients: [
			{
				key: Math.random(),
				name: '',
				quantity: '',
				unit: ''
			}
		],
		ingredientsValid: { 
            isValid: false,
            message: 'Wypełnij wszystkie pola'
        },

		directions: [
			{
				key: Math.random(),
				text: ''
			}
		],
		directionsValid: { 
            isValid: false,
            message: 'Wypełnij wszystkie pola'
		},
		
		hints: [],
		hintsValid: { 
            isValid: true
        },

		photo: '',
		photoValid: { 
            isValid: false,
            message: 'Dodaj zdjęcie'
		},

		tags: '',
		
		toSubmit: false
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
			this.state.photoValid,
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

		const valid = validate(
			isFile(value)
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			photo: value,
			photoValid: valid,
			toSubmit
		})
	}

	deleteImage = event => {
		const valid = validate(
			required('')
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			photo: '',
			photoValid: valid,
			toSubmit
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
			this.state.photoValid,
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
			this.state.photoValid,
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
			this.state.photoValid,
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
			this.state.photoValid,
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
			this.state.photoValid,
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
			this.state.photoValid,
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
			type: this.state.type,
			photo: null
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

		const tags = this.state.tags;

		const token = this.props.token;

		this.props.addRecipe(token, recipe)
		.then(id => {
			setTimeout(this.props.deleteAddRecipeNotification, 3000);

			if(id === undefined) return;

			Promise.all([
				this.props.addIngredients(token, id, ingredients), 
				this.props.addDirections(token, id, directions), 
				this.props.addHints(token, id, hints), 
				this.props.addPhoto(token, id, photo),
				this.props.addTags(token, id, tags)
			])
			.then(() => { 
				setTimeout(this.props.deleteAddIngredientsNotification, 3000);
				setTimeout(this.props.deleteAddDirectionsNotification, 3000);
				setTimeout(this.props.deleteAddHintsNotification, 3000);
				setTimeout(this.props.deleteAddPhotoNotification, 3000);
				setTimeout(this.props.deleteAddTagsNotification, 3000);
				
				this.props.history.push('/'); 
			})
		})
	}

	//#endregion

	//#region Tags

	changeTags = event => {
		const target = event.target;
		const value = target.value;

		this.setState({
			tags: value
		})
	}

	//#endregion

	render() {

		if (this.props.token == null) return <div className='page'>Musisz być zalogowany</div>

		const ingredients = this.state.ingredients.map((a, i) => {
			return (
				<li className='form-ingredient' key={a.key}>
					<input className='form-ingredient__name' type='text' onChange={(event) => { this.changeIngredientName(event, i) }} />
					<input className='form-ingredient__quantity' type='text' onChange={(event) => { this.changeIngredientQuantity(event, i) }} />
					<input className='form-ingredient__unit' type='text' onChange={(event) => { this.changeIngredientUnit(event, i) }} />
					<button className='form__button--delete' onClick={(event) => { this.deleteIngredient(event, i) }}>Usuń</button>
				</li>
			)
		});

		const directions = this.state.directions.map((a, i) => {
			return (
				<li className='form-direction' key={a.key}>
					<textarea className='form-direction__text' onChange={(event) => { this.changeDirectionText(event, i) }} />
					<button className='form__button--delete' onClick={(event) => { this.deleteDirection(event, i) }}>Usuń</button>
				</li>
			)
		});

		const hints = this.state.hints.map((a, i) => {
			return (
				<li className='form-hint' key={a.key}>
					<textarea className='form-hint__text' onChange={(event) => { this.changeHintText(event, i) }} />
					<button className='form__button--delete' onClick={(event) => { this.deleteHint(event, i) }}>Usuń</button>
				</li>
			)
		});

		return (
			<div className='page'>

				<form className='component component--wide form add-recipe-form' onSubmit={this.handleSubmit}>
					<h2 className='form__header'>Dodaj przepis</h2>

					<div className='form__section'>
						<label className='form__label for__label--required' htmlFor='title'>Nazwa ciasta: </label>
						<input className='form__input' id='title' name='title' type='text' onChange={this.changeTitle} />
						{ 
                            !this.state.titleValid.isValid && 
                            <span className='form__warning'>
                                { this.state.titleValid.message }
                            </span> 
                        }
					</div>

					<div className='form__section'>
						<label className='form__label' htmlFor='desc'>Opis: </label>
						<textarea className='form__textarea' id='desc' name='description' onChange={this.changeDescription}></textarea>
					</div>

					<div className='form__section form__section--inline'>
						<label className='form__label' htmlFor='type'>Typ ciasta: </label>
						<select className='form__select' name='type' onChange={this.changeValue}>
							<option className='form__option' value='makowiec'>makowiec</option>
							<option className='form__option' value='sernik'>sernik</option>
							<option className='form__option' value='piernik'>piernik</option>
							<option className='form__option' value='jablecznik'>jablecznik</option>
							<option className='form__option' value='swiateczne'>swiateczne</option>
							<option className='form__option' value='inne'>inne</option>
						</select>
					</div>

					<hr className='form__separator'/>

					<div className='form__section'>
						<label className='form__label for__label--required' htmlFor='photo'>Zdjęcie ciasta: </label>
						{
							this.state.photo === '' ?
							<label className='form__button' htmlFor='photo'>Dodaj zdjęcie
								<input className='form__file' id='photo' name='photo' type='file' onChange={this.changePhoto} />
							</label> :
							<div className='form__image'>
								<img className='form__image-sample' src={URL.createObjectURL(this.state.photo)} alt='sample' />
								<button className='form__image-delete' onClick={this.deleteImage}>X</button>
							</div>
						}
						{ 
                            !this.state.photoValid.isValid && 
                            <span className='form__warning'>
                                { this.state.photoValid.message }
                            </span> 
                        }
					</div>

					<hr className='form__separator'/>

					<div className='form__section'>
						<label className='form__label for__label--required'>
							Składniki: <button className='form__button--add' onClick={this.addIngredient}>Dodaj</button>
						</label>
						<ul>
							{ingredients}
						</ul>
						{ 
                            !this.state.ingredientsValid.isValid && 
                            <span className='form__warning'>
                                { this.state.ingredientsValid.message }
                            </span> 
                        }
					</div>

					<hr className='form__separator'/>

					<div className='form__section'>
						<label className='form__label for__label--required'>
							Sposób wykonania: <button className='form__button--add' onClick={this.addDirection}>Dodaj</button>
						</label>
						<ol>
							{directions}
						</ol>
						{ 
                            !this.state.directionsValid.isValid && 
                            <span className='form__warning'>
                                { this.state.directionsValid.message }
                            </span> 
                        }
					</div>

					<hr className='form__separator'/>

					<div className='form__section'>
						<label className='form__label'>
							Wskazówki: <button className='form__button--add' onClick={this.addHint}>Dodaj</button>
						</label>
						<ul>
							{hints}
						</ul>
						{ 
                            !this.state.hintsValid.isValid && 
                            <span className='form__warning'>
                                { this.state.hintsValid.message }
                            </span> 
                        }
					</div>

					<hr className='form__separator'/>

					<div className='form__section'>
						<label className='form__label' htmlFor='tags'>Słowa kluczowe: </label>
						<input className='form__input' id='tags' name='tags' type='text' onChange={this.changeTags} />
					</div>

					<input 
						className={this.state.toSubmit ? 'form__submit form__submit--success' : 'form__submit form__submit--error' }
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
	addRecipe: (token, recipe) => dispatch(addRecipe(token, recipe)),
	addIngredients: (token, id, ingredients) => dispatch(addIngredients(token, id, ingredients)),
	addDirections: (token, id, directions) => dispatch(addDirections(token, id, directions)),
	addHints: (token, id, hints) => dispatch(addHints(token, id, hints)),
	addPhoto: (token, id, photos) => dispatch(addPhoto(token, id, photos)),
	addTags: (token, id, tags) => dispatch(addTags(token, id, tags)),

	deleteAddRecipeNotification: () => dispatch(deleteAddRecipeNotification()),
	deleteAddIngredientsNotification: () => dispatch(deleteAddIngredientsNotification()),
	deleteAddDirectionsNotification: () => dispatch(deleteAddDirectionsNotification()),
	deleteAddHintsNotification: () => dispatch(deleteAddHintsNotification()),
	deleteAddPhotoNotification: () => dispatch(deleteAddPhotoNotification()),
	deleteAddTagsNotification: () => dispatch(deleteAddTagsNotification())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddPage))