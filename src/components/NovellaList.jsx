import React from 'react';
import NovellaListItem from './NovellaListItem';

const NovellaList = ({ novelData }) => (
  novelData.map(novel => (
    <NovellaListItem
      novellaName={novel.name}
      novellaContent={novel.content}
      author={novel.author}
    />
  ))
);

export default NovellaList;
