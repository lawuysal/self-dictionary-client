import { resetQuizPractice } from "@/redux/slices/quizPractice/quizPracticeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PracticeResetter() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetQuizPractice());
  }, [dispatch, location.pathname]);

  return null;
}
