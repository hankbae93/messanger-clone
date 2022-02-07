import React from "react";
import "./topbar.css";

import { Person, Search, Chat, Notifications } from "@material-ui/icons";

const Topbar = () => {
	return (
		<div className='topbarContainer'>
			<div className='topbarLeft'>
				<span className='logo'>RanjaSocial</span>
			</div>

			<div className='topbarCenter'>
				<div className='searchbar'>
					<Search className='searchIcon' />
					<input
						type='text'
						placeholder='친구, 게시글, 비디오를 찾아보세요'
						className='searchInput'
					/>
				</div>
			</div>

			<div className='topbarRight'>
				<div className='topbarLinks'>
					<div className='topbarLink'>Homepage</div>
					<div className='topbarLink'>Timeline</div>
				</div>
				<div className='topbarIcons'>
					<div className='topbarIconItem'>
						<Person />
						<span className='topbarIconBadge'>1</span>
					</div>
					<div className='topbarIconItem'>
						<Chat />
						<span className='topbarIconBadge'>1</span>
					</div>
					<div className='topbarIconItem'>
						<Notifications />
						<span className='topbarIconBadge'>1</span>
					</div>
				</div>
				<img src='/assets/person/1.jpeg' alt='' className='topbarImg' />
			</div>
		</div>
	);
};

export default Topbar;
