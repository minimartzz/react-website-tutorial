// note that the thumbnail images and the movie information are separate components
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Styles
import { Image } from "./MovieThumbnails.styles";

const MovieThumbnails = ({ image, movieId, clickable }) => (
	<div>
		{clickable ? (
			<Link to={`/${movieId}`}>
				<Image src={image} alt="movie-thumbnail" />
			</Link>
		) : (
			<Image src={image} alt="movie-thumbnail" />
		)}
	</div>
);

MovieThumbnails.propTypes = {
	image: PropTypes.string,
	movieId: PropTypes.number,
	clickable: PropTypes.bool,
};

export default MovieThumbnails;
