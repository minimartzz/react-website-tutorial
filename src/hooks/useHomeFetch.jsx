import { useState, useEffect } from "react";
import API from "../API";

// Helper
import { isPersistedState } from "../helpers";

// good to create an initialState just in case
const initialState = {
	page: 0,
	results: [],
	total_pages: 0,
	total_results: 0,
};

export const useHomeFetch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const fetchMovies = async (page, searchTerm = "") => {
		try {
			setError(false);
			setLoading(true);

			// function to get the movies from the movie db
			const movies = await API.fetchMovies(searchTerm, page);

			// update the state of the number of movies - "load more" button to add more movies to current state
			setState((prev) => ({
				// need the previous state because we want to keep the current state, but add the new results to it
				...movies,
				// results here just replaces the old kv pair
				results:
					page > 1
						? [...prev.results, ...movies.results]
						: [...movies.results],
			}));
		} catch (error) {
			setError(true);
			console.log(error);
		}
		setLoading(false);
	};

	// Initial and Search Render
	// second argument is a dependency array (when do we want the callback to run)
	// so in this case it will render on initial mount and now whenever the search term changes
	useEffect(() => {
		if (!searchTerm) {
			// check if there exists a sessionState and if the user is not searching,
			// then return the saved sessionState
			// Note: this only reads the state, doesn't write to it
			const sessionState = isPersistedState("homeState");

			if (sessionState) {
				console.log("Grabbing from sessionStorage");
				setState(sessionState);
				return;
			}
		}
		console.log("Grabbing from API");
		// want to reset the search state to the initial state whenever we create a new search
		setState(initialState);
		fetchMovies(1, searchTerm);
	}, [searchTerm]);

	// Load More
	useEffect(() => {
		if (!isLoadingMore) return;

		fetchMovies(state.page + 1, searchTerm);
		setIsLoadingMore(false);
	}, [isLoadingMore, searchTerm, state.page]);

	// Write to sessionStorage
	useEffect(() => {
		if (!searchTerm)
			sessionStorage.setItem("homeState", JSON.stringify(state));
	}, [searchTerm, state]);

	// note 1: [Search Bar] We are exporting the setter function, because we are updating the state of the search bar value
	return {
		state,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		setIsLoadingMore,
	};
};
