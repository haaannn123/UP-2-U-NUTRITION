import { ContactUsModal } from "../OurStory/utility/contactUs";
import Map from "../util/GoogleMap";

import './Footer.css'


const Footer = () => {
    return (
        <div className="footer">
            <div className="red-line-border">
                <div className="green-line-border">
                    <div className="blue-line-border">
                        <div className="footer-container p-5 flex flex-col items-center gap-3">
                            <div className="flex w-full">
                                <div className="information-container w-1/3 p-1 flex flex-col items-center">
                                    <img className="w-20 h-20" src="../images/logo.png" />
                                    <h1 className="text-center text-3xl">Address</h1>
                                    <h2>1517 NW 23rd Ave, Gainesville, FL 32605</h2>
                                    <h1 className="text-3xl">Follow and Support</h1>
                                    <div className="flex gap-2 social-media-logos">
                                        <a href='https://www.facebook.com/up2unutrition.gainesville' target="_blank" rel="noreferrer">
                                            <img
                                                className="social-media-images"
                                                src="./images/icons-social-media/FACEBOOK.png"
                                            />
                                        </a>
                                        <a href="https://www.instagram.com/up2unutrition.gainesville" target="_blank" rel="noreferrer">
                                            <img
                                                className="social-media-images"
                                                src="./images/icons-social-media/INSTAGRAM.png"
                                            />
                                        </a>
                                        <a href="https://www.tiktok.com/@up2unutrition.gnv" target="_blank" rel="noreferrer">
                                            <img
                                                className="social-media-images"
                                                src="./images/icons-social-media/TIKTOK.png"
                                            />
                                        </a>
                                        <a href="https://www.snapchat.com/add/up2unutrition" target="_blank" rel="noreferrer">
                                            <img
                                                className="social-media-images"
                                                src="./images/icons-social-media/SNAPCHAT.png"
                                            />
                                        </a>
                                        <a href="https://cash.app/$Up2UNutrition" target="_blank" rel="noreferrer">
                                            <img
                                                className="social-media-images"
                                                src="./images/icons-social-media/CASHAPP.png"
                                            />
                                        </a>
                                        <a href="https://www.venmo.com/u/up2unutrition-gainesville" target="_blank" rel="noreferrer">
                                            <img
                                                className="social-media-images"
                                                src="./images/icons-social-media/VENMO.png"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="business-hours-containter w-1/3 p-1 flex flex-col items-center">
                                    <h1 className="text-center text-3xl">Business Hours </h1>
                                    <div className="flex gap-6">
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-right">Monday</h2>
                                            <h2 className="text-right">Tuesday</h2>
                                            <h2 className="text-right">Wednesday</h2>
                                            <h2 className="text-right">Friday </h2>
                                            <h2 className="text-right">Saturday</h2>
                                            <h2 className="text-right">Sunday</h2>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-left bolded-hours">7:30AM - 8PM</h2>
                                            <h2 className="text-left bolded-hours">7:30AM - 8PM</h2>
                                            <h2 className="text-left bolded-hours">7:30AM - 8PM</h2>
                                            <h2 className="text-left bolded-hours">7:30AM - 8PM</h2>
                                            <h2 className="text-left bolded-hours">9:00AM - 3PM</h2>
                                            <h2 className="text-left bolded-hours">9:00AM - 3PM</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/3 p-1 flex flex-col items-center">
                                    <h1 className="text-center text-3xl">Contact Us</h1>
                                    <ContactUsModal />
                                </div>
                            </div>
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
