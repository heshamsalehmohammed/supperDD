import './TagsContainer.css';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deselectAll, updateDataList} from '../Redux/actions';

const TagsContainer = React.memo((props) => {
  const {
    DisplayBy,
    TagsHasDeselect = true,
    ContainerHasDeselect = true,
  } = props;

  if (!DisplayBy) {
    throw new Error("the DisplayBy must be provided to TagsContainer");
  }

  const dispatch = useDispatch();

  const reduxDataList = useSelector((state) => state.dataList);
  const uniqueKey = useSelector((state) => state.uniqueKey);

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
          isSelected: dl[uniqueKey] == tag[uniqueKey] ? false : dl.isSelected,
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


export default TagsContainer;
