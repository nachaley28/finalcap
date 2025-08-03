import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiClient, { setApiToken, clearApiToken } from './apiClient';

const AuthContext = createContext(null);
const ACCESS_TOKEN_KEY = 'appAccessToken';

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  // const [accountSettings, setAccountSettings] = useState(null)
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      console.log('Fetching account profile...');
      const response = await apiClient.post('/auth/account');
      if (response.data.data) {
        setAccount(response.data.data);
        setAuthenticated(true);
        console.log('User profile fetched successfully');
        // fetchUserSettings()
      } else {
        throw new Error("No user data received from endpoint");
      }
    } catch (error) {
      console.error('AuthContext: Failed to fetch account:', error);
      clearApiToken();
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setAccount(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);


  // const fetchUserSettings = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await apiClient.post('/auth/account-settings');
  //     if (response.data.data) {
  //       setAccountSettings(response.data.data);

  //     } else {
  //       throw new Error("No data received from endpoint");

  //     }
  //   } catch (error) {
  //     console.error('AuthContext: Failed to fetch account settings setup:', error);
  //     setAccountSettings(null);

  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    const attemptRehydration = async () => {
      console.log('AuthContext: Attempting session rehydration...');
      setLoading(true);
      const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (storedToken) {
        console.log('AuthContext: Found stored token. Validating...');
        setApiToken(storedToken);
        await fetchUserProfile();
      } else {
        console.log('AuthContext: No stored token found.');
        setAuthenticated(false);
        setAccount(null);
        setLoading(false);
      }
    };

    attemptRehydration();
  }, [fetchUserProfile]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      console.log('AuthContext: Attempting login...');
      const response = await apiClient.post('/auth/login', credentials);
      const { access_token, user } = response.data;

      if (access_token) {
        setApiToken(access_token);
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

        if (user) {
          setAccount(user);
          setAuthenticated(true);
        } else {
          await fetchUserProfile();
        }
        console.log('AuthContext: Login successful.');
        setLoading(false);
        return { success: true, user: user || account };
      } else {
        throw new Error("Login failed: No token received.");
      }
    } catch (error) {
      console.error('AuthContext: Login failed:', error.response?.data?.message || error.message);
      clearApiToken();
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setAccount(null);
      setAuthenticated(false);
      setLoading(false);
      return { success: false, error: error.response?.data?.message || 'Login process failed' };
    }
  };

  const logout = async () => {
    console.log('AuthContext: Logging out...');
    try {
      await apiClient.post('/auth/logout');
      console.log('AuthContext: Server-side logout successful.');

    } catch (error) {
      console.error('AuthContext: API logout call failed (continuing client-side logout):', error);

    } finally {
      clearApiToken();
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setAccount(null);
      setAuthenticated(false);
      setLoading(false); // Ensure loading is set to false
      console.log('AuthContext: Client-side logout complete.');
    }
  };

  const value = {
    account,
    // accountSettings,
    authenticated,
    loading,
    login,
    logout,
    fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider. Ensure your component tree is wrapped.');
  }
  return context;
};