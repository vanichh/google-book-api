import ListBooks from './../../components/ListBooks/ListBooks';
import { useSelector, useDispatch } from 'react-redux';
import { selectList, selectsumBook, selecturl, setList, setlistNamber, selectlistNamber } from './../../store/card';
import { Route, Switch } from 'react-router-dom';
import InfoBook from './../../components/InfoBook/InfoBook';
import './main.css';

export default function Main() {
  const list = useSelector(selectList);
  const sumBook = useSelector(selectsumBook);
  const listNum = useSelector(selectlistNamber);
  const dispatch = useDispatch();
  let url = useSelector(selecturl);
  let button = (
    <div className='w-100'>
      <button className='list__button' onClick={loadingBook}>
        Load more
      </button>
    </div>
  );
  function loadingBook() {
    url = url.split('');
    url[url.length - 1] = listNum;
    url = url.join('');

    fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch(setList([...list, ...response.items]));
        dispatch(setlistNamber(listNum + 30));
      });
  }
  return (
    <Switch>
      <>
        <Route exact path='/'>
          <main className='list'>
            {list.map((item, index) => (
              <ListBooks key={index} info={item.volumeInfo} id={item.id} />
            ))}
            {sumBook - listNum > 30 ? button : false}
          </main>
        </Route>
        {list.map((item, index) => (
          <Route key={index} path={`/${item.id}`} component={InfoBook} />
        ))}
      </>
    </Switch>
  );
}
