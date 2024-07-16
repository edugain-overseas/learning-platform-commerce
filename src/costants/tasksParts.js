
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
    files: [
      {
        filename: "",
        file_path: "",
        file_size: 0,
        file_description: "",
        download_allowed: false,
      },
    ],
  },
  links: {
    a_title: "",
    a_number: 0,
    a_text: "",
    hidden: false,
    links: [
      {
        link: "",
        anchor: "",
      },
    ],
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
