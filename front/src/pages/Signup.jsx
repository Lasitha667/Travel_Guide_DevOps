import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Dynamically determine API URL based on current hostname
            const API_BASE_URL = `http://${window.location.hostname}:8080`;
            const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Signup successful');
                navigate('/login');
            } else {
                // Backend usually returns json error or status
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Signup failed. Email might be taken.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Connection refused. Is backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <div className="auth-overlay"></div>
                <div className="auth-content">
                    <div className="glass-card auth-card">
                        <h2>Start Your Journey</h2>
                        <p className="auth-subtitle">Create an account to explore the world</p>

                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Choose a username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
