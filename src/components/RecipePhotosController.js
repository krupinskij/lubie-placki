import React from 'react'

class RecipePhotosController extends React.Component {

    state = {
        photo: ""
    }

    changePhoto = event => {
        const target = event.target;
        const value = target.files[0];

        this.setState({
            photo: value
        })
    }

    addClick = event => {
        event.preventDefault();

        const photo = this.state.photo;

        fetch('http://localhost:3004/recipes/' + this.props.recipe_id + '/user_photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'image/jpeg'
            },
            body: photo
        })
            .then(resp => {
                window.location.reload(false);
            })
    }

    render() {
        const photos = Array(this.props.photos_count).fill(0).map((a, i) => {
            return (
                <img className="form__photo" src={"http://localhost:3004/recipes/" + this.props.recipe_id + "/user_photo/" + i} />
            )
        })

        return (
            <div className="component">
                <div className="form__section">
                    <label className="form__label">Zdjęcia innych użytkowników: </label>
                    <div className="form__photos">
                        {photos}
                    </div>
                </div>

                {
                    this.props.user_id !== undefined &&
                    <>
                        <hr className="form__separator" />

                        <div className="form__section">
                            <label className="form__label" htmlFor="photo">Dodaj własne zdjęcie ciasta: </label>
                            {
                                this.state.photo === "" ?
                                    <label className="form__button" htmlFor="photo">Dodaj zdjęcie
                                    <input className="form__file" id="photo" name="photo" type="file" onChange={this.changePhoto} />
                                    </label> :
                                    <>
                                        <div className="form__image">
                                            <img className="form__image-sample" src={URL.createObjectURL(this.state.photo)} alt="sample" />
                                        </div>
                                        <button className="controller__submit" onClick={this.addClick}>Dodaj</button>
                                    </>
                            }
                        </div>
                    </>
                }

            </div>
        )
    }
}

export default RecipePhotosController;