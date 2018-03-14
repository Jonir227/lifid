import React, { Component } from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import { TextEditor } from 'components';

// LeftBar는 조정이 더 필요
class Editor extends Component {
  
  editorTextChange = (text) => {
    console.log(text);
  }

  render() {

    FocusStyleManager.onlyShowFocusOnTabs();

    return (
      <div>
        <TextEditor />
      </div>
    );
  }
}

export default Editor;
