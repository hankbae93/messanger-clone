import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initalState = {
	user: {
		_id: "6200d92e1f3b56da8fbfd0cf",
		username: "ranja",
		email: "ranja@gmail.com",
		profilePicture: "person/ranja.jpeg",
		coverPicture: "",
		followers: [],
		followings: ["62011aec3aa6298035e28a7d"],
		createdAt: "2022-02-07T08:32:46.452Z",
		updatedAt: "2022-02-08T13:37:26.876Z",
		__v: 0,
		isAdmin: false,
		desc: "내가 제일 세",
		city: "서울",
		from: "부산",
		relationship: 2,
	},
	isFetching: false,
	error: false,
};

export const AuthContext = createContext(initalState);

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initalState);

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

export default AuthContextProvider;
