import React, { Fragment } from 'react';
import { Prompt, Redirect } from 'react-router-dom';
import { Card, Button, Spinner, Intent } from '@blueprintjs/core';
import ReactQuill from 'react-quill';
import ClassNames from 'classnames/bind';
import Select from 'react-select-plus';
import _ from 'lodash';
import axios from 'axios';
import { LeftBar, AppToaster } from 'components';
import 'styles/quillTheme.css';
import styles from './TextEditor.scss';

const cx = ClassNames.bind(styles);

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.checkNovel.bind(this);
  }

  state = {
    /*
      text: editor의 내용
      sections: ##[something] 형태로 작성된 것. Table Of Content에 들어간다.
      lines: 줄,
      lenght: 문서 전체의 길이
      lastSaved: 마지막으로 저장된 날짜.
      tmpSavePending / publishPending
    */
    text: '',
    title: '',
    sections: [],
    lines: 0,
    length: 0,
    tags: [],
    lastSaved: 'none',
    tmpSavePending: false,
    publishPending: false,
    tagData: [],
    isBlocking: false,
    isNew: true,
    docNo: 0,
    out: false,
    novelData: this.props.novelData,
  }

  componentDidMount() {
    this.editor.focus();
    this.init();
    axios.get('/api/tag/list')
      .then((response) => {
        const { tags } = response.data;
        this.setState({
          tagData: _.map(tags, tag => ({
            value: tag.name, label: tag.name,
          })),
        });
      });
  }

  componentWillUnmount() {
    this.saveWorker.cancel();
  }

  onChange = (content) => {
    this.setState({ text: content, isBlocking: true }, this.checkNovel);
    this.saveWorker();
    this.updateInsight();
  }

  onChangeTitle = (input) => {
    this.setState({
      title: input.target.value,
    });
  }

  onSelectChange = (selectedOption) => {
    this.setState({
      tags: _.map(selectedOption, 'value'),
    });
  }

  init = () => {
    if (this.props.match.params.docNo !== undefined) {
      this.editor.getEditor().enable(false);
      axios.get(`/api/novella/editor/${this.props.match.params.docNo}`)
        .then((res) => {
          const { novella } = res.data;
          this.setState(
            () => ({
              text: novella.quillDelta,
              tags: novella.tags,
              title: novella.title,
              lastSaved: novella.published_date,
              isNew: false,
              docNo: this.props.match.params.docNo,
              isBlocking: false,
              novelData: novella.todayNovel,
              isPublished: novella.isPublished,
            }),
            () => { this.editor.getEditor().enable(true); },
          );
          console.log(this.state);
        })
        .catch(res => console.error(res));
    }
    this.setState({ isBlocking: false });
  }

  checkNovel = _.debounce(() => {
    const tmp = document.getElementById('editor');
    const ptags = tmp.getElementsByTagName('p');
    let secNo = 0;
    const sections = [];
    for (let i = 0; i < ptags.length; i += 1) {
      if (ptags[i].textContent.startsWith('##')) {
        ptags[i].setAttribute('id', `sec${secNo}`);
        secNo += 1;
        sections.push(ptags[i].textContent);
      } else {
        ptags[i].removeAttribute('id');
      }
    }
    if (this.state.sections !== sections) {
      this.setState(() => ({
        sections,
      }));
    }
  }, 300);

  updateInsight = () => {
    this.setState({
      lines: this.editor.getEditor().getLines().length,
      length: this.editor.getEditor().getLength() - 1,
    });
  }

  save = isPublished => () => {
    this.setState(() => ({ isBlocking: false }));
    // 에디터를 가져져옴
    const tmp = this.editor.getEditor();
    /*
      HTML요소를 가져옴. 에디터와 따로 HTML을 사용하는 이유는
      보여줄 컨텐츠에는 a태그가 따로 있어서 이정표 이동에 사용되기 때문.
    */
    const contentHTML = tmp.container.querySelector('.ql-editor').innerHTML;
    /*
      DB에 보낼 데이터. isPublished에 따라서 아래 작동이 달라진다.
    */
    const publishData = {
      doc_number: this.state.docNo,
      author: this.props.userData,
      content: contentHTML,
      quillDelta: tmp.getContents(),
      title: this.state.title,
      published_date: Date.now(),
      todayNovel: this.props.novelData,
      tags: this.state.tags,
      isPublished,
    };

    let pendingStatus = 'tmpSavePending';

    if (isPublished) {
      pendingStatus = 'publishPending';
      if (this.state.title === '') {
        AppToaster.show({
          message: '소설 게시에는 반드시 제목이 필요합니다',
          intent: Intent.DANGER,
        });
        return;
      }
      if (this.state.tags.length === 0) {
        AppToaster.show({
          message: '소설 게시에는 1개 이상의 태그가 필요합니다',
          intent: Intent.DANGER,
        });
        return;
      }
    }

    this.setState({
      [pendingStatus]: true,
    });

    if (this.state.isNew) {
      axios.post('/api/novella/editor', publishData)
        .then((res) => {
          this.setState({ isNew: false, docNo: res.data.docNo });
          this.successFunc(res, isPublished, pendingStatus);
        })
        .catch((res) => {
          this.failFunc(res);
        });
    } else {
      axios.put('/api/novella/editor', publishData)
        .then((res) => {
          this.successFunc(res, isPublished, pendingStatus);
        })
        .catch((res) => {
          this.failFunc(res);
        });
    }
  }

  successFunc = (res, isPublished, pendingStatus) => {
    if (res.data.success) {
      this.setState({
        [pendingStatus]: false,
        lastSaved: new Date(Date.now()).toLocaleString(),
        isBlocking: false,
      });
      AppToaster.show({
        message: isPublished ? '게시되었습니다!' : '임시 저장되었습니다',
        intent: Intent.PRIMARY,
      });
      if (pendingStatus === 'publishPending') {
        this.editor.blur();
        this.setState({ out: true });
      }
    }
  }

  failFunc = (res) => {
    console.error(res);
    AppToaster.show({
      message: '서버와 통신에 오류가 생겼습니다.',
      intent: Intent.DANGER,
    });
  }

  saveWorker = _.throttle(this.save(false), 1000 * 60 * 1);

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  render() {
    const {
      novelData,
    } = this.state;
    return (
      <Fragment>
        { this.state.out ? <Redirect to="/my-novellas" />
        :
        <div className={cx('editor')}>
          <Prompt message={(location) => {
            if (location.pathname.startsWith('/my-novellas/editor')) {
              return true;
            }
            return (!this.state.isBlocking ? true : '변경사항이 저장되지 않았습니다. 페이지를 떠나시겠습니까?');
            }}
          />
          <Card className={cx('today-novel')}>
            <div className={cx('quotation')}>
              &quot; {novelData.quotation} &quot;
            </div>
            <div className={cx('name-author')}>
              -&nbsp;{novelData.name},&nbsp;&nbsp;{this.props.novelData.author}
            </div>
          </Card>
          <Card className={cx('card-wrapper')}>
            <LeftBar
              className={cx('left-bar')}
              sections={this.state.sections}
            />
            <div className={cx('text-wrapper')}>
              <input placeholder="제목을 입력하세요" className={cx('title')} value={this.state.title} onChange={this.onChangeTitle} />
              <div id="editor">
                <ReactQuill
                  ref={(refs) => { this.editor = refs; }}
                  className={cx('text-write-area')}
                  value={this.state.text}
                  placeholder={`${novelData.quotation}...이어서 작성하세요`}
                  onChange={this.onChange}
                  modules={this.modules}
                />
              </div>
              <div className={cx('bottom-bar')} >
                <div>
                  Lines : {this.state.lines}&nbsp;&nbsp;Length: {this.state.length}
                </div>
                <div>
                  Saved: {this.state.lastSaved}
                </div>
              </div>
            </div>
          </Card>
          <Card className={cx('btm-box')}>
            <div className={cx('selection')}>
              <div>태그 입력</div>
              <Select
                name="tag-select"
                value={this.state.tags}
                options={this.state.tagData}
                onChange={this.onSelectChange}
                multi
              />
            </div>
            <div className={cx('save')}>
              {
                this.state.publishPending ?
                  <Spinner className={cx('spinner')} />
                :
                  <Button className="pt-minimal" icon="draw" text="게시" onClick={this.save(true)} />
              }
              {
                this.state.tmpSavePending ?
                  <Spinner className={cx('spinner')} />
                :
                  <Button className="pt-minimal" icon="floppy-disk" text="저장" onClick={this.save(false)} />
              }
            </div>
          </Card>
        </div>
        }
      </Fragment>
    );
  }
}

TextEditor.defaultProps = {
  docNumber: 0,
};

export default TextEditor;
