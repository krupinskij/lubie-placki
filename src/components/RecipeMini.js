import React from 'react'

import RatingController from './RatingController';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import history from '../helpers/history';

class RecipeMini extends React.Component {

    handleDelete = event => {
        fetch("http://localhost:3004/recipes/"+this.props.recipe.id,{
            method: 'DELETE',
          })
          .then(() => {
              history.push("/");
              window.location.reload(false);
          });
    }    

    render() {
        const recipe = this.props.recipe;
        return (
            <div className="component recipe">
                <h2 className="recipe__header">
                    <Link className="recipe__title" to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </h2>

                <RatingController recipe={recipe} user={this.props.user}/>
                
                <div className="recipe__author">
                    Dodano {recipe.add_date} przez: <Link className="recipe__user" to={`/user/${recipe.user.id}`}>{recipe.user.username} </Link>
                    {
                        this.props.user!==null && this.props.user.id===recipe.user.id &&
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

const mapStateToProps = (state /*, ownProps*/) => {
	
	return {
	  user: state.user,
	}
  }
  
  export default connect(
	mapStateToProps
  )(RecipeMini)