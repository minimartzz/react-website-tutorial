import React from "react";
import { Link } from "react-router-dom";
import PropType from "prop-types";

// Styles
import { Wrapper, Content } from "./MovieBreadCrumb.styles";

const MovieBreadCrumb = ({ movieTitle }) => (
	<Wrapper>
		<Content>
			<Link to="/">
				<span>Home</span>
			</Link>
			<span>|</span>
			<span>{movieTitle}</span>
		</Content>
	</Wrapper>
);

MovieBreadCrumb.propTypes = {
	movieTitle: PropType.string,
};

export default MovieBreadCrumb;
