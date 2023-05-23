import React ,{useState,useRef} from 'react';
import JobFeed from './JobFeed';
import JobDetails from './JobDetails';
import './Home.scss';
import { ErrorBoundary,Searchbar, Location, Highlights } from '../../components';
import  FormData  from '../../components/DataModels/FormData';
import data from '../../components/SearchBar/data';
import { fetchJobs } from '../../services/Jobs';
import { Job } from '../../components/DataModels/Job';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchRecomendedJobs } from '../../services/Jobs';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useHistory } from 'react-router-dom';
const shuffle = (array:Job[]) => {
  for( var i=array.length-1;i>0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const Home = () => {
  const [currentJob,setCurrentJob]= useState(null);
  const [view,setView]= useState('hide');
  const history = useHistory();
  const [jobs,setJobs]=React.useState([]);
  const [selectedJob,setSelectedJob]=React.useState('');
  const [job,setJob] =React.useState([]);
  const [page,setPage]=React.useState(0);
  const [checkHasMore,setCheckHasMore]=React.useState(true);
  const [recomendedJobs,setRecomendedJobs]=React.useState([]);
  const [slidingPage,setSlidingPage ] = useState(0);
  const [ location, setLocation ] = useState('');
  const [ jobTitle, setJobTitle ] = useState('');

  const updateLocation = (value:string)=>{
    setLocation(value);
  };
  const updateJobTitle = (value:string)=>{
    setJobTitle(value);
  };

  const jobSliderRef = useRef(null);
  const nextJob = () => {
    jobSliderRef.current.slickNext();
  };
  const previousJob = () => {
    jobSliderRef.current.slickPrev();
  };
  const jobSlides = Math.round(window.screen.width/400);
  const jobSlideSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: jobSlides,
    slidesToScroll: 1,
    autoPlay: true,
    autoPlaySpeed: 1000 
  };

  const logoSliderRef = useRef(null);
    
  const nextLogo = () => {
    logoSliderRef.current.slickNext();
  };

  const previousLogo = () => {
    logoSliderRef.current.slickPrev();
  };
  const logoSlides = Math.round(window.screen.width/200);
  const logoSlideSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: logoSlides,
    slidesToScroll: 1,
    autoPlay: true,
    autoPlaySpeed: 1000 
  };
  const fetchData=async(page:number)=>{
    const res = await fetchJobs(page);
    if(res.data.length==0){
      setCheckHasMore(false);
      return ;
    }
    if(res){
      const newJobs = res.data;
      shuffle(newJobs);
      setJobs([...jobs,...newJobs]);
      setCurrentJob(newJobs[0]);
      setView('show');
    }
  };
  const fetchRecomendedData=async(slidingPage:number)=>{
    const res = await fetchRecomendedJobs(slidingPage);
    if(res){
      const newJobs=res.data;
      shuffle(newJobs);
      setRecomendedJobs(newJobs);
    }
  };
  React.useEffect(()=>{
    fetchRecomendedData(slidingPage);
    fetchData(page);
  },[slidingPage,page]);
  React.useEffect(()=>{
    let filteredJobs=jobs;
    if(filteredJobs){
      filteredJobs=jobs.filter(item => item.job.title.toLowerCase().includes(selectedJob.toLowerCase()));
    }
    setJob(filteredJobs);
  },[recomendedJobs,jobs]);
  const handleJobSelect=(jobName:string)=>{
    setSelectedJob(jobName);
  };

  const jobClick=(job:Job,currentView:string)=>{
    setView(currentView);
    setCurrentJob(job);
  };
  const gotoSearch = (title: string,location:string) => {
    history.push({
      pathname:'/search',
      state: {jobTitle: title,locationValue: location}
    });
    return ;
  };
  const gotoSearchByCompany = (value:string) =>{
    history.push({
      pathname:'/search',
      state: {company:value}
    });
    return ;
  };
  
  return (
    <ErrorBoundary>
      <div className="contentbox">
        <div className="top">
          <div className='inputForm'>
            <div className="searchBar">
              <Searchbar data={data} onJobSelect={handleJobSelect} update={updateJobTitle}/>
            </div>
            <div className='locationBar'>
              <Location  update={updateLocation}  />
            </div>
            <div className='searchIcon' onClick={()=>gotoSearch(jobTitle, location)}>
              <span>Search </span>
              <FA icon={faSearch}></FA>
            </div>
          </div>
          <Highlights />
        </div>
        <div className="middle">
          {recomendedJobs.length!==0 &&
          <div className="carousel-container">
            <Slider {...jobSlideSettings} ref={jobSliderRef}>
              {recomendedJobs.map((element:Job)=>(
                <JobFeed key={element.job.title} jobd={element} jobClick={jobClick} isHome={true}  />
              ))}

            </Slider>
            <div className='slideJobBtns'>
              <button className="jobPrevButton" onClick={previousJob}>
                <FA icon={faArrowLeft} />
              </button>
              <button className="jobNextButton" onClick={nextJob}>
                <FA icon={faArrowRight} />
              </button>
            </div>
          </div>
          }
        </div>
        {recomendedJobs.length<=logoSlides &&
        <div className="carousel-container-default">
          {recomendedJobs.map((element)=>(
            <div className="carousel-card" key={element._id}>
              <div 
                className="card-content" 
                onClick={()=>gotoSearchByCompany(element.company.name)}>
                <img src={element.company.logo} alt="Text" />
                <h1>{element.company.name}</h1>
              </div>
            </div>
          ))}
        </div>
        }
        {recomendedJobs.length>logoSlides &&
        <div className="carousel-container">
          <Slider {...logoSlideSettings} ref={logoSliderRef}>
            {recomendedJobs.map((element)=>(
              <div className="carousel-card" key={element._id}>
                <div 
                  className="card-content" 
                  onClick={()=>gotoSearchByCompany(element.company.name)}>
                  <img src={element.company.logo} alt="Text" />
                  <h1>{element.company.name}</h1>
                </div>
              </div>
            ))}
          </Slider>
          <div className='slideBtns'>
            <button className="prevButton" onClick={previousLogo}>
              <FA icon={faArrowLeft} />
            </button>
            <button className="nextButton" onClick={nextLogo}>
              <FA icon={faArrowRight} />
            </button>
          </div>
        </div>
        }
      </div>
    </ErrorBoundary>
  );
};

export default Home;