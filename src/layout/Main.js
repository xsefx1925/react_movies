// import React from  'react';
// import './Main.css';
// // import Movie from './components/Movie';
// import MovieList from './components/MovieList';
// import Preloader  from './components/Preloader';

// class Main extends React.Component
// {
//     state=
//     {
//         movies:[]
//     }
//     componentDidMount()
//     {
//         fetch('https://omdbapi.com/?apikey=ffc0fae5&s=matrix')
//         .then(response=> response.json())
//         .then(data => this.setState({movies:data.Search}));
//     }
//     render()
//     {
//         return(
//             <div className='main'>
//                 <div className='wrap'>
//   {/* <Movie Title = "The Matrix" Year="1999" Type="Movie" Poster="https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg"/> */}

//         {
//          this.state.movies.length ? <MovieList movies={this.state.movies} /> : <Preloader />
//         }
//                 </div>
//             </div>
//         )
//     }
// }
// export default Main;

import React from 'react';
import './Main.css';
import MovieList from './components/MovieList';
import Preloader from './components/Preloader';
import Search from './components/Search';
import Pagination from './components/Pagination';

// API KEY: ffc0fae5
const API_KEY = 'ffc0fae5';

class Main extends React.Component
{
    state =
    {
        movies: [],
        loading: true, // Флаг для отображения прелоадера
        search: 'matrix', // Поисковый запрос по умолчанию
        totalResults: 0, // Общее количество результатов для пагинации
        currentPage: 1, // Текущая страница
        resultsPerPage: 12, // Количество результатов на странице
    }

    componentDidMount()
    {
        this.searchMovies(this.state.search, this.state.currentPage);
    }

    // Метод для загрузки данных (включая пагинацию)
    searchMovies = (searchQuery, pageNumber = 1) =>
    {
        this.setState({ loading: true, movies: [] }); // Сброс и показ прелоадера

        // Формируем URL с поисковым запросом и номером страницы
        const url = `https://omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&page=${pageNumber}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // OMDB API возвращает "Search" (массив фильмов) и "totalResults"
                this.setState({
                    movies: data.Search || [], // Если фильмов нет, возвращаем пустой массив
                    loading: false,
                    totalResults: data.totalResults ? Number(data.totalResults) : 0,
                    search: searchQuery,
                    currentPage: pageNumber,
                });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                this.setState({ loading: false, movies: [], totalResults: 0 });
            });
    }

    // Метод для обработки нажатия на кнопку поиска
    handleSearch = (search, type) => {
        // Запускаем поиск, всегда начиная с первой страницы
        this.searchMovies(search, 1);
    }

    // Метод для обработки смены страницы
    handlePageChange = (page) => {
        // Запускаем поиск с новым номером страницы и текущим запросом
        this.searchMovies(this.state.search, page);
    }

    render()
    {
        const { movies, loading, totalResults, currentPage, resultsPerPage } = this.state;
        const totalPages = Math.ceil(totalResults / resultsPerPage);

        return(
            <div className='main'>
                <div className='wrap'>
                    {/* 1. Строка поиска */}
                    <Search handleSearch={this.handleSearch} />

                    {/* Отображение списка фильмов или прелоадера */}
                    {loading ? (
                        <Preloader />
                    ) : movies.length ? (
                        <>
                            <MovieList movies={movies} />
                            
                            {/* 2. Пагинация */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={this.handlePageChange}
                                />
                            )}
                        </>
                    ) : (
                        <p>Ничего не найдено.</p>
                    )}
                </div>
            </div>
        )
    }
}
export default Main;