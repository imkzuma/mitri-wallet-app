import {
  User as FirebaseUser,
  signOut as firebaseSignOut,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

interface SignIn {
  (
    email: string,
    password: string,
    rememberMe?: boolean
  ): Promise<UserCredential>
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const response = await signInWithPopup(auth, provider);
  return response;
}

export const signIn: SignIn = async (email, password, rememberMe = false) => {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
}
