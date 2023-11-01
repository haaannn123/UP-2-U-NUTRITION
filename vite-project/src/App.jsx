import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import OurStory from "./components/OurStory";
import Events from "./components/Events";
import YourStory from "./components/YourStory";
import { AddItem } from "./components/MenuPage/utility/forms/AddItem";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import "./App.css";
import { authenticate } from "./store/session";
import { useDispatch } from "react-redux";
import EditEvents from "./components/Events/editEvent";
import LoginFormPage from "./components/LoginFormPage";
import EditItem from "./components/MenuPage/utility/forms/EditItem";
import { AddEvent } from "./components/Events/addEvent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const RedirectYourStory = ({ url, splashPageUrl }) => {
    useEffect(() => {
      const redirect = () => {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.click();

        setTimeout(() => {
          window.location.href = splashPageUrl;
        }, 2000)
      };

      const timeout = setTimeout(redirect, 1000)

      return () => clearTimeout(timeout)
    }, [url, splashPageUrl]);

    return <div className="redirecting">Redirecting...</div>;
  }

  const externalUrl = 'https://form.jotform.com/231567063516052';

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu/add-item" element={<AddItem />} />
        <Route path="/menu/:id/edit/" element={<EditItem />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/events/add-event" element={<AddEvent />} />
        <Route path="/events/edit/:id" element={<EditEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/your-story" element={<RedirectYourStory url={externalUrl} splashPageUrl='/' />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/login' element={<LoginFormPage />} />
      </Routes>
    </>
  );
}

export default App;
