import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebaseConnection";

interface AuthProviderProps{
  children: ReactNode
}


type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({name, email, uid}: UserProps)=> void;
  user: UserProps | null;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({children}: AuthProviderProps) => {

  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)


  useEffect(()=> {

    const unsub = onAuthStateChanged(auth, (user) => {

      if(user) {

        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email
        })

        setLoadingAuth(false)

      } else {
        setUser(null);
        setLoadingAuth(false)
      }

    })

    return () => {
      unsub();
    }

  }, [])


  const handleInfoUser = ({name, email, uid}: UserProps) => {
    setUser({
      name,
      email,
      uid
    })
  }

  return (

    <AuthContext.Provider value={{signed: !!user, loadingAuth, handleInfoUser}}>
      {children}
    </AuthContext.Provider>

  )

}

export default AuthProvider