import React from 'react';

class SortController extends React.Component {
    render() {
        return (
            <div className="component">

                <div className="form__section form__section--inline">
                    <label className="form__label" htmlFor="type">Sortuj po: </label>
                    <select className="form__select" name="sort" onChange={this.props.chooseSort}>
                        <option className="form__option" value="date">data</option>
                        <option className="form__option" value="alpha">alfabetycznie</option>
                        <option className="form__option" value="average">średniej ocen</option>
                        <option className="form__option" value="count">ilości ocen</option>
                    </select>
                </div>

            </div>
        )
    }
}

export default SortController;