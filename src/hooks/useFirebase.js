import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import FirebaseInit from "../firebase/firebase.init";
FirebaseInit();
const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const googleProvider = new GoogleAuthProvider();
  const singupUserWithEmail = (email, password, navigate) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate("/");
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const singInUserWithEmail = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate("/");
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const googleLogin = (navigate) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };
  const Logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setError(null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);
  return {
    user,
    error,
    singInUserWithEmail,
    singupUserWithEmail,
    googleLogin,
    Logout,
    loading,
    db,
  };
};

export default useFirebase;
