import './SuperDD.css';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateDataList, setUniqueKey} from '../Redux/actions';
import {SortState} from '../Common/enums';

const SuperDD = React.memo((props) => {
  const {
    DataList,
    UniqueKey,
    DisplayBy,
    PlaceHolder = 'Select Items ...',
    ShowUpdateButton = true,
    ShowCancelButton = true,
    UpdateAction = () => {},
    CancelAction = () => {},
    Filterable = true,
    Sortable = true,
    SetSelectedItems,
    CloseAfterEachUpdate = false,
    SelectFiltered = false,
    GlobalUniqueId,
  } = props;

  if (!UniqueKey) {
    throw new Error('UniqueKey of your data must be provided');
  }
  if (!GlobalUniqueId) {
    throw new Error('GlobalUniqueId of your data must be provided');
  }

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const [isShown, setIsShown] = useState(false);

  const [sortState, setSortState] = useState(SortState.None);

  const reduxDataList = useSelector(
    (state) => state[GlobalUniqueId]?.dataList ?? []
  );

  const getInitLocalDataList = (fromRedux = true) => {
    if (fromRedux && reduxDataList.length > 0) {
      return reduxDataList;
    } else {
      return DataList?.map((dl) => ({...dl, isSelected: false})) ?? [];
    }
  };

  const [localDataList, setLocalDataList] = useState(getInitLocalDataList());

  useEffect(() => {
    dispatch(setUniqueKey(UniqueKey));
  }, [UniqueKey, GlobalUniqueId]);

  useEffect(() => {
    if (reduxDataList.map((rdl) => rdl.isSelected).toString() != '') {
      setLocalDataList(getInitLocalDataList());
      updateUser();
    }
  }, [reduxDataList.map((rdl) => rdl.isSelected).toString()]);

  useEffect(() => {
    dispatch(updateDataList([], GlobalUniqueId));
    setLocalDataList(getInitLocalDataList(false));
  }, [GlobalUniqueId, DataList.map((rdl) => rdl[UniqueKey]).toString()]);

  const handleCheckboxClicked = (event, objectOfList) => {
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected:
          ldl[UniqueKey] == objectOfList[UniqueKey]
            ? event.target.checked
            : ldl.isSelected,
      }))
    );
  };

  const getFilteredLocalDataList = () => {
    return localDataList.filter((ldl) => {
      return ldl[DisplayBy].toLowerCase().indexOf(search?.toLowerCase()) !== -1;
    });
  };

  const getLiListItems = () => {
    let filteredDataLocalList = getFilteredLocalDataList();
    let sortedDataLocalList = filteredDataLocalList;
    if (
      (sortState == SortState.Asc || sortState == SortState.Des) &&
      Sortable
    ) {
      sortedDataLocalList = filteredDataLocalList.sort(function (a, b) {
        var nameA = a[DisplayBy].toUpperCase();
        var nameB = b[DisplayBy].toUpperCase();
        if (nameA < nameB) {
          if (sortState == SortState.Asc) return -1;
          else return 1;
        }
        if (nameA > nameB) {
          if (sortState == SortState.Asc) return 1;
          else return -1;
        }
        return 0;
      });
    }
    return sortedDataLocalList.map((value, index) => {
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

  const handleSelectAll = () => {
    if (isAllSelected()) {
      deselectAll();
    } else {
      selectedAll();
    }
  };

  const handleSelectAllFiltered = () => {
    if (isAllFilteredSelected()) {
      deselectAllFiltered();
    } else {
      selectedAllFiltered();
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

  const deselectAllFiltered = () => {
    let filteredDataLocalList = getFilteredLocalDataList();
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected:
          filteredDataLocalList.findIndex(
            (fdll) => fdll[UniqueKey] === ldl[UniqueKey]
          ) != -1
            ? false
            : ldl.isSelected,
      }))
    );
  };

  const selectedAllFiltered = () => {
    let filteredDataLocalList = getFilteredLocalDataList();
    setLocalDataList(
      localDataList.map((ldl) => ({
        ...ldl,
        isSelected:
          filteredDataLocalList.findIndex(
            (fdll) => fdll[UniqueKey] === ldl[UniqueKey]
          ) != -1
            ? true
            : ldl.isSelected,
      }))
    );
  };

  const updateUser = () => {
    const returnedSelectedItems = [
      ...reduxDataList
        .filter((ldl) => ldl.isSelected)
        .map((ldl) => {
          const {isSelected, ...originalObject} = ldl;
          return originalObject;
        }),
    ];
    if (SetSelectedItems) {
      SetSelectedItems(returnedSelectedItems);
    }
    UpdateAction(returnedSelectedItems);
  };

  const updateButtonClickHandler = () => {
    dispatch(updateDataList(localDataList, GlobalUniqueId));
    if (CloseAfterEachUpdate) {
      toggleShow();
    }
  };

  const cancelButtonClickHandler = () => {
    CancelAction();
    toggleShow();
  };

  const toggleShow = () => {
    if (isShown) {
      setIsShown(false);
      setSearch('');
    } else {
      setIsShown(true);
    }
  };
  /** @returns {boolean} */
  const isAllSelected = () => {
    return localDataList.every((dl) => dl.isSelected);
  };

  const isAllFilteredSelected = () => {
    return getFilteredLocalDataList().every((dl) => dl.isSelected);
  };

  const getSortStateSpan = () => {
    if (!Sortable) return '';
    switch (sortState) {
      case SortState.None:
        return <span>&#10607;</span>;
      case SortState.Asc:
        return <span>&#10595;</span>;
      case SortState.Des:
        return <span>&#10597;</span>;
      default:
        return '';
    }
  };

  const incrementSortState = () => {
    switch (sortState) {
      case SortState.None:
        setSortState(SortState.Asc);
        break;
      case SortState.Asc:
        setSortState(SortState.Des);
        break;
      case SortState.Des:
        setSortState(SortState.None);
        break;
      default:
        break;
    }
  };

  return (
    <div className="supperDD">
      <div className="superdd-select-wrapper">
        <div className="superdd-select">
          <div
            onClick={toggleShow}
            className={
              isShown ? 'superdd-select-output active' : 'superdd-select-output'
            }>
            <p>{PlaceHolder}</p>
            <div className="icon">
              <div className="dropdown"></div>
            </div>
          </div>
          <div
            className={
              isShown ? 'superdd-select-box show' : 'superdd-select-box'
            }>
            {Filterable && (
              <div className="superdd-search-input-container">
                <input
                  className="superdd-search-input"
                  onChange={onSearchChange}
                  value={search}
                  type={'text'}
                />
                {getFilteredLocalDataList().length === 0 && (
                  <div className="superdd-selectall-container-no-items">
                    No items Found
                  </div>
                )}
                {getFilteredLocalDataList().length > 0 && (
                  <div className="superdd-selectall-container">
                    <div className="selectall-checkbox">
                      <input
                        type="checkbox"
                        onChange={
                          SelectFiltered
                            ? handleSelectAllFiltered
                            : handleSelectAll
                        }
                        className={'superdd-selectall-input supperDDcheckbox'}
                        title={'Select All'}
                        checked={
                          SelectFiltered
                            ? isAllFilteredSelected()
                            : isAllSelected()
                        }
                      />
                      <label>Select All</label>
                    </div>
                    <div onClick={incrementSortState} className="sort-button">
                      {getSortStateSpan()}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="supperDDcheckbox-list-container">
              {getLiListItems()}
            </div>
            <div className="superdd-select-buttons">
              {ShowUpdateButton && (
                <button onClick={updateButtonClickHandler} type="button">
                  Update
                </button>
              )}
              {ShowCancelButton && (
                <button onClick={cancelButtonClickHandler} type="button">
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

export default SuperDD;
