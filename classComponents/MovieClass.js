import React, { Component } from "react";
import { useParams } from "react-router-dom";

// API
import API from "../src/API";

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../src/config";

// Components
import MovieBreadCrumb from "../src/components/MovieBreadCrumb/MovieBreadCrumb";
import MovieGrid from "../src/components/MovieGrid/MovieGrid";
import Spinner from "../src/components/Spinner/Spinner";
import MovieInfo from "../src/components/MovieInfo/MovieInfo";
import MovieInfoBar from "../src/components/MovieInfoBar/MovieInfoBar";
import MovieActors from "../src/components/MovieActors/MovieActors";

// Image
import NoImage from "../images/no_image.jpg";

class Movie extends Component {
	state = {
		movie: {},
		loading: true,
		error: false,
	};

	fetchData = async () => {
		const { movieId } = this.props.params;

		try {
			this.setState({ loading: true, error: false });

			const movie = await API.fetchMovie(movieId);
			const credits = await API.fetchCredits(movieId);
			// Get directors
			const directors = credits.crew.filter(
				(member) => member.job === "Director"
			);

			this.setState({
				movie: {
					...movie,
					actors: credits.cast,
					directors,
				},
				loading: false,
			});
		} catch (error) {
			this.setState({ error: true });
		}
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { movie, loading, error } = this.state;

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
	}
}

const MovieWithParams = (props) => <Movie {...props} params={useParams()} />;

export default MovieWithParams;
