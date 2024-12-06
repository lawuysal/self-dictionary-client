import { QuizQuestion } from "@/types/entities/quizQuestion.entity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizPracticeState {
  quizQuestions: QuizQuestion[];
  currentQuestionIndex: number;
  currentQuestionCorrectAnswer: string;
  currentQuestionUserAnswer: string;
  correctAnswers: number;
  wrongAnswers: number;
  isQuizPracticeStarted: boolean;
  isQuizPracticeFinished: boolean;
  isCurrentQuestionAnswered: boolean;
  isCurrentQuestionUserAnswerIsCorrect: boolean;
}

const initialState: QuizPracticeState = {
  quizQuestions: [],
  currentQuestionIndex: 0,
  currentQuestionCorrectAnswer: "",
  currentQuestionUserAnswer: "",
  correctAnswers: 0,
  wrongAnswers: 0,
  isQuizPracticeStarted: false,
  isQuizPracticeFinished: false,
  isCurrentQuestionAnswered: false,
  isCurrentQuestionUserAnswerIsCorrect: false,
};

const quizPracticeSlice = createSlice({
  name: "quizPractice",
  initialState,
  reducers: {
    setQuizQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
      state.quizQuestions = action.payload;
      state.isQuizPracticeStarted = true;
    },
    switchToNextQuestion: (state) => {
      state.currentQuestionIndex += 1;
      state.isCurrentQuestionAnswered = false;
      state.isCurrentQuestionUserAnswerIsCorrect = false;
    },
    increaseCorrectAnswers: (state) => {
      state.correctAnswers += 1;
    },
    increaseWrongAnswers: (state) => {
      state.wrongAnswers += 1;
    },
    finishQuizPractice: (state) => {
      state.isQuizPracticeFinished = true;
    },
    resetQuizPractice: (state) => {
      state.quizQuestions = [];
      state.currentQuestionIndex = 0;
      state.currentQuestionCorrectAnswer = "";
      state.currentQuestionUserAnswer = "";
      state.correctAnswers = 0;
      state.wrongAnswers = 0;
      state.isQuizPracticeStarted = false;
      state.isQuizPracticeFinished = false;
      state.isCurrentQuestionAnswered = false;
      state.isCurrentQuestionUserAnswerIsCorrect = false;
    },
    setCurrentQuestionAnswerResponse: (
      state,
      action: PayloadAction<{ answer: string; isCorrect: boolean }>,
    ) => {
      state.isCurrentQuestionAnswered = true;
      state.currentQuestionCorrectAnswer = action.payload.answer;
      state.isCurrentQuestionUserAnswerIsCorrect = action.payload.isCorrect;
    },
    setCurrentQuestionUserAnswer: (state, action: PayloadAction<string>) => {
      state.currentQuestionUserAnswer = action.payload;
    },
  },
});

export const {
  setQuizQuestions,
  switchToNextQuestion,
  increaseCorrectAnswers,
  increaseWrongAnswers,
  finishQuizPractice,
  resetQuizPractice,
  setCurrentQuestionAnswerResponse,
  setCurrentQuestionUserAnswer,
} = quizPracticeSlice.actions;

export default quizPracticeSlice.reducer;
