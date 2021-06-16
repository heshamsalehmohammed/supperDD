import './SuperDD.css';
import React, {useState, useRef} from 'react';

const SuperDD = (props) => {
  const {
    DataList,
    DisplayBy,
    PlaceHolder = "Select Items ...",
    ShowUpdateButton = true,
    ShowCancelButton = true ,
    UpdateAction = () => {},
    CancelAction = () => {},
    SelectedLabelsOutsideIn,
    Filterable = true,
  } = props;

  const [search, setSearch] = useState('');

  const [localDataList, setLocalDataList] = useState(
    DataList.map((dl) => ({...dl, isSelected: false}))
  );

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
    if (event.target.checked) {
      const span = document.createElement('span');
      span.setAttribute('id', 'superDD___ExternalTag' + objectOfList.Id);
      span.textContent = objectOfList[DisplayBy];
      SelectedLabelsOutsideIn.current.appendChild(span);
    } else {
      document
        .getElementById('superDD___ExternalTag' + objectOfList.Id)
        .remove();
    }
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
              'supperDDcheckbox-container' + (value.isSelected ? ' Active' : '')
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
    clearSelectedlabels();
  };

  const clearSelectedlabels = () => {
    var child = SelectedLabelsOutsideIn.current.lastElementChild;
    while (child) {
      SelectedLabelsOutsideIn.current.removeChild(child);
      child = SelectedLabelsOutsideIn.current.lastElementChild;
    }
  };

  const selectedAll = () => {
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected: true,
      }))
    );
    clearSelectedlabels();
    localDataList.forEach((ldl) => {
      const span = document.createElement('span');
      span.setAttribute('id', 'superDD___ExternalTag' + ldl.Id);
      span.textContent = ldl[DisplayBy];
      SelectedLabelsOutsideIn.current.appendChild(span);
    });
  };

  const updateButtonClickHandler = (e) => {
    UpdateAction();
    toggleShow();
  };
  const cancelButtonClickHandler = (e) => {
    CancelAction();
    toggleShow();
  };

  const toggleShow = (e) => {
    supperDDSelectBoxRef.current.classList.toggle('show');
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
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e)}
                  className={'superdd-selectall-input supperDDcheckbox'}
                  style={{marginTop: '0.75em'}}
                  title={'Select All'}
                />
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
};

export default SuperDD;
