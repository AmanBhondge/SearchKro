import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      name: "John",
      email: "john@gmail.com",
      password: "123456",
      isAuthenticated: false,
    },
    {
      name: "kunal",
      email: "kunal@gmail.com",
      password: "098765",
      isAuthenticated: false,
    },
  ]);

  const loginUser = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      user.isAuthenticated = true;
      setUsers([...users]);
      return { success: true, message: `Welcome back, ${user.name}!`, user };
    } else {
      return { sucess: false, message: `This user is not authenticated` };
    }
  };

  const registerUser = (name, email, password) => {
    const userExists = users.some((user) => user.email === email);

    if (!userExists) {
      return { success: false, message: `This email is already in use!` };
    } else {
      const newUser = { name, email, password, isAuthenticated: false };
      setUsers([...users, newUser]);
      return { sucess: false, message: `This user is not authenticated` };
    }
  };

  console.log(" AuthProvider Loaded:", users);

  return (
    <AuthContext.Provider value={{ users, setUsers, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;