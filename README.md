# SuperDD

[Super Drop Down] is a very useful react component for multi selection dropdown 
with Filtering, Sorting,
Toggle selecting all, Tags in another component 
and Custom buttons inside dropdown with custom functions can be provided from the outside 

![Alt Text](src/ReadMe/superdd.gif)

## Installation

```bash
npm install superdd
```

## Usage

```python
import {SuperDD, TagsContainer} from 'superdd/dist/index';

const Home = (props) => {

  // try with dynamic data list retrieved from some Api
  const [retrievedDataList, setRetrievedDataList] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const {data: movies} = await getMovies();
      setRetrievedDataList(movies);
    }
    fetchMyAPI();
  }, []);

  // try with static data
  /*   let retrievedDataList = [
    {Id: 3, title: 'ccc', Name: 'Hello3', Discription: 'anything3'},
    {Id: 1, title: 'aaa', Name: 'Hello1', Discription: 'anything1'},
    {Id: 4, title: 'ddd', Name: 'Hello4', Discription: 'anything4'},
    {Id: 2, title: 'bbb', Name: 'Hello2', Discription: 'anything2'},
    {Id: 7, title: 'hhh', Name: 'Hello4', Discription: 'anything4'},
    {Id: 5, title: 'fff', Name: 'Hello4', Discription: 'anything4'},
    {Id: 8, title: 'lll', Name: 'Hello4', Discription: 'anything4'},
    {Id: 6, title: 'ggg', Name: 'Hello4', Discription: 'anything4'},
  ]; */

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

  // this part if you wanna deselect all selected from a button click 
  const [deselectAllSelected, setDeselectAllSelected] = useState(false);
  const deselectButtonHandler = () => {
    setDeselectAllSelected(true);
  };
  // then provide you button and attach the above method to it onClick={deselectButtonHandler}

  return (
    <>
      <div className="m-5" style={{width: '250px'}}>
        <SuperDD
          DataList={retrievedDataList} // list of objects
          UniqueKey={'_id'} // object unique key - must be unique per object
          DisplayBy={'title'}
          PlaceHolder={'Select Movies'}
          ShowUpdateButton={true}
          ShowCancelButton={true}
          Filterable={true}
          SetSelectedItems={setSelectedItems}
          UpdateAction={onUpdateAction}
          Sortable={true}
        />
      </div>
      <br />
      <div className="m-5" style={{width: '500px'}}>
        <TagsContainer
          DisplayBy={'title'}
          TagsHasDeselect={true}
          ContainerHasDeselect={true}
          DeselectAll={deselectAllSelected}
          DeselectAllSetter={setDeselectAllSelected}
        />
      </div>
    </>
  );
};

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
