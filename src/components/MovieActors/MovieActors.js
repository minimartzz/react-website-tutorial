import React from "react";
import PropTypes from "prop-types";

// Styles
import { Wrapper, Image } from "./MovieActors.styles";

const MovieActors = ({ name, chracter, imageUrl }) => (
	<Wrapper>
		<Image src={imageUrl} alt="actor-thumbnail" />
		<h3>{name}</h3>
		<p>{chracter}</p>
	</Wrapper>
);

MovieActors.propTypes = {
	name: PropTypes.string,
	chracter: PropTypes.string,
	imageUrl: PropTypes.string,
};

export default MovieActors;
