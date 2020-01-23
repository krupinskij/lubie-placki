import React from 'react';

class SortController extends React.Component {
    render() {
        return(
            <div className="component">
                <div>Sortuj po:</div>
                <select name="sort" onChange={this.props.chooseSort}>
                    <option value="date">data</option>
                    <option value="alpha">alfabetycznie</option>
                </select>
            </div>
        )
    }
}

export default SortController;