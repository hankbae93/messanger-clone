import { useContext, useRef, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import axios from "axios";

export default function Share() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);
	const desc = useRef();
	const [file, setFile] = useState(null);

	const submitHandler = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		};

		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);
			newPost.img = filename;
			try {
				await axios.post("/upload", data);
				window.location.reload();
			} catch (error) {
				console.error(error);
			}
		}

		try {
			await axios.post("/posts", newPost);
		} catch (error) {}
	};

	return (
		<div className='share'>
			<div className='shareWrapper'>
				<div className='shareTop'>
					<img
						className='shareProfileImg'
						src={
							user.profilePicture
								? PF + user.profilePicture
								: PF + "person/noAvatar.png"
						}
						alt=''
					/>
					<input
						placeholder={`What's in your mind, ${user.username}?`}
						className='shareInput'
						ref={desc}
					/>
				</div>

				<hr className='shareHr' />

				<form className='shareBottom' onSubmit={submitHandler}>
					<div className='shareOptions'>
						<label htmlFor='file' className='shareOption'>
							<PermMedia htmlColor='tomato' className='shareIcon' />
							<span className='shareOptionText'>Photo or Video</span>
							<input
								type='file'
								style={{ display: "none" }}
								id='file'
								accept='.png, .jpeg, .jpg'
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
						<div className='shareOption'>
							<Label htmlColor='blue' className='shareIcon' />
							<span className='shareOptionText'>Tag</span>
						</div>
						<div className='shareOption'>
							<Room htmlColor='green' className='shareIcon' />
							<span className='shareOptionText'>Location</span>
						</div>
						<div className='shareOption'>
							<EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
							<span className='shareOptionText'>Feelings</span>
						</div>
					</div>
					<button className='shareButton' type='submit'>
						Share
					</button>
				</form>
			</div>
		</div>
	);
}
