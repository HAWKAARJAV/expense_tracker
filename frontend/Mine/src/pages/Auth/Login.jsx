import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { Link } from 'react-router-dom'
import { API_PATHS } from '../../utils/apipaths'
import axiosInstance from '../../utils/axiosInstance'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateuser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("NEW LOGIN COMPONENT WORKING!"); // Test line
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateuser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("hawk@gmail.com");
    setPassword("1234");
    setError(null);
  };

  const containerStyle = {
    background: 'radial-gradient(circle at 15% 20%, #e0f2fe 0, #eef2ff 40%, #f8fafc 80%)',
    minHeight: '100vh',
    position: 'relative'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(18px)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 30px 70px -24px rgba(15, 23, 42, 0.35)',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    maxWidth: '400px',
    margin: '0 auto'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #5b8def 0%, #22d3ee 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(34, 211, 238, 0.35)',
    transition: 'all 0.3s ease',
    marginTop: '16px'
  };

  const demoCardStyle = {
    background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)',
    border: '2px solid #bae6fd',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '20px'
  };

  const featureCardStyle = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease'
  };

  return (
    <AuthLayout>
      <div style={containerStyle}>
        <div style={{ padding: '40px 20px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '900', 
              background: 'linear-gradient(135deg, #5b8def 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px'
            }}>
              🚀 EXPENSE TRACKER 💰
            </h1>
            <div style={{
              height: '4px',
              width: '100px',
              background: 'linear-gradient(135deg, #9333ea 0%, #e11d48 100%)',
              borderRadius: '2px',
              margin: '0 auto'
            }}></div>
          </div>

          {/* Main Card */}
          <div style={cardStyle}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#1f2937',
                marginBottom: '10px'
              }}>
                💸 Welcome Back
              </h2>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                Sign in to manage your finances
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px'
                  }}
                />
              </div>

              {error && (
                <div style={{
                  background: '#fee2e2',
                  border: '2px solid #fecaca',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  fontSize: '14px'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...buttonStyle,
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 30px rgba(147, 51, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(147, 51, 234, 0.3)';
                  }
                }}
              >
                {isLoading ? '⏳ Signing In...' : '🔓 LOGIN'}
              </button>
            </form>

            {/* Demo Credentials */}
            <div style={demoCardStyle}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h4 style={{ 
                  fontWeight: 'bold', 
                  color: '#7c3aed',
                  margin: 0
                }}>
                  🎮 Demo Account
                </h4>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Auto Fill
                </button>
              </div>
              <div style={{ fontSize: '14px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Email:</strong> 
                  <span style={{ 
                    fontFamily: 'monospace',
                    background: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    marginLeft: '8px',
                    border: '1px solid #d1d5db'
                  }}>
                    hawk@gmail.com
                  </span>
                </div>
                <div>
                  <strong>Password:</strong> 
                  <span style={{ 
                    fontFamily: 'monospace',
                    background: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    marginLeft: '8px',
                    border: '1px solid #d1d5db'
                  }}>
                    1234
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <p style={{ 
              textAlign: 'center', 
              marginTop: '20px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                style={{ 
                  color: '#7c3aed', 
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }}
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Feature Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px',
            maxWidth: '800px',
            margin: '40px auto 0'
          }}>
            <div style={featureCardStyle}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Smart Analytics</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                AI-powered insights into your spending patterns
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>💰</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Income Tracking</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Monitor all income sources and growth
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎯</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Goal Setting</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Set and track your financial objectives
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            maxWidth: '400px',
            margin: '40px auto 0'
          }}>
            <span style={{ fontSize: '24px' }}>🚀</span>
            <span style={{ 
              fontWeight: 'bold', 
              color: '#7c3aed',
              marginLeft: '10px'
            }}>
              Built by Aarjav Jain
            </span>
            <span style={{ color: '#9ca3af', margin: '0 10px' }}>—</span>
            <span style={{ color: '#6b7280' }}>NSUT CSAI Student</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login