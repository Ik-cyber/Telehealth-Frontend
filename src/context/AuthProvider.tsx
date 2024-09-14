// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import axios from 'axios';

// // Define a more specific type for `user`
// interface User {
//   id: string;
//   email: string;
//   name?: string;
// }

// // Define the context type
// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email?: string, password?: string) => Promise<void>;
//   logout: () => void;
//   createUser: (email?: string, password?: string, name?: string, role?: string) => Promise<string | undefined>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   const createUser = async (email?: string, password?: string, name?: string, role?: string) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/', { name, email, password, role });
//       setUser(response.data.user);
//       return user;
//     } catch (error) {
//       console.error('User Creation Failed.', error);
//       return undefined; // Handle error case, maybe return a specific error message
//     }
//   };

//   const login = async (email?: string, password?: string) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       setUser(response.data.user);
//       setToken(response.data.token);
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, createUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export default AuthProvider;

import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

// Define a more specific type for `user`
interface User {
  id: string;
  email: string;
  name?: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  createUser: (email: string, password: string, name?: string, role?: string) => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const createUser = async (email: string, password: string, name?: string, role?: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/', { name, email, password, role });
      console.log(response.data)
      return response.data; // Assuming the response contains the user data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('Axios error:', error.message);
        console.error('Error details:', error.response?.data || error);
      } else {
        // Handle other errors
        console.error('Error:', error);
      }
      return undefined; // Or handle it in a way that suits your application
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log(response.data)
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Check for token on initial load
  React.useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // You might want to validate the token and fetch user info here
      setToken(storedToken);
      // Assuming there's an API endpoint to fetch user data using the token
      axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${storedToken}` },
      }).then(response => {
        setUser(response.data.user);
      }).catch(error => {
        console.error('Failed to fetch user:', error);
        logout();
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
