import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer';
import { useSelector } from 'react-redux';

const LandingPage = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const dailySpecials = [
        'Give Back Weekend: Come Saturday & Sunday, and with the minimum purchase of $7 get an entry for our raffle. If you bring a new friend that orders, get an extra entry.',
        'Brew-tiful Monday: $1 off in any of our coffees.',
        'Turn-Up Tuesday: Get a special gift with your purchase.',
        'Win it Wednesday: $2 off in our waffles & waffle combos.',
        'ThirsTea Thursday: Buy One Get One ½ off in any of our teas (SpecialTeas & InsaniTeas).',
        'Freaky Friday: Double punch day for loyalty card holders.',
        'Give Back Weekend: Come Saturday & Sunday, and with the minimum purchase of $7 get an entry for our raffle. If you bring a new friend that orders, get an extra entry.',
    ]

    const currentDate = new Date().getDay();
    const displaySpecials = (specials) => {
        return specials[currentDate]
    }

    return (
        <>
            <div className="landing-page w-full" style={{ backgroundImage: 'url(https://i.imgur.com/VyZicmD.jpg)', height: '100vh', width: '100%' }}>
                <div className="landing-page-content">
                    <div className="orange-line-order">
                        <div className="red-line-order">
                            <div className="green-line-order">
                                <div className="start-order">
                                    <h1 className="font-bold text-3xl mt-1">YOUR HOME AWAY FROM HOME</h1>
                                    {user ? (
                                        <button onClick={() => navigate("/menu")} className="landing-page-button">START ORDER</button>
                                    ) : (
                                        <button onClick={() => navigate("/login")} className="landing-page-button">START HERE</button>
                                    )}
                                    <h4 className="text-align text-center mt-3 specials-text">{displaySpecials(dailySpecials)}
                                        <br />
                                        **Specials not applied online**</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}



export default LandingPage
