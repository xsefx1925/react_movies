import React from 'react';
import './Search.css';

class Search extends React.Component {
    state = {
        search: 'matrix', // Начальное значение
    };

    handleKeyPress = (event) => {
        // При нажатии Enter запускаем поиск
        if (event.key === 'Enter') {
            this.props.handleSearch(this.state.search);
        }
    }

    render() {
        return (
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Найти фильм..."
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    onKeyDown={this.handleKeyPress}
                />
                <button 
                    onClick={() => this.props.handleSearch(this.state.search)}
                >
                    Поиск
                </button>
            </div>
        );
    }
}

export default Search;