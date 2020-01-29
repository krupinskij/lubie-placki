import React from 'react';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addRecipe } from '../../redux/actions/recipeActions/addRecipeActions';
import { addIngredients } from '../../redux/actions/recipeActions/addIngredientsActions';
import { addDirections } from '../../redux/actions/recipeActions/addDirectionsActions';
import { addHints } from '../../redux/actions/recipeActions/addHintsActions';
import { addPhoto } from '../../redux/actions/recipeActions/addPhotoActions';
import { addTags } from '../../redux/actions/recipeActions/addTagsActions';

import { 
	required,
	nonBlank,
	isNumber,
	isFile
} from '../../validation/requirements';
import { validate, canSubmit } from '../../validation/validator';



class AddPage extends React.Component {

	state = {
		title: "",
		titleValid: { 
            isValid: false,
            message: "To pole nie może być puste"
		},
		
		description: "",

		type: "",

		ingredients: [
			{
				key: Math.random(),
				name: "",
				quantity: "",
				unit: ""
			}
		],
		ingredientsValid: { 
            isValid: false,
            message: "Wypełnij wszystkie pola"
        },

		directions: [
			{
				key: Math.random(),
				text: ""
			}
		],
		directionsValid: { 
            isValid: false,
            message: "Wypełnij wszystkie pola"
		},
		
		hints: [],
		hintsValid: { 
            isValid: true
        },

		photo: "",
		photoValid: { 
            isValid: false,
            message: "Dodaj zdjęcie"
		},

		tags: "",
		
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
			required("")
		)

		const toSubmit = canSubmit(
			this.state.titleValid,
			valid,
			this.state.ingredientsValid,
			this.state.directionsValid,
			this.state.hintsValid
		)

