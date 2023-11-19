import { useEffect, useState, useRef } from "react";
import { MenuNav } from "./menuNav";
import { BackCardItem, FrontCardItem } from "./utility/CardShape";
import { useModal } from "../../context/Modal";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MenuPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItemThunk } from "../../store/menus";
import { addToCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditItem from "./utility/forms/EditItem";
import DeleteItem from "./utility/forms/DeleteItem";




const AddToCartButton = ({ item, price, checkedAddons }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleAddToCart = (item, quantity) => {
    item.price = parseFloat(price.toFixed(2));
    const itemWithAddons = { ...item, addons: checkedAddons };
    dispatch(addToCart(itemWithAddons, quantity));
    closeModal();



  };
  return (
    <button onClick={() => handleAddToCart(item, 1)} className="w-full p-1 green-btn">Add to cart</button>
  );
};

const CancelOrderButton = () => {
  const { closeModal } = useModal();
  return (
    <button onClick={() => closeModal()} className="w-full p-1 red-btn">Cancel</button>
  );
};

const OrderDetails = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isAddOnsOpen, setIsAddOnsOpen] = useState(false);
  const [addons, setAddons] = useState();
  const [price, setPrice] = useState(parseFloat(item.price));
  const [quantity, setQuantity] = useState(1);
  const [checkedAddons, setCheckedAddons] = useState([]);


  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };


  const toggleAddOns = () => {
    setIsAddOnsOpen(!isAddOnsOpen)
  }

  const handleCheckboxChange = (event, addon) => {
    event.stopPropagation()
    const { checked } = event.target;
    const addonPrice = parseFloat(addon.price);
    const updatedPrice = checked
      ? parseFloat(price) + addonPrice
      : parseFloat(price) - parseFloat(addonPrice);
    setPrice(updatedPrice);
    if (checked) {
      setCheckedAddons([...checkedAddons, addon]);
    } else {
      const updatedAddons = checkedAddons.filter((a) => a !== addon);
      setCheckedAddons(updatedAddons);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      setPrice(item.price * newQuantity)
    }
  };

  useEffect(() => {
    import("../../../../team_15_csv_parser/data/add-ons.json")
      .then((module) => {
        setAddons(module.default);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div className="flex flex-col p-3">
      <div className="flex justify-between border-b-2">
        <div className="p-3">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <div className="flex">
            <h4 className="">${parseFloat(price)?.toFixed(2)}</h4>
            <h4>
              {item.nutritions.calories
                ? ` | ${item.nutritions.calories}`
                : null}
            </h4>

          </div>
        </div>
        <div className="flex flex-col justify-center p-3 w-50">
          <h4>Quantity:</h4>
          <div className="flex items-center border-4">
            <button
              onClick={() => { handleQuantityChange(quantity - 1) }}
              className="px-2 rounded-l-lg text-center"
              disabled={quantity === 1}
            >-</button>
            <input
              className="w-4 " type="text" value={quantity} onChange={(e) => {
                handleQuantityChange(quantity - 1)
              }} />
            <button onClick={() => {
              handleQuantityChange(quantity + 1)
            }} className="px-2rounded-r-lg text-center">+</button>

          </div>
        </div>
      </div>
      <div>
        <div className="description-container p-3" >
          <div className='flex justify-between'>
            <h2 className="text-2xl">Ingredients</h2>
            <button className="show-more-button" onClick={toggle}>
              {isOpen ? (
                <>
                  <i className="fa-solid fa-angle-up"></i>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-angle-down"></i>
                </>
              )}
            </button>
          </div>
          <div className="gap-3 break-normal">
            {item.ingredients.map((ingredients, i) => {
              return (
                <p className={`ingredients-description ${isOpen ? "expanded" : ""}`} key={i}>{ingredients.ingredient_name}</p>
              )
            })}
          </div>
        </div>
        <div className="description-container p-3" >
          <div className='flex justify-between'>
            <h2 className="text-2xl">Nutrition</h2>
            <button className="show-more-button" onClick={toggle1}>
              {isOpen1 ? (
                <>
                  <i className="fa-solid fa-angle-up"></i>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-angle-down"></i>
                </>
              )}
            </button>
          </div>
          <div className="">
            {item.nutritions.map((nutrient, i) => {
              return (
                <div className={`ingredients-description ${isOpen1 ? "expanded" : ""} flex justify-between`} key={i}>
                  <p>{nutrient.nutrient}</p>
                  <p>{nutrient.weight}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="p-3 ">
          <div className='flex justify-between'>
            <h2 className="text-2xl">Add-ons</h2>
            <button className="show-more-button" onClick={toggleAddOns}>
              {isAddOnsOpen ? (
                <>
                  <i className="fa-solid fa-angle-up"></i>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-angle-down"></i>
                </>
              )}
            </button>
          </div>
          <div>
            {addons ? addons["add-ons"].map((addon, i) => {
              return (
                <div className={`ingredients-description ${isAddOnsOpen ? "expanded" : ""}`} key={i}>
                  <form className="p-2">
                    <div className="flex gap-1 items-center">
                      <input
                        className=""
                        type="checkbox"
                        name={addon.addon_name}
                        value={addon["add-ons"]}
                        onChange={(e) => handleCheckboxChange(e, addon)}
                      />
                      <label className="" htmlFor={addon.addon_name}>
                        {addon["name"]} |
                      </label>
                      <span className="">${addon.price} |</span>
                      <p>{addon["nutritional-facts"]}</p>
                    </div>
                  </form>
                </div>
              );
            })
              : null}
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-3">
        <CancelOrderButton />
        <AddToCartButton
          item={item}
          price={parseFloat(price)}
          checkedAddons={checkedAddons}
        />
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [category, setCategory] = useState("combos");
  const dispatch = useDispatch();
  const menu1 = Object.values(useSelector((state) => state.menuReducer));
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [carouselDisabled, setCarouselDisabled] = useState(false);
  const [flippedCardId, setFlippCardId] = useState(null);
  const [cardWidth, setCardWidth] = useState("100%");
  const [menuData, setMenuData] = useState(menu1)

  const cardContainerRef = useRef(null);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(menu1);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the reordered items
    setMenu1(items);
  };

  const handleViewAllClick = () => {
    setCarouselDisabled(!carouselDisabled);
    setCardWidth(carouselDisabled ? "100%" : "50%");
  };

  const flipCard = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Check if the click occurred on the card element or its children
    let target = e.target;
    while (target && target !== cardContainerRef.current) {
      if (target.classList.contains("each-card")) {
        // Click occurred on the card, so flip it
        if (flippedCardId == target.id) {
          setFlippCardId(null);
        } else {
          setFlippCardId(target.id);
        }
        return;
      }
      target = target.parentElement;
    }
  };
  useEffect(() => {
    dispatch(getAllMenuItemThunk());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardContainerRef.current &&
        !cardContainerRef.current.contains(event.target)
      ) {
        // Click occurred outside of the card container
        setFlippCardId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderCarousel = () => {
    let menuSubset = [];

    menu1.forEach((item) => {
      if (category === item.category) {
        menuSubset.push(item);
      }
    });
    return menuSubset.map((item, i) => {
      return (
        <div className="outside-each-card" key={i}>
          <div
            className="each-card"
            id={i}
            key={i}
            ref={cardContainerRef}
            onClick={flipCard}
          >
            {flippedCardId == i ? (
              <BackCardItem item={item} i={i} />
            ) : (
              <FrontCardItem item={item} i={i} />
            )}
          </div>
          {user?.admin ? (
            <div className="flex justify-center gap-2">
              <OpenModalButton
                modalComponent={<EditItem menu_item={item} />}
                buttonText={
                  <button className="green-btn add-to-cart-btn">
                    EDIT ITEM
                  </button>
                }
              />
              <OpenModalButton
                modalComponent={<DeleteItem menu_id={item.id} />}
                buttonText={
                  <button className="red-btn add-to-cart-btn">DELETE</button>
                }
              />
            </div>
          ) : (
            <div>
              {user ? (<OpenModalButton
                className="green-btn add-to-cart-btn mb-3"
                modalComponent={<OrderDetails item={item} />}
                buttonText="Add to Cart"
              // onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
              // onModalClose,  // optional: callback function that will be called once the modal is closed
              // className,
              // id,
              // style
              />) : (<button onClick={() => navigate('/login')} className="green-btn add-to-cart-btn mb-3">Login to Order</button>)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="menu">
      <h1 className="text-6xl font-bold our-menu">OUR MENU</h1>
      {user?.admin ? (
        <div>
          <button
            className="blue-btn add-to-cart-btn"
            onClick={() => navigate("/menu/add-item")}
          >
            ADD ITEM
          </button>
        </div>
      ) : null}
      <MenuNav setCategory={setCategory} />
      <div className="">
        <button
          onClick={handleViewAllClick}
          className="blue-btn add-to-cart-btn handle-view"
        >
          {carouselDisabled ? "Group View" : "View All"}
        </button>
      </div>

      <div
        className={`menu-item-container ${carouselDisabled ? "group-view carousel-item2" : ""
          }`}
      >
        {carouselDisabled ? (
          renderCarousel()
        ) : (
          <Carousel
            responsive={responsive}
            containerClass="w-full h-full"
            itemClass="carousel-item"
            swipeable={true}
            showDots={false}
          >
            {renderCarousel()}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
