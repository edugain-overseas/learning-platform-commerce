export const testQuestionsToBlocks = (questions) => {
  return questions.map((question) => {
    if (question.q_type === "matching") {
      const responseAnswers = question.answers[0];
      const answers = responseAnswers.left.map(({ id, value }) => ({
        a_id: id,
        left_text: value,
        right_text: responseAnswers.right.find(
          ({ id: rightId }) => rightId === id
        ).value,
      }));

      return { ...question, answers, id: question.q_id || question.id };
    }
    return { ...question, id: question.q_id || question.id };
  });
};
