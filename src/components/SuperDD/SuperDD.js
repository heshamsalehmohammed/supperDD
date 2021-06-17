import './SuperDD.css';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import {updateDataList} from '../Redux/actions';

const SuperDD = React.memo((props) => {
  const {
    DataList,
    DisplayBy,
    PlaceHolder = 'Select Items ...',
    ShowUpdateButton = true,
    ShowCancelButton = true,
    UpdateAction = () => {},
    CancelAction = () => {},
    Filterable = true,
  } = props;

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const reduxDataList = useSelector((state) => state.dataList);

  const getInitLocalDataList = () => {
    if (reduxDataList && reduxDataList.length > 0) {
      return reduxDataList;
    } else {
      return DataList?.map((dl) => ({...dl, isSelected: false})) ?? [];
    }
  };

  const [localDataList, setLocalDataList] = useState(getInitLocalDataList());

  useEffect(() => {
    setLocalDataList(getInitLocalDataList());
  }, [reduxDataList]);

  const supperDDSelectBoxRef = useRef(null);
  const supperDDSelectOutputRef = useRef(null);

  const handleCheckboxClicked = (event, objectOfList) => {
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected:
          ldl.Id == objectOfList.Id ? event.target.checked : ldl.isSelected,
      }))
    );
  };

  const getLiListItems = () => {
    return localDataList
      .filter((ldl) => {
        return (
          ldl[DisplayBy].toLowerCase().indexOf(search?.toLowerCase()) !== -1
        );
      })
      .map((value, index) => {
        return (
          <div
            key={index}
            className={
              'supperDDcheckbox-container' +
              (value.isSelected ? ' supperDDcheckbox-active' : '')
            }>
            <input
              type="checkbox"
              className="supperDDcheckbox"
              onChange={(e) => handleCheckboxClicked(e, value)}
              checked={value.isSelected}
            />
            <label className="supperDDcheckbox-label">{value[DisplayBy]}</label>
          </div>
        );
      });
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectAll = (e) => {
    if (localDataList.every((ldl) => ldl.isSelected)) {
      //deselect all
      deselectAll();
    } else {
      //select all
      selectedAll();
    }
  };

  const deselectAll = () => {
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected: false,
      }))
    );
  };

  const selectedAll = () => {
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected: true,
      }))
    );
  };

  const updateButtonClickHandler = (e) => {
    dispatch(updateDataList(localDataList));
    UpdateAction();
  };
  const cancelButtonClickHandler = (e) => {
    CancelAction();
    toggleShow();
  };

  const toggleShow = (e) => {
    supperDDSelectBoxRef.current.classList.toggle('show');
  };

  const isAllSelected = () => {
    return localDataList.every((dl) => dl.isSelected);
  };

  return (
    <div className="supperDD">
      <div className="superdd-select-wrapper">
        <div className="superdd-select">
          <div
            onClick={(e) => toggleShow(e)}
            ref={supperDDSelectOutputRef}
            className="superdd-select-output">
            <p>{PlaceHolder}</p>
          </div>
          <div ref={supperDDSelectBoxRef} className="superdd-select-box">
            {Filterable && (
              <div className="superdd-search-input-container">
                <input
                  className="superdd-search-input"
                  onChange={onSearchChange}
                  type={'text'}
                />
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e)}
                    className={'superdd-selectall-input supperDDcheckbox'}
                    style={{marginTop: '0.75em'}}
                    title={'Select All'}
                    checked={isAllSelected()}
                  />
                  <label>Select All</label>
                </div>
              </div>
            )}
            {getLiListItems()}
            <div className="superdd-select-buttons">
              {ShowUpdateButton && (
                <button
                  onClick={(e) => updateButtonClickHandler(e)}
                  type="button">
                  Update
                </button>
              )}
              {ShowCancelButton && (
                <button
                  onClick={(e) => cancelButtonClickHandler(e)}
                  type="button">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default connect((state) => ({
  score: state.dataList,
}))(SuperDD);
