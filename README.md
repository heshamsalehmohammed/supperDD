# SuperDD

Very useful react component for multi selection dropdown with filtering, 
toggle selecting all, tags outside the dropdown and custom button inside dropdown

![Alt Text](src/ReadMe/supperdd.gif)

## Installation

```bash
npm install superdd
```

## Usage

```python
import {SuperDD, TagsContainer} from 'superdd/dist/index';

const Home = (props) => {
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

  return (
    <div className="m-5" style={{width: '250px'}}>
      <SuperDD
        DataList={listData}
        DisplayBy={'Code'}
        PlaceHolder={'Select Platforms'}
        ShowUpdateButton={true}
        ShowCancelButton={true}
        Filterable={true}
        SetSelectedItems={setSelectedItems}
        UpdateAction={onUpdateAction}
        Sortable={true}
      />
      <br />
      <TagsContainer
        DisplayBy={'Code'}
        TagsHasDeselect={true}
        ContainerHasDeselect={true}
      />
    </div>
  );
};

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
