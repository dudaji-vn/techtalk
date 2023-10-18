import { DocumentReference } from "firebase/firestore";
import { StageExercise } from "@/shared/type";

export interface EnrollmentResponseType {
  lectureId: DocumentReference;
  userId: DocumentReference;
  stage: StageExercise;
  currentStep: number;
  updated: string;
  created: string;
  enrollmentId: string;
}

export interface EnrollmentModal {
  enrollment_id: string;
  user_id: DocumentReference;
  lecture_id: DocumentReference;
  stage: StageExercise;
  current_step: number;
  updated: string;
  created: string;
}