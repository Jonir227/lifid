import React, { Component } from 'react';
import { Card, FocusStyleManager } from '@blueprintjs/core';
import { LeftBar, TextEditor } from 'components';

// LeftBar는 조정이 더 필요
class Editor extends Component {
  state = {
    currentContent: '',
  }
  
  editorTextChange = (text) => {
    console.log(text);
  }

  render() {
    const {
      todayNovelData,
    } = this.props;

    FocusStyleManager.onlyShowFocusOnTabs();

    return (
      <div>
        <TextEditor onChange={this.editorTextChange}/>
      </div>
    );
  }
}

export default Editor;
