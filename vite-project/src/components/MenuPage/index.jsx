import { useEffect, useState } from "react";
import { MenuNav } from "./menuNav";
import { supahShakes } from "./utility/menu/supah-shakes";
import OpenModalButton from "../OpenModalButton/index";
import { AddItem } from "./utility/forms/AddItem";
import { EditItem } from "./utility/forms/EditItem";
import { BackCardItem, FrontCardItem, EmptyCardItem } from "./utility/CardShape";
import { menuCategories } from "./utility/menu/menu-categories";
import { combinedMenu } from "./utility/menu/combined-menu";

import "./MenuPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItemThunk } from "../../store/menus";

const MenuPage = () => {
  const dispatch = useDispatch()
  const menu1 = useSelector(state => state.menuReducer)
  const currentMenuCategory = Object.values(menu1)
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(getAllMenuItemThunk())
  }, [dispatch])

  // if (!menu_arr.length) return null

  // console.log("this is menu =====", menu_arr)
  //Variable to hold which card should be flipped.
  //useState will make sure the page is rerendered everytime the variable changes.
  const [flippedCardId, setFlippCardId] = useState(Infinity);
  // const [currentMenuCategory, setCurrentMenuCategory] = useState(supahShakes);
  const [startPosition, setStartPosition] = useState(0);

  //place holder for check on user
  // const user = null
  const nameOfLastCategory = menuCategories[menuCategories.length - 1];
  const lengthOfLastCategory = combinedMenu[nameOfLastCategory].length;

  const itemsPerPage = 4;
  let difference = currentMenuCategory.length - itemsPerPage;
  const maxScrollPosition = Math.max(0, difference);
  let idx = menuCategories.indexOf(currentMenuCategory[0]?.category)
  let prevCategory = menuCategories[idx - 1];
  let nextCategory = menuCategories[idx + 1];

  const handleScrollLeft = () => {
    if (startPosition === 0 && currentMenuCategory[0]?.category !== menuCategories[0]) {
      setCurrentMenuCategory(combinedMenu[prevCategory])
    }
    if (startPosition > 0) setStartPosition(startPosition - itemsPerPage);
    console.log(startPosition, maxScrollPosition)

    setFlippCardId(Infinity);
  };

  const handleScrollRight = () => {
    if (startPosition < maxScrollPosition) setStartPosition(startPosition + itemsPerPage)
    else (
      setCurrentMenuCategory(combinedMenu[nextCategory])
    )
    setFlippCardId(Infinity);
    console.log(startPosition, maxScrollPosition)
  };

  const setCategory = (cat) => {
    setCurrentMenuCategory(cat)
    setStartPosition(0);
    setFlippCardId(Infinity);
  }

  //function to flip the card when clicked
  const flipCard = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    //used double equality to match string numbers against int
    if (flippedCardId == e.target.id) {
      setFlippCardId(Infinity);
    } else {
      setFlippCardId(e.target.id);
      console.log(flippedCardId, e.target.id)
    }
  };

  return (
    <div className="menu">
      <div className="headers">OUR MENU</div>
      <MenuNav changeCat={setCategory} />
      {user !== null && <OpenModalButton modalComponent={AddItem} buttonText="Add Item" />}
      <div className="menu-item-container">
        <button
          className={startPosition === 0 && currentMenuCategory[0]?.category === menuCategories[0] ? "menu-prev-next-btn-deactivated" : "menu-prev-next-btn"}
          onClick={handleScrollLeft}
          disabled={startPosition === 0 && currentMenuCategory[0]?.category === menuCategories[0]}
        >
          {'<'}
        </button>
        {currentMenuCategory && currentMenuCategory
          .slice(startPosition, startPosition + itemsPerPage)
          .map((item, i) => {
            return (
              <div id={i} key={i}>
                <div id={i} onClick={flipCard}>
                  {/* Condally render the front or the back */}
                  {flippedCardId == i
                    ? <BackCardItem item={item} i={i} />
                    : <FrontCardItem item={item} i={i} />
                  }
                </div>
                <button className="add-to-cart-btn">ADD TO CART</button>
                {user !== null && <OpenModalButton modalComponent={EditItem} buttonText="Edit Item" />}
              </div>
            );
          })}
        <button
          className="menu-prev-next-btn"
          onClick={handleScrollRight}>
          {'>'}
        </button>
      </div>
    </div >
  );
};

export default MenuPage;
