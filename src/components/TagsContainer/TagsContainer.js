import './TagsContainer.css';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {deselectAll, updateDataList} from '../Redux/actions';

const TagsContainer = React.memo((props) => {
  const {
    DisplayBy,
    TagsHasDeselect = true,
    ContainerHasDeselect = true,
    maxTagsBeforeShowMore = null,
    DeselectAll = false,
    DeselectAllSetter = () => {},
    GlobalUniqueId,
  } = props;

  if (!DisplayBy) {
    throw new Error('the DisplayBy must be provided to TagsContainer');
  }

  if (!GlobalUniqueId) {
    throw new Error('GlobalUniqueId of your data must be provided');
  }

  const dispatch = useDispatch();

  const reduxDataList = useSelector((state) => state[GlobalUniqueId]?.dataList ?? []);
  const uniqueKey = useSelector((state) => state[GlobalUniqueId]?.uniqueKey ?? 'Id');

  useEffect(() => {
    setTags(reduxDataList?.filter((dl) => dl.isSelected) ?? []);
  }, [reduxDataList]);

  const [tags, setTags] = useState(
    reduxDataList?.filter((dl) => dl.isSelected) ?? []
  );

  const removeTags = (e, tag) => {
    dispatch(
      updateDataList(
        [
          ...reduxDataList.map((dl) => ({
            ...dl,
            isSelected: dl[uniqueKey] == tag[uniqueKey] ? false : dl.isSelected,
          })),
        ],
        GlobalUniqueId
      )
    );
  };

  useEffect(() => {
    if (DeselectAll && DeselectAllSetter) {
      closeButtonHandler();
      DeselectAllSetter(false);
    }
  }, [DeselectAll]);

  const closeButtonHandler = () => {
    dispatch(deselectAll(GlobalUniqueId));
  };

  const [showMoreOpen, setShowMoreOpen] = useState(false);
  const renderShowMore = maxTagsBeforeShowMore && maxTagsBeforeShowMore > 0;

  return (
    <div className="tags-container">
      <ul id="tags">
        {tags.map((tag, index) => {
          if (
            renderShowMore &&
            index + 1 > maxTagsBeforeShowMore &&
            !showMoreOpen
          )
            return null;
          return (
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
          );
        })}
        {renderShowMore &&
          !showMoreOpen &&
          tags.length > maxTagsBeforeShowMore && (
            <li className="tag">
              <span
                className="tag-title"
                style={{cursor: 'pointer'}}
                onClick={() => {
                  setShowMoreOpen(true);
                }}>{`+${tags.length - maxTagsBeforeShowMore} More`}</span>
            </li>
          )}

        {renderShowMore && showMoreOpen && (
          <li className="tag">
            <span
              className="tag-title"
              style={{cursor: 'pointer'}}
              onClick={() => {
                setShowMoreOpen(false);
              }}>{`...Show Less`}</span>
          </li>
        )}
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
