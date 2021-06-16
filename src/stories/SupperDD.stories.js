import React from 'react';
import {storiesOf} from '@storybook/react';

import SupperDD from '../components/SuperDD/SuperDD.jsx';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
  let listData = [
    {Id: 1, Code: 'hhh', Name: 'Hello1', Discription: 'anything1'},
    {Id: 2, Code: 'ggg', Name: 'Hello2', Discription: 'anything2'},
    {Id: 3, Code: 'fff', Name: 'Hello3', Discription: 'anything3'},
    {Id: 4, Code: 'sss', Name: 'Hello4', Discription: 'anything4'},
    {Id: 5, Code: 'sss', Name: 'Hello4', Discription: 'anything4'},
    {Id: 6, Code: 'sss', Name: 'Hello4', Discription: 'anything4'},
    {Id: 7, Code: 'sss', Name: 'Hello4', Discription: 'anything4'},
    {Id: 8, Code: 'sss', Name: 'Hello4', Discription: 'anything4'},
  ];
  return <SupperDD DataList={listData} DisplayBy={"Code"} />;
});
