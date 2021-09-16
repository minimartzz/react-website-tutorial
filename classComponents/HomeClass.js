import React, { Component } from "react";

// API
import API from "../src/API";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../src/config";

// Components
import BannerImage from "../src/components/BannerImage/BannerImage.js";
import MovieGrid from "../src/components/MovieGrid/MovieGrid";
import MovieThumbnails from "../src/components/MovieThumbnails/MovieThumbnails";
import Spinner from "../src/components/Spinner/Spinner";
import SearchBar from "../src/components/SearchBar/SearchBar";
import LoadMore from "../src/components/LoadMore/LoadMore";

// Image
import NoImage from "../images/no_image.jpg";

const initialState = {
	page: 0,
	results: [],
	total_pages: 0,
	total_results: 0,
};

class Home extends Component {
	state = {
		movies: initialState,
		searchTerm: "",
		isLoadingMore: false,
		loading: false,
		error: false,
	};

	fetchMovies = async (page, searchTerm = "") => {
		try {
			this.setState({ error: false, loading: true });

			const movies = await API.fetchMovies(searchTerm, page);

			this.setState((prev) => ({
				...prev,
				movies: {
					...movies,
					results:
						page > 1
							? [...prev.results.movies, ...movies.results]
							: [...movies.results],
				},
				loading: false,
			}));
		} catch (error) {
			this.setState({ error: true, loading: false });
		}
	};

	handleSearch = (searchTerm) =>
		this.setState({ movies: initialState, searchTerm }, () =>
			this.fetchMovies(1, this.state.searchTerm)
		);

	handleLoadMore = () =>
		this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

	componentDidMount() {
		this.fetchMovies(1);
	}

	render() {
		const { searchTerm, movies, loading, error } = this.state;

		if (error) return <div>Something went wrong...</div>;

		return (
			// <> and </> are called fragments, because React requires you to return only 1 component
			<>
				{!searchTerm && movies.results[0] ? (
					<BannerImage
						image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
						title={movies.results[0].original_title}
						text={movies.results[0].overview}
					/>
				) : null}
				<SearchBar setSearchTerm={this.handleSearch} />
				<MovieGrid
					header={searchTerm ? "Search Results" : "Popular Movies"}
				>
					{movies.results.map((movie) => (
						// when you map, you need to return a unique key for each div else React will complain
						<MovieThumbnails
							key={movie.id}
							clickable
							image={
								movie.poster_path
									? IMAGE_BASE_URL +
									  POSTER_SIZE +
									  movie.poster_path
									: NoImage
							}
							movieId={movie.id}
						/>
					))}
				</MovieGrid>
				{loading && <Spinner />}
				{movies.page < movies.total_pages && !loading && (
					<LoadMore text="Load More" callback={this.handleLoadMore} />
				)}
			</>
		);
	}
}

export default Home;
