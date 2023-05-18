import React from 'react';
import JobDetails from '../Home/JobDetails';
import JobFeed from '../Home/JobFeed';
import { getJobByUser } from '../../services/Jobs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Job } from '../../components/DataModels/Job';

const User=()=>{
  const [jobs,setJobs]=React.useState([]);
  const [currentJob,setCurrentJob]= React.useState(null);
  const [view,setView]= React.useState('hide');
  const [page,setPage]=React.useState(0);
  const [hasMoreJobs,setHasMoreJobs]=React.useState(true);
  const jobClick=(job: Job,currentView:string)=>{
    setView(currentView);
    setCurrentJob(job);
  };
  React.useEffect(()=>{
    const fetchData=async(page:Number) => {
      const res = await getJobByUser(page);
      if(res.data.length==0){
        setHasMoreJobs(false);
        return;
      }
      if(res){
        setJobs([...jobs,...res.data]);
      }
      
    };
    fetchData(page);

  },[]);
  
  return(
    <div>
      <div className="contentbox">
        <div className="top">
          History of Jobs you posted
        </div>
        <div className="down">
          <div className={view==='hide'?'show':window.screen.width>900?'show':'hide'}>
            <InfiniteScroll
              hasMore={hasMoreJobs}
              next={()=>setPage(jobs.length)}
              dataLength={jobs.length}
              loader={<h4>Loading......</h4>}
            >
              { jobs.map((element: Job)=>(
                <JobFeed key={element._id} jobd={element} jobClick={jobClick} />
              )) }
            </InfiniteScroll>
          </div>
          <div className={view}>
            {currentJob && <JobDetails key={currentJob._id} jobd={currentJob} jobClick={jobClick} disablePreview={null} isHome={true}  />}
          </div>
        </div>
      </div>
      {!hasMoreJobs && <h4>No more jobs....</h4>}
    </div>
  );
};
export default User;