import React from "react";
// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/Header/header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Movie from "./components/Movie";

// Global Styles
import { GlobalStyle } from "./GlobalStyles";

const App = () => (
	<Router>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/:movieId" element={<Movie />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
		<GlobalStyle />
	</Router>
);

export default App;
