import { useEffect } from "react";

export const useInitializeAnswers = (questions, setStudentAnswers) => {
  useEffect(() => {
    if (!Array.isArray(questions) || questions.length === 0 || !setStudentAnswers) return;

    setStudentAnswers((prev) => {
      const initializedIds = new Set(prev.map((q) => q.q_id));
      const newAnswers = [];

      for (const q of questions) {
        if (!initializedIds.has(q.q_id)) {
          switch (q.q_type) {
            case "test":
            case "boolean":
            case "answer_with_photo":
            case "question_with_photo":
              newAnswers.push({ q_id: q.q_id, q_type: q.q_type, a_id: 0 });
              break;
            case "multiple_choice":
              newAnswers.push({ q_id: q.q_id, q_type: q.q_type, a_ids: [] });
              break;
            case "matching":
              newAnswers.push({ q_id: q.q_id, q_type: q.q_type, matching: [] });
              break;
            default:
              break;
          }
        }
      }

      return [...prev, ...newAnswers];
    });
  }, [questions, setStudentAnswers]);
};
