/* Types of lecturePartsTemplateKeys:
   files: [{
        filename: string,
        file_path: string,
        file_size: number,
        file_description: string,
        download_allowed: boolean,
      },]
    links: [{
        link: string,
        anchor: string,
        },]
*/

const lecturePartsTemplates = {
  text: {
    a_title: "",
    a_number: 0,
    a_text: "",
    hidden: false,
  },
  file: {
    a_title: "",
    a_number: 0,
    a_text: "",
    hidden: false,
    filename: "",
    file_path: "",
    file_size: 0,
    file_description: "",
    download_allowed: false,
  },
  files: {
    a_title: "",
    a_number: 0,
    a_text: "",
    hidden: false,
    files: [],
  },
  links: {
    a_title: "",
    a_number: 0,
    a_text: "",
    hidden: false,
    links: [],
  },
};

export const lectureParts = [
  {
    a_type: "text",
    template: lecturePartsTemplates.text,
  },
  {
    a_type: "present",
    template: lecturePartsTemplates.file,
  },
  {
    a_type: "audio",
    template: lecturePartsTemplates.file,
  },
  {
    a_type: "video",
    template: lecturePartsTemplates.file,
  },
  {
    a_type: "picture",
    template: lecturePartsTemplates.files,
  },
  {
    a_type: "file",
    template: lecturePartsTemplates.files,
  },
  {
    a_type: "link",
    template: lecturePartsTemplates.links,
  },
];

/* Types of testPartsTemplateKeys:
   answers: [ anyOf ->  {
        a_text: string,
        is_correct: false,
        image_path: string
      } or {
        right_text: string,
        left_text: string
      },]
*/

const testPartsTemplates = {
  test: {
    q_text: "",
    q_number: 0,
    q_score: 0,
    hedden: false,
    answers: [],
  },
  boolean: {
    q_text: "",
    q_number: 0,
    q_score: 0,
    hedden: false,
    answers: [
      { a_text: "true", is_correct: false },
      { a_text: "false", is_correct: false },
    ],
  },
  answer_with_photo: {
    q_text: "",
    q_number: 0,
    q_score: 0,
    hedden: false,
    answers: [],
  },
  question_with_photo: {
    q_text: "",
    q_number: 0,
    q_score: 0,
    hedden: false,
    image_path: undefined,
    answers: [],
  },
  multiple_choice: {
    q_text: "",
    q_number: 0,
    q_score: 0,
    hedden: false,
    answers: [],
  },
  matching: {
    q_text: "Please make the correct pairs",
    q_number: 0,
    q_score: 0,
    hedden: false,
    answers: [],
  },
};

export const testParts = [
  {
    q_type: "test",
    label: "classic",
    template: testPartsTemplates.test,
  },
  {
    q_type: "boolean",
    label: "true or false",
    template: testPartsTemplates.boolean,
  },
  {
    q_type: "answer_with_photo",
    label: "photo answers",
    template: testPartsTemplates.answer_with_photo,
  },
  {
    q_type: "question_with_photo",
    label: "photo question",
    template: testPartsTemplates.question_with_photo,
  },
  {
    q_type: "multiple_choice",
    label: "multiple choice",
    template: testPartsTemplates.multiple_choice,
  },
  {
    q_type: "matching",
    label: "matching",
    template: testPartsTemplates.matching,
  },
];
