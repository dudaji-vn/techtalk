import firebaseDB from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  FieldPath,
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

const UserController = {
  login: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    let reponse = {};
    const q = query(
      userCollection,
      and(where("userName", "==", userName), where("password", "==", password)),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      reponse = {
        ...doc.data(),
      };
    });
    console.log(reponse);
  },
  register: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {},
};

export default UserController;
