import React from "react";
import { getMovies } from "../services/fakeMovieService"; //named export
import Like from "./common/Like";
import Pagination from "./common/Paginations";

class Movies extends React.Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  };

  handleDelete = movie => {
    //console.log(movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies: movies
    });
  };



  handleLike = movie => {
    const movies = [...this.state.movies]; // clone movies
    const index = movies.indexOf(movie); //
    movies[index] = { ...movies[index] }; // new object and clone
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies; //destructuring
    const { pageSize, currentPage } = this.state;
    if (count === 0) {
      return <h2>No Movies in the database</h2>;
    }
    const MOVIESLIST = this.state.movies;
    const list = MOVIESLIST.map((movie, index) => {
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
              className="btn btn-sm btn-danger"
              onClick={() => this.handleDelete(movie)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h2>Showing {MOVIESLIST.length} movies in the Database.</h2>

        <table className="table ">
          <thead className="thead-dark">
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
    );
  }
}
export default Movies;
