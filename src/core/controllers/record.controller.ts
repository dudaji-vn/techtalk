import { firebaseDB } from "@/config/firebase";
import { addDoc, and, collection, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
import { RecordModal, RecordRequest } from "@/core/type";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
import { recordConvert } from "../coverter/record.mapping";

const recordPath = "record";
const recordCollection = collection(firebaseDB, recordPath);

const RecordController = {
  addRecord: (payload: RecordRequest) => {
    const { userId, challengeId, vocabularyId, voiceSrc, recordId } = payload;
    console.log("controller::", challengeId);
    if (recordId) {
      return setDoc(
        doc(recordCollection, recordId),
        {
          voice_src: voiceSrc,
        },
        {
          merge: true,
        }
      );
    }
    let challengeRef = null;
    const userRef = doc(firebaseDB, "user", userId);
    const vocabularyRef = doc(firebaseDB, "vocabulary", vocabularyId);
    if (challengeId) {
      challengeRef = doc(firebaseDB, "challenge", challengeId);
    }
    console.log("challengeRef", challengeRef);

    const request = addTimeStamp({
      vocabulary_id: vocabularyRef,
      user_id: userRef,
      challenge_id: challengeRef,
      voice_src: voiceSrc,
    });

    addDoc(recordCollection, request);
  },
  getUserRecords: async (userId: string) => {
    const userRef = doc(firebaseDB, "user", userId);
    const q = query(recordCollection, where("user_id", "==", userRef));
    return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
  },
  getRecordsByManyUser: async (usersId: string[]) => {
    if (usersId.length) {
      const q = query(recordCollection, where("userId", "in", usersId));
      return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
    }
    return [];
  },
  getRecordsByChallengeId: async (userId: string, challengeId: string) => {
    const userRef = doc(firebaseDB, "user", userId);
    const challengeRef = doc(firebaseDB, "challenge", challengeId);
    console.log(userId, challengeId);
    const q = query(recordCollection, and(where("challenge_id", "==", challengeRef), where("user_id", "==", userRef)));
    return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
  },
};

export default RecordController;
