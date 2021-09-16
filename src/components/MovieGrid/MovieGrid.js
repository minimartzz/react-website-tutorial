import React from "react";
import PropTypes from "prop-types";

// Styles
import { Wrapper, Content } from "./MovieGrid.styles";

const MovieGrid = ({ header, children }) => (
	<Wrapper>
		<h1>{header}</h1>
		<Content>{children}</Content>
	</Wrapper>
);

MovieGrid.propTypes = {
	header: PropTypes.string,
};

export default MovieGrid;
