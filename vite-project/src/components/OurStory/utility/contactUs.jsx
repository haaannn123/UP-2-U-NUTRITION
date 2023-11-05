import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

// import ReactWhatsapp from "react-whatsapp";

import './contactUs.css'

export const ContactUsModal = () => {
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [description, setDescription] = useState('');
    const [isValid, setIsValid] = useState(true);

    const [state, handleSubmit] = useForm('mknlylwj')

    // const [numberEmptyError, setNumberEmptyError] = useState(false);
    // const [messageEmptyError, setMessageEmptyError] = useState(false);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^[0-9]{10}$/;

    // const onChange = (e) => {
    //     e.preventDefault();
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    if (state.succeeded) {
        window.alert('Message sent!')
    }

    const handleEmailOrPhone = (e) => {
        const value = e.target.value;
        setEmailOrPhone(value);
        validateEmailOrPhone(value);
    }

    const validateEmailOrPhone = (inputValue) => {
        if (emailRegex.test(inputValue) || phoneRegex.test(inputValue)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(emailOrPhone)
        if (phoneRegex.test(emailOrPhone)) {

            let number = emailOrPhone.replace(/[^\w\s]/gi, "").replace(/ /g, "");

            let url = `https://web.whatsapp.com/send?phone=1${number}`;

            url += `&text=${encodeURI(description)}&app_absent=0`;

            console.log(url)

            window.open(url)
        }
    };

    return (
        <form className="contact-us-form flex flex-col gap-2 h-full contact-us-width" onSubmit={handleSubmit}>
            {/* <ReactWhatsapp number='1-323-449-8300' message='test!!!' /> */}
            <input
                className="bg-white h-9"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
            />
            <input
                className="bg-white h-9"
                type="text"
                placeholder="Email or Phone"
                value={emailOrPhone}
                onChange={handleEmailOrPhone}
                name="email or phone"
                required
            />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            {isValid ? null : <div style={{ color: 'red' }}>Invalid Input</div>}
            <textarea
                className="bg-white h-full"
                type="text"
                placeholder="Message"
                value={description}
                name="message"
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}
            >Send</button>
        </form>
    )
}
