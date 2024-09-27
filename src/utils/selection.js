export const wrapTextNode = (textNode, start, end) => {
  if (textNode.nodeType !== Node.TEXT_NODE || !textNode.textContent) {
    return;
  }

  const highlightSpan = document.createElement("span");
  highlightSpan.classList.add("highlight-selection");

  const text = textNode.textContent.substring(start, end);
  const highlightedText = document.createTextNode(text);

  highlightSpan.appendChild(highlightedText);

  const parentNode = textNode.parentNode;
  const textBefore = document.createTextNode(
    textNode.textContent.substring(0, start)
  );
  const textAfter = document.createTextNode(
    textNode.textContent.substring(end)
  );

  parentNode.insertBefore(textBefore, textNode);
  parentNode.insertBefore(highlightSpan, textNode);
  parentNode.insertBefore(textAfter, textNode);

  parentNode.removeChild(textNode);
};

export const getNextNode = (node) => {
  if (node.firstChild) return node.firstChild;
  while (node) {
    if (node.nextSibling) return node.nextSibling;
    node = node.parentNode;
  }
  return null;
};

export const getNodesInRange = (range) => {
  const nodes = [];
  let node = range.startContainer;

  while (node) {
    if (
      node.nodeType === Node.TEXT_NODE &&
      range.intersectsNode(node.parentNode)
    ) {
      nodes.push(node);
    }
    if (node === range.endContainer) break;
    node = getNextNode(node);
  }
  return nodes;
};

export const handleHighlightSelection = (selection) => {
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    if (startContainer.nodeType === Node.TEXT_NODE) {
      wrapTextNode(
        range.startContainer,
        range.startOffset,
        startContainer.textContent.length
      );
    }

    const nodes = getNodesInRange(range);
    nodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        wrapTextNode(node, 0, node.textContent.length);
      }
    });

    if (endContainer.nodeType === Node.TEXT_NODE) {
      wrapTextNode(range.endContainer, 0, range.endOffset);
    }

  }
};
