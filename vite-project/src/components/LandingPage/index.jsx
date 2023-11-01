import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer';
import { useSelector } from 'react-redux';

const LandingPage = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const dailySpecials = [
        'Sunday Special',
        'Monday Special',
        'Tuesday Special',
        'Wednesday Special',
        'Thursday Special',
        'Friday Special',
        'Saturday Special',
    ]

    const currentDate = new Date().getDay();
    const displaySpecials = (specials) => {
        return specials[currentDate]
    }

    return (
        <>
            <div className="landing-page" style={{ backgroundImage: 'url(https://i.imgur.com/VyZicmD.jpg)', height: '100vh' }}>
                <div className="landing-page-content">
                    <div className="orange-line-order">
                        <div className="red-line-order">
                            <div className="green-line-order">
                                <div className="start-order">
                                    <div className='daily-specials'>{displaySpecials(dailySpecials)}</div>
                                    {user ? (
                                        <button onClick={() => navigate("/menu")} className="landing-page-button">START ORDER</button>
                                    ): (
                                        <button onClick={() => navigate("/login")} className="landing-page-button">START HERE</button>
                                    )}
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
