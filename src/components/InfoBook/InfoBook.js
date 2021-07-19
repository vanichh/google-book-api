import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import './info-Book.css';
export default function InfoBook() {
  const match = useRouteMatch();
  const [ur, setUr] = useState();
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes${match.url}`)
      .then(respone => respone.json())
      .then(respone => {
        const info = respone.volumeInfo;
        setUr(
          <div className='info-Book'>
            <NavLink to='/' className='info-Book__w100'>
              <button className='info-Book__btn'>Назад</button>
            </NavLink>
            <h2 className='info-Book__h2'>{info.title}</h2>
            <img className='info-Book__img' src={info.imageLinks.medium} alt={respone.volumeInfo.title} />
            <p>Categories: {info.categories}</p>
            <p>Date of publication: {info.publishedDate}</p>
            <p>Authors: {info.authors}</p>
            <p>{info.description}</p>
          </div>
        );
      });
  }, [match.url, setUr]);

  return <main>{ur}</main>;
}
