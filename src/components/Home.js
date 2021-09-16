import React from "react";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// Components
import BannerImage from "./BannerImage/BannerImage.js";
import MovieGrid from "./MovieGrid/MovieGrid";
import MovieThumbnails from "./MovieThumbnails/MovieThumbnails";
import Spinner from "./Spinner/Spinner";
import SearchBar from "./SearchBar/SearchBar";
import LoadMore from "./LoadMore/LoadMore";

// Hook
import { useHomeFetch } from "../hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

const Home = () => {
	const {
		state,
		loading,
		error,
		searchTerm,
		setSearchTerm,
		setIsLoadingMore,
	} = useHomeFetch();

	console.log(state);

	if (error) return <div>Something went wrong...</div>;

	return (
		// <> and </> are called fragments, because React requires you to return only 1 component
		<>
			{!searchTerm && state.results[0] ? (
				<BannerImage
					image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
					title={state.results[0].original_title}
					text={state.results[0].overview}
				/>
			) : null}
			<SearchBar setSearchTerm={setSearchTerm} />
			<MovieGrid
				header={searchTerm ? "Search Results" : "Popular Movies"}
			>
				{state.results.map((movie) => (
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
			{state.page < state.total_pages && !loading && (
				<LoadMore
					text="Load More"
					callback={() => setIsLoadingMore(true)}
				/>
			)}
		</>
	);
};

export default Home;
