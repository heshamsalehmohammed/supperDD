import './TagsContainer.css';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import {deselectAll, updateDataList} from '../Redux/actions';
import PropTypes from 'prop-types';

const TagsContainer = React.memo((props) => {
  const {
    DisplayBy = 'Id',
    TagsHasDeselect = true,
    ContainerHasDeselect = true,
  } = props;

  const dispatch = useDispatch();

  const reduxDataList = useSelector((state) => state.dataList);

  useEffect(() => {
    setTags(reduxDataList?.filter((dl) => dl.isSelected) ?? []);
  }, [reduxDataList]);

  const [tags, setTags] = useState(
    reduxDataList?.filter((dl) => dl.isSelected) ?? []
  );

  const removeTags = (e, tag) => {
    dispatch(
      updateDataList([
        ...reduxDataList.map((dl) => ({
          ...dl,
          isSelected: dl.Id == tag.Id ? false : dl.isSelected,
        })),
      ])
    );
  };

  const closeButtonHandler = (e) => {
    dispatch(deselectAll());
  };

  return (
    <div className="tags-container">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag[DisplayBy]}</span>
            {TagsHasDeselect && (
              <span
                className="tag-close-icon"
                onClick={(e) => removeTags(e, tag)}>
                &#10006;
              </span>
            )}
          </li>
        ))}
      </ul>
      {tags.length > 1 && ContainerHasDeselect && (
        <button onClick={closeButtonHandler} className="close-button">
          &#10006;
        </button>
      )}
    </div>
  );
});

TagsContainer.propTypes = {
  DisplayBy: PropTypes.string,
  TagsHasDeselect: PropTypes.bool,
  ContainerHasDeselect: PropTypes.bool,
};

export default TagsContainer;
