import React from 'react';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import LocalSuperDD from './SuperDD/SuperDD';
import LocalTagsContainer from './TagsContainer/TagsContainer';
import reducers from './Redux/reducer';


const store = createStore(reducers);

const SuperDD = (props) => {
  return (
    <Provider store={store}>
      <LocalSuperDD {...props} />
    </Provider>
  );
};

const TagsContainer = (props) => {
    return (
      <Provider store={store}>
        <LocalTagsContainer {...props} />
      </Provider>
    );
  };

export {SuperDD, TagsContainer};
