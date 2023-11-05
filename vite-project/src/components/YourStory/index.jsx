import { useEffect } from "react";



const YourStory = ({ url }) => {

    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return <h5>Redirecting...</h5>;

}


export default YourStory
