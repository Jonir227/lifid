import { Quill } from 'react-quill';

const inLine = Quill.import('blots/inline');

class IDtag extends inLine {
  static create(value) {
    const node = super.create();
    node.setAttribute('id', value);
    return node;
  }

  static formats(node) {
    return node.getAttribute('id');
  }
}

IDtag.blotName = 'id';
IDtag.tagName = 'p';

export default IDtag;
