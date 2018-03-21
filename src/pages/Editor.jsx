import React from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import { TextEditor } from 'components';

// LeftBar는 조정이 더 필요
const Editor = () => {
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <TextEditor />
  );
};

export default Editor;
