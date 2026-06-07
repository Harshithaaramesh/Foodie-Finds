import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Image1 from '../Assests/Images/Phone1.jpg';
import Image2 from '../Assests/Images/Foodie Finds1.jpg';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/register', formData);
            console.log(response.data);
            alert('Registration Successful!')
            navigate('/');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='rcon'>
            <div className='rInCo'>
                <img src={Image1} alt='' className='rimage' />
                <div className='roverlay'>
                    <div className='con2'>
                        <div className="con3">
                            <div className="div1">
                                <img src={Image2} className="image2" alt="" />
                            </div>
                            <form onSubmit={handleSubmit} className='rdiv2'>
                                <div className='rdivIn1'>
                                    <p className='user'>Username</p>
                                    <input type="text" name="username" className="username" placeholder='Enter your username' value={formData.username} onChange={handleChange} required />
                                    <p className='user'>Email</p>
                                    <input type="email" name="email" className="username" placeholder='Enter your email' value={formData.email} onChange={handleChange} required />
                                    <p className='pass'>Password</p>
                                    <input type="password" name="password" className="password" placeholder='Enter your password' value={formData.password} onChange={handleChange} required />
                                </div>
                                <div className='rdivIn2'>
                                    <p className='alReg'>Already registered?<Link to="/" className='vv'>Login</Link> </p>
                                    <button type="submit" className="login">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;


// <form onSubmit={handleSubmit}>
//                 <label>Username:</label>
//                 <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//                 <br />
//                 <label>Password:</label>
//                 <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//                 <br />
//                 <label>Email:</label>
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 <br />
//                 <button type="submit">Register</button>
//             </form>