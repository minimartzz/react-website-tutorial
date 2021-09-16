import React from "react";
import PropTypes from "prop-types";

// Styles
import { Wrapper } from "./LoadMore.styles";

const LoadMore = ({ text, callback }) => (
	<Wrapper type="button" onClick={callback}>
		{text}
	</Wrapper>
);

LoadMore.propTypes = {
	text: PropTypes.string,
	callback: PropTypes.func,
};

export default LoadMore;
