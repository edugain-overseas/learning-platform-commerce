export const convertToHTML = (input) => {
  const lines = input.split("\n");
  let html = "";

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine) {
      html += `<p>${trimmedLine}</p>\n`;
    }
  });

  return html;
};
