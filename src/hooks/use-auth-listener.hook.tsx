import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase.context';


export default function useAuthListener() {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('authUser') as string));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser: any) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [ firebase ]);

  return { user };
}
