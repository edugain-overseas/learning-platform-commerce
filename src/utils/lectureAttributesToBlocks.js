export const lectureAttributesToBlocks = (attrs) =>
  attrs.map((attr) => {
    let block = { ...attr, id: attr.a_id };
    console.log(block);
    if (["present", "audio", "video"].includes(attr.a_type)) {
      if (block.files) {
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
      }

      delete block.files;
      delete block.links;
    }
    if (attr.a_type === "text") {
      delete block.files;
      delete block.links;
    }
    return block;
  });

export const blocksToLectureAttributes = (blocks) =>
  blocks.map(
    ({ filename, file_path, file_size, file_description, ...rest }) => {
      if (["present", "audio", "video"].includes(rest.a_type)) {
        return {
          ...rest,
          files: [{ filename, file_path, file_size, file_description }],
        };
      }
      return rest;
    }
  );
