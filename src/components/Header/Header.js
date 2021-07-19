import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setList, selectsumBook, setSumBook, setUrl, setlistNamber } from './../../store/card';
import './header.css';

export default function Header() {
  const sumBook = useSelector(selectsumBook);
  const dispatch = useDispatch();
  let listСategories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
  const [category, setCategory] = useState('all');
  const [order, setOrder] = useState('relevance');
  const [value, setValue] = useState('');
  let request = () => {
    const url = {
      serch: 'https://www.googleapis.com/books/v1/volumes?q=',
      subject: category === 'all' ? '' : `+subject:${category}`,
      startIndex: 'startIndex=0',
      maxResults: 'maxResults=30',
      orderBy: `orderBy=${order}`,
      value: value.split(' ').join('+'),
    };
    const loading = `${url.serch}${url.value}${url.subject}&${url.maxResults}&${url.orderBy}&${url.startIndex}`;
    fetch(loading)
      .then(response => response.json())
      .then(response => {
        dispatch(setlistNamber(30));
        dispatch(setList(response.items));
        dispatch(setSumBook(response.totalItems));
        dispatch(setUrl(loading));
      });
  };
  function onSub(e) {
    e.preventDefault();
    request();
  }
  return (
    <header className='header'>
      <h1 className='header__h1'>Search for books</h1>
      <form className='form-search' onSubmit={onSub}>
        <div className='form-search__flex'>
          <input className='form-search__search' value={value} onChange={e => setValue(e.target.value)} type='search' />
          <input className='form-search__submit' type='submit' value='Serch' />
        </div>
      </form>
      <div className='header__flex'>
        <p className='header__text'>Categores</p>
        <select className='header__select' onChange={e => setCategory(e.target.value)}>
          {listСategories.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
        <p className='header__text'>Sorting by</p>
        <select className='header__select' onChange={e => setOrder(e.target.value)}>
          <option>relevance</option>
          <option>newest</option>
        </select>
      </div>
      {sumBook === 0 ? false : <p className='header__sum-book'>Found {sumBook} results</p>}
    </header>
  );
}
