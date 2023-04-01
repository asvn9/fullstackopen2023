import {useDispatch} from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = ({showAll, setShowAll}) => {
    const dispatch = useDispatch()

    const handleFilter = (event) => {
      setShowAll(event.target.value);
      if (event.target.value === '') {
        dispatch(filterChange('ALL'));
      } else {
        dispatch(filterChange('NON'));
      }
    }    
  
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input value={showAll} onChange={handleFilter} />
      </div>
    )
  }
  
  export default Filter