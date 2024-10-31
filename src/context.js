import React from 'react'
//יצירת המאגר
const UsersContext=React.createContext({})
//ספק המידע שלנו
export const MyProvider=UsersContext.Provider

export default UsersContext