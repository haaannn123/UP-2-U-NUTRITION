import { NavLink, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";
import { randomElement } from '../util';
import { getCartItems } from '../../store/cart';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const [menuImgSrc, setMenuImgSrc] = useState("/images/icons/menu.png");
	const [ourstoryImgSrc, setOurstoryImgSrc] = useState("/images/icons/our_story.png")
	const [eventsImgSrc, setEventsImgSrc] = useState("/images/icons/events.png")
	const [cartImgSrc, setCartImgSrc] = useState("/images/icons/cart_empty.png");
	// const [cartAmount, setCartAmount] = useState(0);
	const user = useSelector(state => state.session.user);
	const navigate = useNavigate();



	const itemsObj = useSelector(state => state.cartReducer)
	const itemsInCart = Object.values(itemsObj)
	

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	const menuColorRandom = [
		"/images/icons/menu_ro_b.png",
		"/images/icons/menu_ro_g.png",
		"/images/icons/menu_ro_r.png",
		"/images/icons/menu_ro_y.png"
	]

	useEffect(() => {
		dispatch(getCartItems());
		// setCartAmount(itemsInCart.length);
	}, [dispatch]);

	return (
		<div className="nav-bar">
			<div className="logo">
				<div className="nutrition-logo">
					<NavLink exact="true" to="/">
						<img id="main-logo" src="/images/logo.png" alt="Main Logo" />
					</NavLink>
				</div>
				<div className="icons-nav-bar">
					<NavLink exact="true" to="/our-story">
						<img id="sub-icon" src={ourstoryImgSrc}
							onMouseEnter={() => setOurstoryImgSrc("/images/icons/our_story_ro.png")}
							onMouseLeave={() => setOurstoryImgSrc("/images/icons/our_story.png")}
							className="ourstory-1" alt="Our Story" />
					</NavLink>
					<NavLink exact="true" to="/menu">
						<img
							id="sub-icon"
							src={menuImgSrc}
							alt="Menu"
							onMouseEnter={() => setMenuImgSrc(randomElement(menuColorRandom))}
							onMouseLeave={() => setMenuImgSrc("/images/icons/menu.png")}
						/>
					</NavLink>
					<NavLink exact="true" to="/events">
						<img id="sub-icon" src={eventsImgSrc}
							onMouseEnter={() => setEventsImgSrc("/images/icons/events_ro.png")}
							onMouseLeave={() => setEventsImgSrc("/images/icons/events.png")}
							alt="Events" />
					</NavLink>
					<NavLink className="cart-navbar" exact="true" to="/cart">
						<img id="sub-icon"
							src={cartImgSrc}
							alt="Cart" />
						{/* <span className="cart-icon">{cartAmount}</span> */}
					</NavLink>
					{user ? (
						<div onClick={handleLogout} className="cursor-pointer flex flex-col justify-center items-center">
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
							<div className="">Log Out</div>
						</div>
					) : (
						<div onClick={() => navigate('/login')} className="cursor-pointer flex flex-col justify-center items-center">
							<i className="fa-solid fa-arrow-right-to-bracket"></i>
							<div className="">Log In</div>
						</div>
					)}
				</div>
			</div>
			<div className="all-line">
				<div className="orange-line"></div>
				<div className="red-line"></div>
				<div className="green-line"></div>
				<div className="blue-line"></div>
			</div>
		</div>
	);
}

export default Navigation;
