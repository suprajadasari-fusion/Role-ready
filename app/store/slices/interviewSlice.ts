import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuestionFeedback {
  question: string;
  answerText: string;
  score: number;
  grammarRating: string;
  techAccuracy: string;
  aiSuggestion: string;
}

interface InterviewState {
  targetRole: string;
  activeQuestionIndex: number;
  questions: string[];
  userAnswers: Record<number, string>;
  isCompleted: boolean;
  overallScore: number;
  feedbacks: QuestionFeedback[];
}

const initialState: InterviewState = {
  targetRole: 'AI & Machine Learning Architect',
  activeQuestionIndex: 0,
  questions: [
    'Explain how attention mechanisms function in Transformer architectures and why multi-head attention outperforms single-head attention.',
    'How do you address gradient vanishing or explosion issues in deep neural networks during long sequence training?',
    'Describe your strategy for evaluating MLOps pipeline latency and optimizing LLM inference throughput in production.',
    'Walk through an end-to-end design of a real-time recommendation engine handling 100,000 requests per second.'
  ],
  userAnswers: {},
  isCompleted: false,
  overallScore: 88,
  feedbacks: []
};

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setTargetRole: (state, action: PayloadAction<string>) => {
      state.targetRole = action.payload;
    },
    saveAnswer: (state, action: PayloadAction<{ index: number; answer: string }>) => {
      state.userAnswers[action.payload.index] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (state.activeQuestionIndex < state.questions.length - 1) {
        state.activeQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.activeQuestionIndex > 0) {
        state.activeQuestionIndex -= 1;
      }
    },
    completeSession: (state, action: PayloadAction<{ score: number; feedbacks: QuestionFeedback[] }>) => {
      state.isCompleted = true;
      state.overallScore = action.payload.score;
      state.feedbacks = action.payload.feedbacks;
    },
    resetSession: (state) => {
      state.activeQuestionIndex = 0;
      state.userAnswers = {};
      state.isCompleted = false;
      state.feedbacks = [];
    }
  }
});

export const { setTargetRole, saveAnswer, nextQuestion, prevQuestion, completeSession, resetSession } = interviewSlice.actions;
export default interviewSlice.reducer;
