import { useEffect, useState } from "react";
import { MenuNav } from "./menuNav";
import { BackCardItem, FrontCardItem } from "./utility/CardShape";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MenuPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItemThunk } from "../../store/menus";
import { addToCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import EditItem from "./utility/forms/EditItem";
import OpenModalButton from "../OpenModalButton";
import DeleteItem from "./utility/forms/DeleteItem";


const MenuPage = () => {
  const [category, setCategory] = useState('combos')
  const dispatch = useDispatch()
  const menu1 = Object.values(useSelector(state => state.menuReducer))
  const user = useSelector(state => state.session.user)
  const navigate = useNavigate()

  const handleAddToCart = (item, amount) => {
    dispatch(addToCart(item, amount))
  }

  const [flippedCardId, setFlippCardId] = useState(Infinity);

  const flipCard = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Used double equality to match string numbers against int
    if (flippedCardId == e.target.id) {
      setFlippCardId(Infinity);
    } else {
      setFlippCardId(e.target.id);
    }
  };

  useEffect(() => {
    dispatch(getAllMenuItemThunk());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const renderCarousel = () => {
    let menuSub = []
    menu1.map((item) => {
      if (item.category === 'combos'){
        menuSub.push(item)
      }
    })
    {menuSub.map((item, i) => {
      return (
        <div id={i} key={i} onClick={flipCard}>
          {flippedCardId == i ? (
            <BackCardItem item={item} i={i} />
          ) : (
            <FrontCardItem item={item} i={i} />
          )}
          <button onClick={() => handleAddToCart(item, 1)} className="green-btn add-to-cart-btn">ADD TO CART</button>
          {user !== null &&
            <OpenModalButton
              modalComponent={<EditItem menu_item={item} />}
              buttonText="Edit Item" />}
          {user !== null &&
            <OpenModalButton
              modalComponent={<DeleteItem menu_id={item.id} />}
              buttonText={<i className="fa-solid fa-eraser"></i>}
            />
          }
        </div>
      );
    })}
  }
  return (
    <div className="menu">
      <h1 className="font-bold text-6xl py-10">OUR MENU</h1>
      {user && <button onClick={() => navigate('/menu/add-item')}>Add Item</button>}
      <MenuNav setCategory={setCategory}/>
      <div className="menu-item-container p-6">
        <Carousel
          responsive={responsive}
          containerClass="w-full h-full"
          itemClass="carousel-item"
          swipeable={true}
        >
          {renderCarousel}
        </Carousel>
      </div>
    </div>
  );
};

export default MenuPage;
