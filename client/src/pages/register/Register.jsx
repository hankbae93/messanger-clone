import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {
	const history = useHistory();
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity("비밀번호가 일치하지 않습니다.");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				const res = await axios.post("/auth/register", user);
				history.push("/login");
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className='login'>
			<div className='loginWrapper'>
				<div className='loginLeft'>
					<h3 className='loginLogo'>RanjaSocial</h3>
					<span className='loginDesc'>
						Connect with friends and the world around you on RanjaSocial.
					</span>
				</div>
				<form className='loginRight' onSubmit={handleClick}>
					<div className='loginBox'>
						<input
							placeholder='Username'
							className='loginInput'
							ref={username}
							required
						/>
						<input
							type='email'
							placeholder='Email'
							className='loginInput'
							ref={email}
							required
						/>
						<input
							type='password'
							placeholder='Password'
							className='loginInput'
							ref={password}
							required
							minLength={6}
						/>
						<input
							placeholder='Password Again'
							className='loginInput'
							ref={passwordAgain}
							required
						/>
						<button type='submit' className='loginButton'>
							Sign Up
						</button>
						<button
							className='loginRegisterButton'
							onClick={() => history.push("/login")}
						>
							Log into Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
