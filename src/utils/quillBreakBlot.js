import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class BreakBlot extends Embed {
  static create() {
    return document.createElement('br');
  }

  static value() {
    return true;
  }

  length() {
    return 1;
  }

  html() {
    return '<br>';
  }
}
BreakBlot.blotName = 'break';
BreakBlot.tagName = 'BR';

Quill.register(BreakBlot, true);