		this.setState({
			photo: "",
			photoValid: valid,
			toSubmit
		})
	}

	//#endregion

	//#region Ingredients

	addIngredient = event => {
		event.preventDefault();

		const ingredients = [...this.state.ingredients, { key: Math.random(), name: "", quantity: "", unit: "" }];
		
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

		const directions = [...this.state.directions, { key: Math.random(), text: "" }];
		
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

		const hints = [...this.state.hints, { key: Math.random(), text: "" }];
		
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

		this.props.addRecipe(this.props.user.id, recipe)
		.then(resp => {
			return Promise.all([
				this.props.addIngredients(resp.id, ingredients), 
				this.props.addDirections(resp.id, directions), 
				this.props.addHints(resp.id, hints), 
				this.props.addPhoto(resp.id, photo),
				this.props.addTags(resp.id, tags)
			])
		})
		.then(() => {
			this.props.history.push("/");
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

		const { user } = this.props;

		if (user == null) return <div className="page">Musisz być zalogowany</div>

		const ingredients = this.state.ingredients.map((a, i) => {
			return (
				<li className="form-ingredient" key={a.key}>
					<input className="form-ingredient__name" type="text" onChange={(event) => { this.changeIngredientName(event, i) }} />
					<input className="form-ingredient__quantity" type="text" onChange={(event) => { this.changeIngredientQuantity(event, i) }} />
					<input className="form-ingredient__unit" type="text" onChange={(event) => { this.changeIngredientUnit(event, i) }} />
					<button className="form__button--delete" onClick={(event) => { this.deleteIngredient(event, i) }}>Usuń</button>
				</li>
			)
		});

		const directions = this.state.directions.map((a, i) => {
			return (
				<li className="form-direction" key={a.key}>
					<textarea className="form-direction__text" onChange={(event) => { this.changeDirectionText(event, i) }} />
					<button className="form__button--delete" onClick={(event) => { this.deleteDirection(event, i) }}>Usuń</button>
				</li>
			)
		});

		const hints = this.state.hints.map((a, i) => {
			return (
				<li className="form-hint" key={a.key}>
					<textarea className="form-hint__text" onChange={(event) => { this.changeHintText(event, i) }} />
					<button className="form__button--delete" onClick={(event) => { this.deleteHint(event, i) }}>Usuń</button>
				</li>
			)
		});

		return (
			<div className="page">
				<form className="component component--wide form add-recipe-form" onSubmit={this.handleSubmit}>
					<h2 className="form__header">Dodaj przepis</h2>

					<div className="form__section">
						<label className="form__label for__label--required" htmlFor="title">Nazwa ciasta: </label>
						<input className="form__input" id="title" name="title" type="text" onChange={this.changeTitle} />
						{ 
                            !this.state.titleValid.isValid && 
                            <span className="form__error">
                                { this.state.titleValid.message }
                            </span> 
                        }
					</div>

					<div className="form__section">
						<label className="form__label" htmlFor="desc">Opis: </label>
						<textarea className="form__textarea" id="desc" name="description" onChange={this.changeDescription}></textarea>
					</div>

					<div className="form__section form__section--inline">
						<label className="form__label" htmlFor="type">Typ ciasta: </label>
						<select className="form__select" name="type" onChange={this.changeValue}>
							<option className="form__option" value="makowiec">makowiec</option>
							<option className="form__option" value="sernik">sernik</option>
							<option className="form__option" value="piernik">piernik</option>
							<option className="form__option" value="jablecznik">jablecznik</option>
							<option className="form__option" value="swiateczne">swiateczne</option>
							<option className="form__option" value="inne">inne</option>
						</select>
					</div>

					<hr className="form__separator"/>

					<div className="form__section">
						<label className="form__label for__label--required" htmlFor="photo">Zdjęcie ciasta: </label>
						{
							this.state.photo === "" ?
							<label className="form__button" htmlFor="photo">Dodaj zdjęcie
								<input className="form__file" id="photo" name="photo" type="file" onChange={this.changePhoto} />
							</label> :
							<div className="form__image">
								<img className="form__image-sample" src={URL.createObjectURL(this.state.photo)} alt="sample" />
								<button className="form__image-delete" onClick={this.deleteImage}>X</button>
							</div>
						}
						{ 
                            !this.state.photoValid.isValid && 
                            <span className="form__error">
                                { this.state.photoValid.message }
                            </span> 
                        }
					</div>

					<hr className="form__separator"/>

					<div className="form__section">
						<label className="form__label for__label--required">
							Składniki: <button className="form__button--add" onClick={this.addIngredient}>Dodaj</button>
						</label>
						<ul>
							{ingredients}
						</ul>
						{ 
                            !this.state.ingredientsValid.isValid && 
                            <span className="form__error">
                                { this.state.ingredientsValid.message }
                            </span> 
                        }
					</div>

					<hr className="form__separator"/>

					<div className="form__section">
						<label className="form__label for__label--required">
							Sposób wykonania: <button className="form__button--add" onClick={this.addDirection}>Dodaj</button>
						</label>
						<ol>
							{directions}
						</ol>
						{ 
                            !this.state.directionsValid.isValid && 
                            <span className="form__error">
                                { this.state.directionsValid.message }
                            </span> 
                        }
					</div>

					<hr className="form__separator"/>

					<div className="form__section">
						<label className="form__label">
							Wskazówki: <button className="form__button--add" onClick={this.addHint}>Dodaj</button>
						</label>
						<ul>
							{hints}
						</ul>
						{ 
                            !this.state.hintsValid.isValid && 
                            <span className="form__error">
                                { this.state.hintsValid.message }
                            </span> 
                        }
					</div>

					<hr className="form__separator"/>

					<div className="form__section">
						<label className="form__label" htmlFor="tags">Słowa kluczowe: </label>
						<input className="form__input" id="tags" name="tags" type="text" onChange={this.changeTags} />
					</div>

					<input 
						className={this.state.toSubmit ? "form__submit form__submit--success" : "form__submit form__submit--error" }
						type="submit" value="Dodaj" />
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        user: state.user,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => ({
	addRecipe: (user_id, recipe) => dispatch(addRecipe(user_id, recipe)),
	addIngredients: (recipe_id, ingredients) => dispatch(addIngredients(recipe_id, ingredients)),
	addDirections: (recipe_id, directions) => dispatch(addDirections(recipe_id, directions)),
	addHints: (recipe_id, hints) => dispatch(addHints(recipe_id, hints)),
	addPhoto: (recipe_id, photos) => dispatch(addPhoto(recipe_id, photos)),
	addTags: (recipe_id, tags) => dispatch(addTags(recipe_id, tags))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddPage))