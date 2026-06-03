import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import InteractiveCodeBlockComponent from './InteractiveCodeBlockComponent';

export const InteractiveCodeBlock = Node.create({
  name: 'interactiveCodeBlock',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      language: {
        default: 'php',
        parseHTML: element => element.getAttribute('language') || 'php',
      },
      codeContent: {
        default: '<?php\n\n?>',
        parseHTML: element => element.getAttribute('codecontent'),
      },
      htmlContent: {
        default: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Playground</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
        parseHTML: element => element.getAttribute('htmlcontent'),
      },
      cssContent: {
        default: 'body {\n  font-family: sans-serif;\n}',
        parseHTML: element => element.getAttribute('csscontent'),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'interactive-code-block',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['interactive-code-block', mergeAttributes(HTMLAttributes, {
      language: node.attrs.language,
      codecontent: node.attrs.codeContent,
      htmlcontent: node.attrs.htmlContent,
      csscontent: node.attrs.cssContent,
    })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InteractiveCodeBlockComponent);
  },
});
