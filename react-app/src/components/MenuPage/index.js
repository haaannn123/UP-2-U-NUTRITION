import { useState } from "react";

import { MenuNav } from "./menuNav";



import { supahShakes } from "./utility/menu/supah-shakes";
import { BackCardItem, FrontCardItem } from "./utility/card-shape";
import "./MenuPage.css";

const MenuPage = () => {
  //Variable to hold which card should be flipped.
  //useState will make sure the page is rerendered everytime the variable changes.
  const [flippedCardId, setFlippCardId] = useState(Infinity);
  const [currentMenuCatagory, setCurrentMenuCatagory] = useState(supahShakes)

  const setCatagory = (cat) => {
    setCurrentMenuCatagory(cat)
    console.log(cat)
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
    }
  };

  return (
    <div className="menu">
      <div className="headers">OUR MENU</div>
      <MenuNav changeCat={setCatagory} />
      <div className="menu-item-container">
        {currentMenuCatagory.map((item, i) => {
          return (
            <div id={i} key={i}>
              <div id={i} onClick={flipCard}>
                {/* Conditionally render the front or the back */}
                {flippedCardId == i
                  ? BackCardItem(item, i)
                  : FrontCardItem(item, i)}
              </div>
              <button>Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;
