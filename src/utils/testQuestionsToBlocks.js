export const testQuestionsToBlocks = (questions) => {
  return questions.map((question) => {
    if (question.q_type === "matching") {
      console.log(question);
      const answers = question.answers.left.map(({ id, value }) => ({
        a_id: id,
        left_text: value,
        right_text: question.answers.right.find(
          ({ id: rightId }) => rightId === id
        ).value,
      }));
      return { ...question, answers, id: question.q_id };
    }
    return { ...question, id: question.q_id };
  });
};
