import React from 'react';
import './SearchBar.scss';
import { FontAwesomeIcon as Font } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
interface Job {
    id: number;
    name: string;
}
interface Props{
  data: Job[];
  update: (value:string)=>void,
  onJobSelect :(jobName: String)=> void;
}
const Searchbar: React.FC<Props> = (props:Props) => {

  const { data,onJobSelect, update } = props;
  const [searchData, setSearchData] = React.useState('');
  const [searchResult, setSearchResults] = React.useState([]);
  const [selectData, setSelectData] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData((updatedSearchData)=>{
      update(event.target.value);
      return event.target.value;
    });
    setIsOpen(true);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const filteredData = data.filter((items) =>
      items.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setSearchResults(filteredData);
  };
  const handleClick = (value:string) => {
    setSearchData((updatedSearchData)=>{
      update(value);
      return value;
    });
    setIsOpen(false);
    onJobSelect(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="searchInput">
          <input id="search" type="search" placeholder="Enter Job Title" onChange={handleChange} value={searchData} />
        </div>
        {searchData.length > 0 && isOpen && (
          <div className="searchResultLeft">
            {searchData.length > 0 && isOpen && data.filter((item) => item.name.toLowerCase().includes(searchData.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="opt">
                  <option onClick={()=>handleClick(item.name)} value={item.name} id="options" >
                    {item.name}
                  </option>
                </div>
              ))}
          </div>
        )}
      </form>

    </>
  );
};
export default Searchbar;
