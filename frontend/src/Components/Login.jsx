import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import {useNavigate, Link} from 'react-router-dom';
import image1 from '../Assests/Images/Food1.jpeg';
import image2 from '../Assests/Images/Foodie Finds1.jpg';
import image3 from '../Assests/Images/Cutlery1.jpeg';
import Navbar from './Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const currentYear = new Date().getFullYear();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', {
        username,
        password,
      });

      console.log('Login successful:', response.data);
      
      navigate('/home', { state: { email: response.data.email } });
      
    } catch (error) {
      alert('Access Denied')
      console.error('Login error:', error.response.data);
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8081/feedback', {
            name,
            email,
            feedback: feedbackText,
        });

        console.log('Feedback submitted successfully:', response.data);
        alert('Feedback submitted successfully');
            // Optionally, you can reset the form fields here
            setName('');
            setEmail('');
            setFeedbackText('');
    } catch (error) {
        console.error('Error submitting feedback:', error.response.data);
        alert('Failed to submit feedback');
    }
};

  return (
    <div>
      <Navbar content="Sign Up" to="/register"/>
      <div className="con1">
        <img src={image1} className="image1" alt="" />
        <div className="overlay"/>
        <div className='insideContainer'>
          <div className='loginText'>"From Street Eats to Fine Treats"</div>
          <div className="con2">
            <div className="con3">
              <div className="div1">
              <img src={image2} className="image2" alt="" />
              </div>
              <div className="div2">
                <p className='user'>Username</p>
                <input type="text" className="username" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <p className='pass'>Password</p>
                <input type="password" className="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="div3">
              <p className='alReg'>Not registered?<Link to="/Register" className='vv'>Sign Up</Link> </p>
                <button className="login" onClick={handleSubmit}>Login</button>
              </div>
            </div>
          </div> 
        
        </div>
      </div>
      <div className='banner1'>
        <div className='overlay1'>
          <div className='insideContainer1'>
            <div className='about'>
              <div className='about1'>About Us</div>
              <div className='about2'>Foodie-Finds is your guide to tailored local dining experiences through the captivating lens of food bloggers. 
              In an era shaped by social media, we harness the abundance of food content on platforms like Instagram and YouTube to explore the essence of regional eating. 
              Our mission is to uncover hidden culinary gems, sharing their stories, traditions, and the people behind each dish. We empower culinary content creators and users alike to contribute to the growth of local food scenes, fostering transparency and trustworthiness. 
              Whether you're a seasoned foodie or an adventurous eater, join us in celebrating the joy of culinary discovery and the thrill of new experiences at Foodie-Finds.</div>
            </div>
          </div>
        </div> 
      </div>
      <div className='banner2'>
        <div className='un'>
        <img src={image3} alt='' className='feedImage'/>
        </div>
        <div className='feedOverlay'>
        <div className='ban2InsideContainer'>
              <div className='feedback'>
                <div className='f1'>Your feedback is the seasoning that enhances our flavor of service!</div>
                <form onSubmit={handleFeedback} className='form'>
                <div className='f2'>
                  <div>Name</div>
                  <input placeholder='Enter your name' type='text' className='feedInput' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='f3'>
                <div>Email</div>
                  <input placeholder='Enter your email' type='email' className='feedInput' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='f4'>
                  <div>Feedback</div>
                  <textarea className="feedInput1" type="text" placeholder="Tell us your Thoughts" rows="10" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}></textarea>
                </div>
                <div className='f5'>
                <button className="feedButton" >Post Comment</button>
                </div>
                </form>
              </div>
              <div className='contactUs'>
                <div className='email'>Contact Us: <a href='mailto:Foodiefinds05@gmail.com' className='href'>Foodiefinds05@gmail.com</a></div>
              </div>
              <div className='copyright'>
                <div className='copy'>Copyright © {currentYear} reCAPTCHA Privacy - Terms </div>
              </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;