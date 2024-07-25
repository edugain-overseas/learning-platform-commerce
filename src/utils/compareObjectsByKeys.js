export const compareObjectsByKeys = (obj1, obj2, keys) => {
  for (let key of keys) {
    if (obj1[key] !== obj2[key]) {
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
    default:
      break;
  }
};

export const compareLecturePart = (obj1, obj2, a_type) => {
  const textBaseValues = ["a_title", "a_text", "a_number"];
  const fileBaseValues = [
    "filename",
    "file_path",
    "file_size",
    "file_description",
  ];
  const linksBaseValues = ["link", "anchor"];

  const templateType = getByTemplateTypeByAttrType(a_type);

  switch (templateType) {
    case "text":
      return compareObjectsByKeys(obj1, obj2, textBaseValues);
    case "file":
      return compareObjectsByKeys(obj1, obj2, [
        ...textBaseValues,
        fileBaseValues,
      ]);

    case "files":
      const isFilesChanged = obj1.files.reduce((changed, file, index) => {
        return (
          changed ||
          compareObjectsByKeys(file, obj2.files[index], fileBaseValues)
        );
      }, false);
      return compareObjectsByKeys(obj1, obj2, textBaseValues) || isFilesChanged;

    case "links":
      const isLinksChanged = obj1.links.reduce((changed, link, index) => {
        return (
          changed ||
          compareObjectsByKeys(link, obj2.links[index], linksBaseValues)
        );
      }, false);
      return compareObjectsByKeys(obj1, obj2, textBaseValues) || isLinksChanged;

    default:
      return false;
  }
};
