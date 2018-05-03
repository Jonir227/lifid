import React, { Fragment } from 'react';
import { TodayNovel, NovellaList } from 'components';

class ContentBody extends React.Component {
  state = {
    novelData: [{
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;tlkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'novelName',
      author: 'bjbj6363@gmail.com',
      authorInfo: '나는 글을 씁니다. SF를 좋아해요',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    ],
  }

  render() {
    return (
      <Fragment>
        <TodayNovel style={{ padding: 5 }} novelData={this.props.novelData} />
        <NovellaList novelData={this.state.novelData} />
      </Fragment>
    );
  }
}

export default ContentBody;
