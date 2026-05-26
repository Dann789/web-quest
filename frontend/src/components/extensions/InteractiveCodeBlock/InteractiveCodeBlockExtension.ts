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
      },
      codeContent: {
        default: '<?php\n\n?>',
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

  renderHTML({ HTMLAttributes }) {
    return ['interactive-code-block', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InteractiveCodeBlockComponent);
  },
});
