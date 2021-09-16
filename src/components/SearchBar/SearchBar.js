// This is also an example of a controlled component
// A controlled component is something that changes whenever the given state changes
// here the search term in the input box is the state and when people type into it, it will change the state
// and rerender whatever was most recently typed in
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Image
import searchIcon from "../../images/search-icon.svg";

// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
	const [state, setState] = useState("");
	// useRef is a mutable value for you to change and have different functionality
	// it also does not trigger a rerender when the value changes unlike useEffect or useState
	// initial.current <- true .current contains the current value of the obj
	const initial = useRef(true);

	useEffect(() => {
		// useRef here is to prevent the initial render whe
		if (initial.current) {
			initial.current = false;
			return;
		}

		const timer = setTimeout(() => {
			setSearchTerm(state);
		}, 500);

		// return statement is for cleanup - it will only run when everything in the block finishes rendering
		return () => clearTimeout(timer);
	}, [setSearchTerm, state]);

	return (
		<Wrapper>
			<Content>
				<img src={searchIcon} alt="search-icon" />
				<input
					type="text"
					placeholder="Search Movie"
					onChange={(event) => setState(event.currentTarget.value)}
					value={state}
				/>
			</Content>
		</Wrapper>
	);
};

SearchBar.propTypes = {
	callback: PropTypes.func,
};

export default SearchBar;
