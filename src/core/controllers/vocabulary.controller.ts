import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  and,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { VocabularyRequest } from "@/core/request";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";

const vocabularyPath = "vocabulary";
const vocabularyCollection = collection(firebaseDB, vocabularyPath);

const VocabularyController = {
  addVocabulary: async (payload: VocabularyRequest) => {
    const request = addTimeStamp(payload);
    await setDoc(doc(vocabularyCollection, "vocabulary_" + nanoid()), request);
  },
  updateVocabulary: async (id: string, payload: VocabularyRequest) => {
    await setDoc(doc(vocabularyCollection, id), payload);
  },
  removeVocabulary: async (id: string) => {
    await deleteDoc(doc(vocabularyCollection, id));
  },
  getVocabularies: async (topicId?: string) => {
    if (topicId) {
      const q = query(vocabularyCollection, where("topicId", "==", topicId));
      return (await getDocs(q)).docs.map((doc) => ({
        vocabularyId: doc.id,
        vocabularyCreated: doc.data().created,
        vocabularyIpaDisplayLanguage: doc.data().ipaDisplayLanguage,
        vocabularyTitleDisplayLanguage: doc.data().titleDisplayLanguage,
        vocabularytitleNativeLanguage: doc.data().titleNativeLanguage,
        topicId: doc.data().topicId,
        vocabularyUpdated: doc.data().updated,
        vocabularyVoiceSrc: doc.data().voiceSrc,
      }));
    } else {
      return (await getDocs(vocabularyCollection)).docs.map((doc) => ({
        vocabularyId: doc.id,
        vocabularyCreated: doc.data().created,
        vocabularyIpaDisplayLanguage: doc.data().ipaDisplayLanguage,
        vocabularyTitleDisplayLanguage: doc.data().titleDisplayLanguage,
        vocabularytitleNativeLanguage: doc.data().titleNativeLanguage,
        topicId: doc.data().topicId,
        vocabularyUpdated: doc.data().updated,
        vocabularyVoiceSrc: doc.data().voiceSrc,
      }));
    }
  },
  filterVocabularies: async (topicId: string, vocabularies: string[]) => {
    if (vocabularies.length && topicId) {
      const q = query(
        vocabularyCollection,
        and(
          where(documentId(), "in", vocabularies),
          where("topicId", "==", topicId)
        )
      );
      return (await getDocs(q)).docs.map((doc) => ({
        vocabularyId: doc.id,
        vocabularyCreated: doc.data().created,
        vocabularyIpaDisplayLanguage: doc.data().ipaDisplayLanguage,
        vocabularyTitleDisplayLanguage: doc.data().titleDisplayLanguage,
        vocabularytitleNativeLanguage: doc.data().titleNativeLanguage,
        topicId: doc.data().topicId,
        vocabularyUpdated: doc.data().updated,
        vocabularyVoiceSrc: doc.data().voiceSrc,
      }));
    }
    return [];
  },
};

export default VocabularyController;
