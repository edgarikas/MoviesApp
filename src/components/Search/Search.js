import './Search.css';

function Search({ onChange }) {
  return (
    <div className='search'>
      <p className='search__label'>Do you wanna search a movie? So do it 🔎 </p>
      <input placeholder='Search Movie' onChange={onChange} />
    </div>
  );
}

export default Search;
