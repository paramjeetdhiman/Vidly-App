import React from 'react';
import { getGenres } from '../services/fakeGenreService'; //named export
import { getMovies } from '../services/fakeMovieService'; //named export
import Like from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './ListGroup';
class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    //console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies: movies
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies]; // clone movies
    const index = movies.indexOf(movie); //
    movies[index] = { ...movies[index] }; // new object and clone
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect() {
    console.log('selected');
  }

  render() {
    const { length: count } = this.state.movies; //destructuring
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (count === 0) return <h2>No Movies in the database</h2>;

    const movies = paginate(allMovies, currentPage, pageSize);

    const list = movies.map((movie, index) => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
          </td>

          <td>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => this.handleDelete(movie)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <ListGroup
                textProperty='name'
                valueProperty='_id'
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className='col'>
              <h2>Showing {movies.length} movies in the Database.</h2>

              <table className='table '>
                <thead className='thead-dark'>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th>Review</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </table>
              <Pagination
                itemsCount={count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Movies;
