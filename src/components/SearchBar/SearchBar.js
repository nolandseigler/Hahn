import React from 'react';
import './SearchBar.css';

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
    }
    getSortByClass(sortByOption) {
        return this.state.sortBy === sortByOption ? 'active' : '';
    }
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }
    handleTermChange(e) {
        this.setState({
            term: e.target.value
        });
    }
    handleLocationChange(e) {
        this.setState({
            location: e.target.value
        });
    }
    //future proof for possible changes in Yelp API
    renderSortByOptions() {
        return Object
            .keys(this.sortByOptions)
            .map(sortByOption => {
                let sortByOptionValue = sortByOptions[sortByOption];
                //use .bind to here instead of in constructor in order to bind as normal and bind the current sortByOptionValue as the first argument to the method call, ensuring the method is called with the appropriate value when clicked.
                return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
            });
    }
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {/*Use .renderSortByOptions() to sort the businesses by their options*/}
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses"/>
                    <input onChange={this.handleLocationChange} placeholder="Where?"/>
                </div>
                <div className="SearchBar-submit">
                    <a>Let's Go</a>
                </div>
            </div>
        );
    }
};

export default SearchBar;