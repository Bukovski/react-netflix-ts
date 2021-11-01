import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase.context';
import { IFirebaseCollection, ISelectFilterData } from "../types/main.type";


interface ISnapshot extends IFirebaseCollection {
  data(): any;
}


export default function useContent(target: string) {
  const [ content, setContent ] = useState([]);
  const { firebase } = useContext(FirebaseContext);


  useEffect(() => {
    firebase
      .firestore()
      .collection(target)
      .get()
      .then((snapshot: { docs: ISnapshot[] }) => {
        const allContent: ISelectFilterData[] = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));

        // @ts-ignore
        setContent(allContent);
      })
      .catch((error: { message: string; }) => {
        console.log(error.message);
      });
  }, []);

  return { [ target ]: content };
}
