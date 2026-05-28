// import Quill from 'quill';

// const Embed = Quill.import('blots/embed');

// class BreakBlot extends Embed {
//   static create() {
//     return document.createElement('br');
//   }

//   static value() {
//     return true;
//   }

//   length() {
//     return 1;
//   }

//   html() {
//     return '<br>';
//   }
// }
// BreakBlot.blotName = 'break';
// BreakBlot.tagName = 'BR';

// Quill.register(BreakBlot, true);

import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class BreakBlot extends Inline {
  static create() {
    return super.create();
  }

  length() {
    return 0; // Важливо! Нульова довжина, щоб Quill не рахував його за окремий символ
  }

  value() {
    return true;
  }
}

BreakBlot.blotName = 'break';
BreakBlot.tagName = 'BR';

Quill.register(BreakBlot, true);