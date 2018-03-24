import React from 'react';
import { FocusStyleManager } from '@blueprintjs/core';
import { TextEditor } from 'components';

// LeftBar는 조정이 더 필요
const Editor = () => {
  // Blueprintjs의 특징은 Focus가 갔을때 파란 테두리가 쳐지는 점인데,
  // 이거 보기 싫어서 나오지 않는 옵션을 넣엇음.
  FocusStyleManager.onlyShowFocusOnTabs();

  return (
    <TextEditor />
  );
};

export default Editor;
