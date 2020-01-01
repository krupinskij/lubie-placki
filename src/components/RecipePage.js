import React from 'react';

class RecipePage extends React.Component {

    state = {
        recipe: {},
        loading: true
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;

        fetch("http://localhost:3004/recipes/" + id)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    recipe: resp,
                    loading: false
                })
            })
    }

    render() {

        if(this.state.loading) return(<div>Loading...</div>)

        const recipe = this.state.recipe;

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
            <div>
                <h1>{recipe.title}</h1>
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
    }
}

export default RecipePage