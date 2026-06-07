import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Navbar from './Navbar';
import image1 from '../Assests/Images/Untitled (10).png';
import { Oval } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Home() {
    const [recommendations, setRecommendations] = useState([]);
    const [costRange, setCostRange] = useState([0, 100]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    useEffect(() => {
        if (!email) {
            navigate('/'); // Redirect to login page if email is not present
        }
    }, [email, navigate]);
    const handleSliderChange = (value) => {
        setCostRange(value);
    };

    const handleGetRecommendations = async () => {
        const cuisines = document.getElementById('cuisines').value;
        const minCost = costRange[0];
        const maxCost = costRange[1];
        const city = document.getElementById('city').value;

        setLoading(true);

        try {
            const response = await axios.post('/recommend', {
                cuisines,
                min_cost: minCost,
                max_cost: maxCost,
                city,
                email: email
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data;
            const links = data.split('\n');
            links.splice(-1, 1);
            setRecommendations(links);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className='Main'>
            <Navbar content="Logout" to="/" />
            <div className='homeCon1'>
                <img src={image1} alt='' className='homeImage1'/>
                <div className="homeOverlay">
                    <div className='homeInsideCon'>
                    <div className="homeCon2">
                    {loading && (
                        <div className="loadingQuote">
                            <p>Searching for the best restaurants...</p>
                            <p>Food tastes better when you're waiting for it!</p>
                            {loading && <Oval color="#960000" height={50} width={50} />}
                        </div>
                    )}
                    {!loading && recommendations.length === 0 && (
                        <>
                        <div className="con22">"Customize your experience, your way!" </div>
                        <div className="con23">
                            <div htmlFor="cuisines">Cuisines:</div>
                            <input type="text" id="cuisines" placeholder='Enter Cuisine Type' className='homeInput'/>
                        </div>
                        
                        <div className="con25">
                            <div htmlFor="city">Location:</div>
                            <input type="text" id="city" placeholder='Enter Location' className='homeInput'/>
                        </div>
                        <div className="con24">
                            <div className="con241" htmlFor="cost">Cost Range:</div>
                            <div className="con242">
                            <Slider
                                min={0}
                                max={3000}
                                value={costRange}
                                onChange={handleSliderChange}
                                range
                                step={1}
                                allowCross={false}
                                trackStyle={[{ backgroundColor: '#960000' }]}
                                handleStyle={[{ backgroundColor: '#960000', borderColor: 'black' }, { backgroundColor: '#960000', borderColor: 'black' }]}
                                railStyle={{ backgroundColor: 'black' }}
                                />
                            </div>
                            <div className="con243">
                                <div>Min Cost: Rs. {costRange[0]}</div>  
                            </div>
                            <div className="con244">
                                <div>Max Cost: Rs. {costRange[1]}</div>
                            </div>
                        </div>
                        <div className="con26">
                            <button className='homeButton' onClick={handleGetRecommendations}>
                                Get Recommendations
                            </button>
                        </div>
                        </>
                    )}
                    {!loading && recommendations.length > 0 && (
                        <div className="con27">
                            {recommendations.map((link, index) => (
                                <div key={index}>
                                    {index === 0 ? (
                                        <div className='homeMain'> Recommended restaurant reel links for <div className='notification1'>{email}</div></div>
                                    ) : (
                                        <a href={link} target="_blank" rel="noopener noreferrer">{index + 0}. {link}</a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
