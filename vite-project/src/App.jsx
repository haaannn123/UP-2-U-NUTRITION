import { useState, useEffect } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import OurStory from "./components/OurStory";
import Events from "./components/Events";
import YourStory from "./components/YourStory";
import { AddItem } from "./components/MenuPage/utility/forms/AddItem";
import { NavLink, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import "./App.css";
import { authenticate } from "./store/session";
import { useDispatch } from "react-redux";
import EditEvents from "./components/Events/editEvent";
import EditItem from "./components/MenuPage/utility/forms/EditItem";
import { AddEvent } from "./components/Events/addEvent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/menu/add-item" element={<AddItem />} />
        <Route path="/menu/:id/edit/" element={<EditItem />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/events/add-event" element={<AddEvent />} />
        <Route path="/events/edit/:id" element={<EditEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/your-story" element={<YourStory />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
