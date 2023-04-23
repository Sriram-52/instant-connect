import { createContext, useContext, useMemo, useState } from "react";
import auth from "@react-native-firebase/auth";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  tokenListener: (cb: () => void) => () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext not found");
  }
  return context;
};

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const { user } = userCredential;
    setUser({
      id: user.uid,
      name: user.displayName || "",
      email: user.email || email,
    });
  };

  const logout = async () => {
    await auth().signOut();
    setUser(null);
  };

  const tokenListener = (cb: () => void): (() => void) => {
    const subscriber = auth().onIdTokenChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          name: user.displayName || "",
          email: user.email || "",
        });
      } else {
        setUser(null);
      }
      cb();
    });
    return subscriber;
  };

  const authContextValue = useMemo((): AuthContextType => {
    return {
      user,
      login,
      logout,
      tokenListener,
    };
  }, [user]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
