import React, { Component } from 'react';
import { Card, FocusStyleManager } from '@blueprintjs/core';
import { LeftBar } from 'components';

// LeftBar는 조정이 더 필요
class Editor extends Component {
  state = {
    currentContent: '',
  }

  render() {
    const {
      todayNovelData,
    } = this.props;

    FocusStyleManager.onlyShowFocusOnTabs();

    return (
      <div style={{
        padding: '1rem',
        width: '100%',
      }}
      >
        <Card style={{ display: 'felx', fleDirection: 'horizontal' }}>
          <h3 style={{ paddingLeft: '15rem', zIndex: '100' }}>&quot; hello &quot;</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%' }}>
            <textarea
              dir="auto"
              style={{
                width: '100%',
                height: '45rem',
                paddingLeft: '15rem',
                border: '3px',
                resize: 'none',
              }}
              placeholder="다음 내용을 입력해주세요"
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default Editor;
