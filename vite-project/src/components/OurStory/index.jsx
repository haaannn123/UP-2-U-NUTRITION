import { athletes } from './utility/athletes'
import './OurStory.css'

const OurStory = () => {
    return (
        <>
      <div className="ourstory-page">
            
            <div className="ourstory-page-content">
                <div className="about-us-container">
                    <div className="flex flex-col">
                        <h1 id='ourstory-title'>ABOUT US</h1>
                        <div className="ourstory-body">Ex cillum deserunt irure deserunt qui magna nostrud id cillum proident fugiat cupidatat duis. Excepteur pariatur reprehenderit do commodo do eu proident voluptate consectetur. Lorem incididunt occaecat quis minim. Cupidatat adipisicing minim ut aliqua esse. Lorem magna eu cupidatat quis duis fugiat dolore do id ut.
                                Laborum eu culpa velit enim minim eiusmod dolore officia fugiat. Est laborum laborum labore laboris nostrud et mollit veniam. Magna adipisicing voluptate occaecat et dolore qui consequat. Occaecat voluptate do incididunt laboris. Ipsum labore minim ullamco sint laboris commodo voluptate tempor sunt aliqua. Ipsum commodo id anim eu officia cupidatat commodo tempor consequat magna. Cillum exercitation ullamco tempor enim do enim ut est non. Id cillum do occaecat id ad qui esse culpa et in nulla quis voluptate veniam. Enim aliquip nisi velit commodo est veniam sit elit consequat.</div>
                    </div>
                    <img id="owner-img" src="https://i.imgur.com/mfTz11d.png"></img>
                </div>
                    <div className="headers bg-titles-blue">SPONSORING</div>
                    <div className="sponsored-athletes-section">
                        <div className="sponsored-athletes">
                            {athletes.map((athlete, i) => {
                                return (
                                    <div className='athlete-container' key={`${athlete}-${i}`}>
                                        <div className='our-story-athlete-image-container'>
                                            <img src={athlete.image} alt='' />
                                        </div>
                                        {/* <div> */}
                                        <div className='our-story-athlete-name'>
                                            {athlete.name}
                                        </div>
                                        <div className='our-story-athlete-position'>
                                            {`Position: ${athlete.position}`}
                                        </div>
                                        <div className='our-story-athlete-favorite'>
                                            {`Favorite Drink: ${athlete.favorite_drink}`}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <img className="ourstory-page-bg-img" src='/images/BG_Our_Story.png' alt='' />
                </div>
            </div >
        </>
    )
}


export default OurStory
