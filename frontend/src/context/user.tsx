import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
  email: string;
  type: 'VIP' | 'register' | 'guest';
}

interface UserContextValue extends UserContextType {
  logIn: (email: string, password: string) => void;
  logOut: () => void;
}

const UserContext = createContext<UserContextValue>({
  email: '',
  type: 'guest',
  logIn: () => {},
  logOut: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const email = window.sessionStorage.getItem('email') || '';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const type: 'VIP' | 'register' | 'guest' =
    window.sessionStorage.getItem('type') || 'guest';
  const [user, setUser] = useState<UserContextType>({ email, type });

  const logIn = (email: string) => {
    let type: 'VIP' | 'register' | 'guest' = 'register';
    if (email.includes('vip@')) {
      type = 'VIP';
    }

    setUser({ email, type });
    window.sessionStorage.setItem('email', email);
    window.sessionStorage.setItem('type', type);
  };

  const logOut = () => {
    setUser({ email: '', type: 'guest' });
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('type');
  };

  return (
    <UserContext.Provider value={{ ...user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  return useContext(UserContext);
};
