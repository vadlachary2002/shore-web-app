import React from 'react';
import './Location.scss';
interface city {
    id: number;
    name: string;
    state: string;
}
interface Props{
  update: (value:string)=>void,
}

const Location = (props:Props) => {

  const { update } = props;
  const [location, setLocation] = React.useState('');
  const [cityData, setCityData] = React.useState([]);
  const [searchResult, setSearchResult] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(true);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const filteredData = cityData.filter((items) =>
      items.name.toLowerCase().includes(location.toLowerCase())
    );
    setSearchResult(filteredData);
  };
  React.useEffect(() => {
    if (location) {
      fetch('../../../public/cities.json')
        .then((response) => response.json())
        .then((data) => setCityData(data));
    }
  }, [location]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation((updatedLocation)=>{
      update(event.target.value);
      return event.target.value;
    });
    setIsOpen(true);
  };
  const handleClick = (value:string) => {
    setLocation((updatedLocation)=>{
      update(value);
      return value;
    });
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="location">
          <input type="search" value={location} onChange={handleChange} placeholder="Enter Location" />
        </div>
        {location.length > 0 && isOpen && (
          <div className="searchResultRight">
            {location.length > 0 && isOpen &&
                      cityData.filter((item) => item.name.toLowerCase().includes(location.toLowerCase()))
                        .map((item) => (
                          <div key={item.id}>
                            <option onClick={()=>handleClick(item.name)} value={item.name} id="options">
                              {item.name},{item.state}
                            </option>
                          </div>
                        ))}
          </div>
        )}
      </form>
    </>
  );
};

export default Location;
