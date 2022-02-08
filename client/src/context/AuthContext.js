import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initalState = {
	user: null,
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
