const toolbarOptionsBase = [
  ["undo", "redo"],
  ["bold", "italic", "underline"],
];

const toolbarOptionsNormal = [
  ["undo", "redo"],
  [
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
    { align: [] },
  ],
];

const toolbarOptionsExpanded = [
  ["undo", "redo"],
  [{ header: [1, 2, false] }],
  [
    "bold",
    "italic",
    "underline",
    { list: "ordered" },
    { list: "bullet" },
    { align: [] },
  ],
];

const toolbarOptions = {
  base: toolbarOptionsBase,
  normal: toolbarOptionsNormal,
  expanded: toolbarOptionsExpanded,
};

export default toolbarOptions;
