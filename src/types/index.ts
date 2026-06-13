export type TextValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TextValue[]
  | { [key: string]: TextValue };

export interface RawExpression {
  docId?: string;
  id: number | string;
  primary: TextValue;
  meaning: TextValue;
  similar: TextValue;
  example: TextValue;
  japanese?: TextValue;
  chinese?: TextValue;
  spanish?: TextValue;
  vietnamese?: TextValue;
}

export interface Expression {
  docId?: string;
  id: number;
  primary: string;
  meaning: string;
  similar: string[];
  example: string;
  japanese?: string;
  chinese?: string;
  spanish?: string;
  vietnamese?: string;
}

export interface SyncState {
  lastId: number;
  lastSyncDate: string;
}

export interface SyncMetadata {
  lastId?: number | string;
  updatedAt?: unknown;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export type SrsRating = "again" | "hard" | "good" | "easy";

export type SrsState = "new" | "learning" | "review" | "relearning";

export interface LearningCard {
  expressionId: number;
  state: SrsState;
  easeFactor: number;
  intervalDays: number;
  dueAt: string;
  repetitions: number;
  lapses: number;
  lastReviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewEvent {
  id: string;
  expressionId: number;
  rating: SrsRating;
  reviewedAt: string;
  previousDueAt: string | null;
  nextDueAt: string;
}

export interface LearningProgress {
  today: {
    date: string;
    reviewed: number;
    newIntroduced: number;
  };
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string | null;
  };
  lifetime: {
    totalReviews: number;
    totalExpressionsLearned: number;
  };
}
