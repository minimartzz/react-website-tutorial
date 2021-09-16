import React from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

// Components
import MovieBreadCrumb from "./MovieBreadCrumb/MovieBreadCrumb";
import MovieGrid from "./MovieGrid/MovieGrid";
import Spinner from "./Spinner/Spinner";
import MovieInfo from "./MovieInfo/MovieInfo";
import MovieInfoBar from "./MovieInfoBar/MovieInfoBar";
import MovieActors from "./MovieActors/MovieActors";

// Hook
import { useMovieFetch } from "../hooks/useMovieFetch";

// Image
import NoImage from "../images/no_image.jpg";

const Movie = () => {
	const { movieId } = useParams();

	const { state: movie, loading, error } = useMovieFetch(movieId);
	console.log(movie);

	// Loading Spinner on initial load
	if (loading) return <Spinner />;
	if (error) return <div>Something went wrong...</div>;

	return (
		<>
			<MovieBreadCrumb movieTitle={movie.original_title} />
			<MovieInfo movie={movie} />
			<MovieInfoBar
				time={movie.runtime}
				budget={movie.budget}
				revenue={movie.revenue}
			/>
			<MovieGrid header="Actors">
				{movie.actors.map((actor) => (
					<MovieActors
						key={actor.credit_id}
						name={actor.name}
						chracter={actor.character}
						imageUrl={
							actor.profile_path
								? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
								: NoImage
						}
					/>
				))}
			</MovieGrid>
		</>
	);
};

export default Movie;
