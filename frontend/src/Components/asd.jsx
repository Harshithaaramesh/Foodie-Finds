// import React, { useState } from 'react';
// import axios from 'axios';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { useNavigate } from 'react-router-dom';

// function Asd() {
//     const navigate = useNavigate();
//     const [recommendations, setRecommendations] = useState([]);
//     const [costRange, setCostRange] = useState([0, 100]);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleSliderChange = (value) => {
//         setCostRange(value);
//     };

//     const handleGetRecommendations = async () => {
//         const cuisines = document.getElementById('cuisines').value;
//         const minCost = costRange[0];
//         const maxCost = costRange[1];
//         const city = document.getElementById('city').value;

//         try {
//             const response = await axios.post('/recommend', {
//                 cuisines,
//                 min_cost: minCost,
//                 max_cost: maxCost,
//                 city
//             });
//             if (response.status !== 200) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = response.data;
//             setRecommendations(data);

//             const links = data.split('\n');
//             const linkElements = links.map(link => <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>);

//             document.getElementById('recommendations').innerHTML = linkElements;
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className='Banner1'>
//             <div className='overlay'>
//                 <div className='Container'>
//                     <div className='InsideContainer2'>
//                         <div className='con1'>
//                             <label htmlFor="cuisines">Cuisines:</label>
//                             <input type="text" id="cuisines" />
//                         </div>
//                         <div className='con2'>
//                             <label htmlFor="cost">Cost Range:</label>
//                         </div>
//                         <div className='con3'>
//                             <div className='slider'>
//                                 <Slider
//                                     min={0}
//                                     max={1000}
//                                     value={costRange}
//                                     onChange={handleSliderChange}
//                                     range
//                                     step={1}
//                                     allowCross={false}
//                                     trackStyle={[{ backgroundColor: 'black' }]}
//                                     handleStyle={[{ backgroundColor: 'black', borderColor: 'pink' }, { backgroundColor: '#ff7e29', borderColor: '#ff7e29' }]}
//                                     railStyle={{ backgroundColor: 'black' }}
//                                 />
//                             </div>
//                         </div>
//                         <div className='con4'>
//                             <div>Min Cost: {costRange[0]}</div>
//                             <div>Max Cost: {costRange[1]}</div>
//                         </div>
//                         <div className='con5'>
//                             <label htmlFor="city">City:</label>
//                             <input type="text" id="city" />
//                         </div>
//                         <div className='con6'>
//                             <button onClick={handleGetRecommendations}>Get Recommendations</button>
//                         </div>
//                         <div className='con7'>
//                             <div id="recommendations"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Asd;
