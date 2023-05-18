import React, { useState } from 'react';
import './SearchPage.scss';
import { Highlights } from '../../components';
import { SearchData } from '../../components/DataModels/SearchData';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Job } from '../../components/DataModels/Job';
import { fetchJobs, getSearchJobs } from '../../services/Jobs';
import JobFeed from '../Home/JobFeed';
import { DropDown } from './SeachUtils/DropDown';
import { selectSearch } from '../../store/SearchContent/selector';
import { updateSearch } from '../../store/SearchContent/reducer';
import { RootState } from '../../store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
const  defaultSearch:SearchData= {
  jobTitle:'',
  location:'',
  salary:0,
  discipline:[],
  country:[],
  sector:[],
};

const SearchPage = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const searchStatus= useSelector((state:RootState)=>{
    return selectSearch(state);
  });
  const [ search , setSearch ] = useState(()=>{
    console.log('ss',searchStatus.status);
    if(location.state){
      const { jobTitle, locationValue } = location.state;
      if(jobTitle || locationValue){
        defaultSearch.jobTitle= jobTitle,
        defaultSearch.location = locationValue;
        return defaultSearch;
      }
    }
    return searchStatus.status;
  });
  const [discipline, setDicipline] = useState(()=>searchStatus.status.discipline);
  const [sector, setSector] = useState(()=>searchStatus.status.sector);
  const [country, setCountry] = useState(()=>searchStatus.status.country);

  const [jobs,setJobs]=React.useState([]);
  const [checkHasMore,setCheckHasMore] = useState(true);
  const [ page, setPage ] = useState(0);
  const disciplines = ['Life Sciences', 'Physics', 'Biomedicine','Health Sciences','Engineering','Chemistry','Computer Science','Applied Science','Nanotechnology','Earth Sciences','Environmental','Sciences','Veterinary','Fisheries','Agriculture','Forestry'];
  const sectors = ['Academia','Industry','Government','Healthcare/Hospital','Non-Profit','Media/Communications'];
  const countries = ['North America','Europe','Asia','South America','Asia Pacific','Australia','Middle East','Oceania','Working from home'];
  const fetchData=async(page:number)=>{
    const res = await fetchJobs(page);
    if(res.data.length==0){
      setCheckHasMore(false);
      return ;
    }
    if(res){
      const newJobs = res.data;
      setJobs([...jobs,...newJobs]);
    }
  };
  React.useEffect(()=>{
    fetchData(page);
  },[page]);
  const updateArray = (field:string,value:string[])=>{
    if(field==='discipline'){
      setDicipline(value);
      return ;
    }
    if(field==='sector'){
      setSector(value);
      return ;
    }
    setCountry(value);
  };
  const updateSearchContents = ( field:string,value:string|number|string[]) => {
    console.log(search.discipline);
    setSearch((prevSearch)=>{
      const updatedSearch = {
        ...search,
        [field]:value,
      };
      dispatch(updateSearch({status:updatedSearch}));
      return {
        ...prevSearch,
        [field]: value,
      };
    });
  };
  const onSubmit = (e:any )=>{
    e.preventDefault();
    const searchJobs = getSearchJobs(search,page);
    return ;
  };
  const resetForm = ()=>{
    localStorage.removeItem('search');
    setSearch(defaultSearch);
  };
  return (
    <div className="viewBox">
      <Highlights />
      <div className="jobsCount">
        <h1>Found 59 Jobs that matches your search</h1>
      </div>
      <div className="search">
        <div className="searchFields">
          <form onSubmit={onSubmit} >
            <div className='inputContent'>
              <label> Job Title </label>
              <input 
                type="text"  
                placeholder='eg:Research Scientist' 
                onChange={(e)=>updateSearchContents('jobTitle',e.target.value)}
                value={search.jobTitle}
              />
            </div>
            <div className='inputContent'>
              <label> Location </label>
              <input 
                type="text" 
                placeholder='eg:Bangloor'
                onChange={(e)=>updateSearchContents('location',e.target.value)}
                value={search.location}
              />
            </div>
            <div className='inputContent'>
              <label> Salary </label>
              <input type="range" onChange={(e)=>updateSearchContents('salary',e.target.value)} value={search.salary} />
              <label className='flex space-around text-small'>
                <span>1K</span>
                <span>2K</span>
                <span>5K</span>
                <span>10K</span>
                <span>20K</span>
              </label>
            </div>
            <DropDown values={disciplines} name={'discipline'} updateSearchContents={updateSearchContents} selected={discipline} updateArray={updateArray} />
            <DropDown values={sectors} name={'sector'} updateSearchContents={updateSearchContents} selected={sector} updateArray={updateArray} />
            <DropDown values={countries} name={'country'} updateSearchContents={updateSearchContents}selected={country} updateArray={updateArray} />
            <div className='btnFlex'>
              <input type="submit"  value='Clear' onClick={resetForm} />
              <input type="submit"  value='Search' />
            </div>
          </form>
        </div>
        <div className="searchContent">
          <InfiniteScroll
            dataLength={jobs.length}
            hasMore={checkHasMore}
            next={()=>setPage(jobs.length)}
            loader={<h4>Loading...</h4>}
          >
            { 
              jobs.map((element:Job)=>(
                <JobFeed key={element._id} jobd={element} jobClick={null}  viewBtn={true} />
              )) 
            }
          </InfiniteScroll>
          {!checkHasMore && <h4 className='endingMessage'>We have these jobs only...</h4>}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;