import { useState, useEffect } from "react";
import API from "../API";

// Helpers
import { isPersistedState } from "../helpers";

export const useMovieFetch = (movieId) => {
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		// Note [Difference w/ useHomeFetch] - this has no argument to tell it when to
		// rerender, it is still possible to move this outside and declare "movieId" as a
		// required argument, or use the "useCallback" function provided by React
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(false);

				const movie = await API.fetchMovie(movieId);
				const credits = await API.fetchCredits(movieId);
				// Get directors
				const directors = credits.crew.filter(
					(member) => member.job === "Director"
				);

				setState({
					...movie,
					actors: credits.cast,
					directors,
				});

				setLoading(false);
			} catch (error) {
				setError(true);
			}
		};

		// Create persited movie state
		const sessionState = isPersistedState(movieId);

		if (sessionState) {
			setState(sessionState);
			setLoading(false);
			return;
		}

		fetchData();
	}, [movieId]);

	// Write to sessionStorage
	useEffect(() => {
		sessionStorage.setItem(movieId, JSON.stringify(state));
	}, [movieId, state]);

	return { state, loading, error };
};
