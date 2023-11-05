import { useState } from "react"

export const RequestEventModal = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [description, setDescription] = useState('');

    const [isValid, setIsValid] = useState(true);

    const handleEmailOrPhone = (e) => {
        const value = e.target.value;
        setEmailOrPhone(value);
        validateEmailOrPhone(value);
    }

    const validateEmailOrPhone = (inputValue) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegex = /^[0-9]{10}$/;

        if (emailRegex.test(inputValue) || phoneRegex.test(inputValue)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            console.log("Input is Valid: ", emailOrPhone)
        } else {
            console.log("Input is not Valid: ", emailOrPhone)
        }
    }

    return (
        <div className="w-full max-w-3xl m-auto">
            <div className='event-bar event-green-bar w-full'></div>
            <div className='headers form-titles p-3'>REQUEST EVENT</div>
            <div className="divider"></div>
            <div className="request-event-form-btn w-full flex flex-col p-8">
                <form className="pt-8 flex flex-col space-y-10 " onSubmit={handleSubmit}>
                    <div className="form-start-and-end flex flex-col space-y-10 ">
                        <div className="flex space-x-3 place-content-center">
                            <label htmlFor="item-start
                            "
                            className="p-3"
                            >Start:</label>
                            <input
                                className="bg-gray-100 rounded text-center h-10 txt-lg p-4"
                                id="item-start"
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex space-x-3 place-content-center">
                            <label htmlFor="item-end"
                            className="p-3"
                            >End:</label>
                            <input
                                className="bg-gray-100 rounded text-center h-10 txt-lg p-4"
                                id="item-end"
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {isValid ? null : <div style={{ color: 'red' }}>Invalid Input</div>}

                    <div className="flex space-y-4 w-5/6 m-auto flex-col place-content-center">
                        <label htmlFor="item-description"
                        className="pt-3 pl-1">Description:</label>
                        <textarea
                            className="bg-gray-100 rounded  h-100 txt-lg resize-none p-3"
                            id="item-description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex space-x-3 pt-7 place-content-center">
                        <label htmlFor="item-email-phone"
                        className="p-3"
                        >Email/Phone:</label>
                        <input
                            className="bg-gray-100 rounded text-center h-10 txt-lg p-4"
                            id="item-email-phone"
                            type="text"
                            value={emailOrPhone}
                            onChange={handleEmailOrPhone}
                            required
                        />
                    </div>
                <div className="request-event-btn-container">
                    <button className="green-btn request-event-btn" type="submit">Submit</button>
                </div>
                </form>
            </div>
        </div >
    )
}
