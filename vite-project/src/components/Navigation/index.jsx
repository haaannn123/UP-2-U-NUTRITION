import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { randomElement } from '../util';
import ProfileButton from './ProfileButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const [menuImgSrc, setMenuImgSrc] = useState("/images/icons/menu.png");
	const [ourstoryImgSrc, setOurstoryImgSrc] = useState("/images/icons/our_story.png")
	const [eventsImgSrc, setEventsImgSrc] = useState("/images/icons/events.png")
	const [yourstoryImgSrc, setYourstoryImgSrc] = useState("/images/icons/your_story.png")
	const [cartImgSrc, setCartImgSrc] = useState("/images/icons/cart_empty.png")

	const menuColorRandom = [
		"/images/icons/menu_ro_b.png",
		"/images/icons/menu_ro_g.png",
		"/images/icons/menu_ro_r.png",
		"/images/icons/menu_ro_y.png"
	]

	return (
		<div className="nav-bar">
			<div className="logo">
				<div className="nutrition-logo">
					<NavLink exact to="/">
						<img id="main-logo" src="/images/logo.png" alt="Main Logo" />
					</NavLink>
				</div>
				<div className="logo2">
					<NavLink exact to="/our-story">
						<img id="sub-icon" src={ourstoryImgSrc}
							onMouseEnter={() => setOurstoryImgSrc("/images/icons/our_story_ro.png")}
							onMouseLeave={() => setOurstoryImgSrc("/images/icons/our_story.png")}
							className="ourstory-1" alt="Our Story" />
					</NavLink>
					<NavLink exact to="/menu">
						<img
							id="sub-icon"
							src={menuImgSrc}
							alt="Menu"
							onMouseEnter={() => setMenuImgSrc(randomElement(menuColorRandom))}
							// onMouseEnter={() => setMenuImgSrc(console.log(randomIcon(menuColorRandom)))}
							onMouseLeave={() => setMenuImgSrc("/images/icons/menu.png")}
						/>
					</NavLink>
					<NavLink exact to="/events">
						<img id="sub-icon" src={eventsImgSrc}
							onMouseEnter={() => setEventsImgSrc("/images/icons/events_ro.png")}
							onMouseLeave={() => setEventsImgSrc("/images/icons/events.png")}
							alt="Events" />
					</NavLink>
					<NavLink exact to="/your-story">
						<img id="sub-icon" src={yourstoryImgSrc}
							onMouseEnter={() => setYourstoryImgSrc("/images/icons/your_story_ro.png")}
							onMouseLeave={() => setYourstoryImgSrc("/images/icons/your_story.png")}
							alt="Your Story" />
					</NavLink>
					<NavLink exact to="/cart">
						<img id="sub-icon" src={cartImgSrc}
							alt="Cart" />
					</NavLink>
					<div>
						<ProfileButton user={sessionUser} />
						<p>Hello</p>
					</div>
				</div>
			</div>
			<div className="all-line">
				<div className="orange-line"></div>
				<div className="red-line"></div>
				<div className="green-line"></div>
				<div className="blue-line"></div>
			</div>
			{/* {isLoaded && ( */}
			{/* )} */}
		</div>
	);
}

export default Navigation;
