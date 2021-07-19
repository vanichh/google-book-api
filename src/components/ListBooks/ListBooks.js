import { NavLink } from 'react-router-dom';
import './list-books.css';

export default function ListBooks(props) {
  let srcImg = `http://books.google.com/books/content?id=${props.id}&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api'`;
  return (
    <NavLink to={`/${props.id}`} className='card'>
      <img className='card__img' src={srcImg} alt={props.info.title} />
      <p className='card__text'>{props.info.categories ? props.info.categories[0] : ' '}</p>
      <h4 className='card__h4'>{props.info.title ? props.info.title : ' '}</h4>
      <p className='card__text'>{props.info.authors ? props.info.authors.map(item => item + ', ') : ' '}</p>
    </NavLink>
  );
}
