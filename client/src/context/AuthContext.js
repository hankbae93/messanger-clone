import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	// user: JSON.parse(localStorage.getItem("user")) || null,
	user: {
		_id: "6200d92e1f3b56da8fbfd0cf",
		username: "ranja",
		email: "ranja@gmail.com",
		profilePicture: "person/ranja.jpeg",
		coverPicture: "",
		followers: [],
		followings: [],
		isAdmin: false,
		desc: "내가 제일 세",
		city: "서울",
		from: "부산",
		relationship: 2,
	},
	isFetching: false,
	error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
