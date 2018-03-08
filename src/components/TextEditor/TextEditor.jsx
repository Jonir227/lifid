import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Card, ButtonGroup, Button } from '@blueprintjs/core';
import ClassNames from 'classnames/bind';
import { LeftBar } from 'components';
import styles from './TextEditor.scss';

const cx = ClassNames.bind(styles);

class TextEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  editorFocus = () => {
    this.editor.focus();
  }

  _RichUtilCickFunc = styleMutator =>
    () => { this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, styleMutator)); };

  render() {
    return (
      <div className={cx('editor')}>
        <Card className={cx('card-wrapper')}>
          <LeftBar className={cx('left-bar')}/>
          <div className={cx('text-wrapper')}>
            <div className={cx('today-novel')}>
              &quot; 항구의 하늘은 방송이 끝난 텔레비전 색이였다 &quot;
            </div>
            <div className={cx('editor-wrapper')} role="presentation" onClick={this.editorFocus} onKeyPress={this.focus}>
              <div className={cx('tool-box')}>
                <ButtonGroup minimal>
                  <Button icon="header-one" />
                  <Button icon="header-two" />
                  <div className={cx('menu-divider')} />
                  <Button icon="bold" onClick={this._RichUtilCickFunc('BOLD')} />
                  <Button icon="italic" />
                  <Button icon="underline" />
                  <Button icon="strikethrough" />
                  <div className={cx('menu-divider')} />
                  <Button icon="align-left" />
                  <Button icon="align-center" />
                  <Button icon="align-right" />
                  <Button icon="align-justfy" />
                </ButtonGroup>
              </div>
              <div className={cx('text-write-area')}>
                <Editor
                  ref={(ref) => { this.editor = ref; }}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder="this area can be edited"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default TextEditor;
