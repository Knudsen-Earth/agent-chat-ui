// src/components/AuthNav.jsx
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0';
import './AuthNav.css';
// import UserFormModal from './users/UserFormModal';

const AuthNav = () => {
  const router = useRouter();
  
  // const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [userInfo, setUserInfo] = useState({});

  const { user, isLoading } = useUser();

  // Use userInfo if it has been updated, otherwise fall back to Auth0 user
  // const displayUser = Object.keys(userInfo).length > 0 ? userInfo : user;

  if (isLoading) {
    return <div className="auth-loading">Loading...</div>;
  }

  return (
    <div className="auth-nav">
      {user ? (
        <div className="user-info">
          <span className="user-name">
            Welcome, {user.first_name || user.given_name || user.name || user.email}!
          </span>
          <button 
            onClick={() => router.push('/auth/logout')}
            className="logout-button"
          >
            Log Out
          </button>
          <img 
              src={user.picture}
              alt={(user.family_name ? 
                (user.given_name?.[0] || '') + (user.family_name?.[0] || '') : 
                (user.given_name?.[0] || user.email?.[0] || '')).toUpperCase()}
              style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  marginRight: '10px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  marginLeft: '10px'
              }}/>
        </div>
      ) : (
        <button 
          onClick={() => router.push('/auth/login')}
          className="login-button"
        >
          Log In
        </button>
      )} 
    </div>
  );
};

export default AuthNav;