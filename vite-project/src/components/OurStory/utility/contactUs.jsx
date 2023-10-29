import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";


export const ContactUsModal = () => {
    const [name, setName] = useState('');
    const [emailOrPhone, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isValid, setIsValid] = useState(true);

    const [state, handleSubmit] = useForm('mknlylwj')
    if (state.succeeded){
        window.alert('Message sent!')
    }

    // const validateEmailOrPhone = (inputValue) => {
    //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //     const phoneRegex = /^[0-9]{10}$/;

    //     if (emailRegex.test(inputValue) || phoneRegex.test(inputValue)) {
    //         setIsValid(true);
    //     } else {
    //         setIsValid(false);
    //     }
    // }

    return (
        <form className="contact-us-form flex flex-col gap-2 h-full" onSubmit={handleSubmit}>
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
                placeholder="Email"
                value={emailOrPhone}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
            />
            <ValidationError 
                prefix="Email"
                field="email"
                errors={state.errors}
            />
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
            <button type="submit" disabled={state.submitting}>Send</button>
        </form>    
    )
}
