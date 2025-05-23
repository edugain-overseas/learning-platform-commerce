export const compareObjectsByKeys = (obj1, obj2, keys) => {
  console.log(keys);
  
  for (let key of keys) {
    console.log(obj1?.[key], obj2?.[key]);
    if (obj1?.[key] !== obj2?.[key]) {
      return true;
    }
  }
  return false;
};

const getByTemplateTypeByAttrType = (a_type) => {
  switch (a_type) {
    case "text":
      return "text";
    case "present":
    case "audio":
    case "video":
      return "file";
    case "picture":
    case "file":
      return "files";
    case "link":
      return "links";
    case "table":
      return "table";
    default:
      break;
  }
};

export const compareLecturePart = (obj1, obj2, a_type) => {
  console.log(obj1, obj2);

  const textBaseValues = ["a_title", "a_text", "a_number"];
  const fileBaseValues = [
    "filename",
    "file_path",
    "file_size",
    "file_description",
  ];
  const linksBaseValues = ["link", "anchor"];
  const tableBaseValues = ["table_data"];

  const templateType = getByTemplateTypeByAttrType(a_type);

  switch (templateType) {
    case "text":
      return compareObjectsByKeys(obj1, obj2, textBaseValues);
    case "file":
      return compareObjectsByKeys(obj1, obj2, [
        ...textBaseValues,
        ...fileBaseValues,
      ]);

    case "files":
      const isFilesEqualsLength = obj1.files.length === obj2.files.length;

      const isFilesChanged = obj1.files.reduce((changed, file, index) => {
        return (
          changed ||
          compareObjectsByKeys(file, obj2.files[index], fileBaseValues)
        );
      }, false);
      return (
        compareObjectsByKeys(obj1, obj2, textBaseValues) ||
        isFilesChanged ||
        !isFilesEqualsLength
      );

    case "links":
      let isLinksChanged = false;

      if (obj1.links.length !== obj2.links.length) {
        isLinksChanged = true;
      } else {
        isLinksChanged = obj1.links.reduce((changed, link, index) => {
          console.log(link, obj2.links[index]);
          return (
            changed ||
            compareObjectsByKeys(link, obj2.links[index], linksBaseValues)
          );
        }, false);
      }
      return compareObjectsByKeys(obj1, obj2, textBaseValues) || isLinksChanged;

    case "table":
      return compareObjectsByKeys(obj1, obj2, [
        ...textBaseValues,
        ...tableBaseValues,
      ]);
    default:
      return false;
  }
};

export const compareTestQuestion = (questionFromClient, questionFromServer) => {
  const baseKeysToCompare = ["q_text", "q_score", "q_number"];

  switch (questionFromClient.q_type) {
    case "question_with_photo":
      return compareObjectsByKeys(questionFromClient, questionFromServer, [
        ...baseKeysToCompare,
        "image_path",
      ]);

    default:
      return compareObjectsByKeys(
        questionFromClient,
        questionFromServer,
        baseKeysToCompare
      );
  }
};

export const compareTestAnswer = (
  answerFromClient,
  answerFromServer,
  q_type
) => {
  const baseKeysToCompare = ["a_text", "is_correct"];

  switch (q_type) {
    case "answer_with_photo":
      return compareObjectsByKeys(answerFromClient, answerFromServer, [
        ...baseKeysToCompare,
        "image_path",
      ]);
    case "matching":
      return compareObjectsByKeys(answerFromClient, answerFromServer, [
        "right_text",
        "left_text",
      ]);

    default:
      return compareObjectsByKeys(
        answerFromClient,
        answerFromServer,
        baseKeysToCompare
      );
  }
};
