import React, {useState, useEffect, useRef} from 'react';
import {storiesOf} from '@storybook/react';
import {getMovies} from '../services/movieService';

//import {SuperDD, TagsContainer} from '../../dist/index';
import {SuperDD, TagsContainer} from '../components/index';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
  // try with dynamic data list retrieved from some Api
  /*   const [retrievedDataList, setRetrievedDataList] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const {data: movies} = await getMovies();
      setRetrievedDataList(movies);
    }
    fetchMyAPI();
  }, []); */

  // try with static data
  let retrievedDataList = [
    {Id: 3, title: 'ccc', Name: 'Hello3', Discription: 'anything3'},
    {Id: 1, title: 'aaa', Name: 'Hello1', Discription: 'anything1'},
    {Id: 4, title: 'ddd', Name: 'Hello4', Discription: 'anything4'},
    {Id: 2, title: 'bbb', Name: 'Hello2', Discription: 'anything2'},
    {Id: 7, title: 'hhh', Name: 'Hello4', Discription: 'anything4'},
    {Id: 5, title: 'fff', Name: 'Hello4', Discription: 'anything4'},
    {Id: 8, title: 'lll', Name: 'Hello4', Discription: 'anything4'},
    {Id: 6, title: 'ggg', Name: 'Hello4', Discription: 'anything4'},
  ];

  // to get the selected data
  // whither on the update action
  // or deselecting from the TagsContainer
  const [selectedItems, setSelectedItems] = useState();
  useEffect(() => {
    console.log('from setSelectedItems', selectedItems);
  }, [selectedItems]);

  const onUpdateAction = (superDDSelectedItems) => {
    console.log('from update function', superDDSelectedItems);
  };

  const [deselectAllSelected, setDeselectAllSelected] = useState(false);

  const deselectButtonHandler = () => {
    setDeselectAllSelected(true);
  };

  return (
    <>
      <button onClick={deselectButtonHandler}> Deselect Selected </button>
      <div className="m-5" style={{width: '225px'}}>
        <SuperDD
          DataList={retrievedDataList} // list of objects
          UniqueKey={'Id'} // object unique key - must be unique per object
          DisplayBy={'title'}
          PlaceHolder={'Select Movies'}
          ShowUpdateButton={true}
          ShowCancelButton={true}
          Filterable={true}
          SetSelectedItems={setSelectedItems}
          UpdateAction={onUpdateAction}
          Sortable={true}
          CloseAfterEachUpdate={true}
          SelectFiltered={true}
          GlobalUniqueId={'hesham'}
        />
      </div>
      <br />
      <div className="m-5" style={{width: '500px', marginTop: '270px'}}>
        <TagsContainer
          DisplayBy={'title'}
          TagsHasDeselect={true}
          ContainerHasDeselect={true}
          DeselectAll={deselectAllSelected}
          DeselectAllSetter={setDeselectAllSelected}
          maxTagsBeforeShowMore={3}
          GlobalUniqueId='hesham'
        />
      </div>
    </>
  );
});
