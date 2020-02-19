import React from 'react'

import RatingController from './RatingController';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class RecipeMini extends React.Component {

    state = {
        user: null
    }

    componentDidMount = () => {
        fetch("http://localhost:3004/users", {
            headers: {
                'securityTokenValue': this.props.token 
            }
        })
        .then(resp => resp.json())
        .then(user => {
            this.setState({ user })
        })
    }

    handleDelete = event => {
        this.props.deleteRecipe(this.props.recipe.id)
    }    

    render() {
        const recipe = this.props.recipe;
        return (
            <div className="component recipe">
                <h2 className="recipe__header">
                    <Link className="recipe__title" to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </h2>

                <RatingController recipe={recipe} token={this.props.token}/>
                
                <div className="recipe__author">
                    Dodano {recipe.add_date} przez: <Link className="recipe__user" to={`/user/${recipe.user.id}`}>{recipe.user.username} </Link>
                    {
                        this.state.user!==null && this.state.user.id===recipe.user.id &&
                        <>
                            <button className="recipe__delete" onClick={ this.handleDelete }>Usuń</button>
                            <Link className="recipe__edit" to={"/edit/" + recipe.id}>Edytuj</Link>
                        </>
                    }
                </div>

                <img className="recipe__photo" src={`http://localhost:3004/recipes/${recipe.id}/photo`} alt={recipe.title} />
                
                <div className="recipe__section">
                    {recipe.description}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(
    mapStateToProps
  )(RecipeMini)