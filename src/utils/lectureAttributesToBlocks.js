export const lectureAttributesToBlocks = (attrs) =>
  attrs.map((attr) => {
    let block = { ...attr, id: attr.a_id };
    if (["present", "audio", "video"].includes(attr.a_type)) {
      const {
        filename,
        file_path,
        file_size,
        file_description,
        download_allowed,
      } = block.files[0];

      block = {
        ...block,
        filename,
        file_path,
        file_size,
        file_description,
        download_allowed,
      };

      delete block.files;
      delete block.links;
    }
    if (attr.a_type === "text") {
      delete block.files;
      delete block.links;
    }
    return block;
  });
