import React, { Fragment } from 'react';
import { TodayNovel, NovellaList } from 'components';

class ContentBody extends React.Component {
  state = {
    novelData: [{
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    {
      name: 'bj',
      author: 'bjbj6363',
      content: 'thsaldkfja;lkj dsalkfadlfkjldskafja;lkdjf;lkjjadsflkj',
    },
    ],
  }

  render() {
    return(
      <Fragment>
        <TodayNovel style={{ padding: 10 }} />
        <NovellaList novelData={this.state.novelData} />
      </Fragment>
    );
  }

}

export default ContentBody;
