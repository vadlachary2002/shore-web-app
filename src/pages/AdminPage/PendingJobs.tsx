import React, { useContext,useState } from 'react';
import  { Job }  from '../../components/DataModels/Job';
import JobFeed from '../Home/JobFeed';
import {fetchJobsByAdmin} from '../../services/Jobs';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props{
  openJob: (job:Job)=> void;
}
const PendingJobs = (props:Props)=> {

  const { openJob } = props;

  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [view,setView]= useState('hide');
  const [hasMoreJobs,setHasMoreJobs]=React.useState(true);
  const [page,setPage]=React.useState(0);
  const fetchPendingJobs = async (page:number) => {
    const res = await fetchJobsByAdmin(page);
    if(res.data.length===0){
      setHasMoreJobs(false);
      return ;
    }
    if(res){
      openJob(res.data[0]);
      setJobs([...jobs,...res.data]);
    }
  };
  React.useEffect(() => {
    fetchPendingJobs(page);
  }, [page]);
  return (
    <div className={view==='hide'?'show':window.screen.width>900?'show':'hide'}>
      <InfiniteScroll
        next={()=>setPage(jobs.length)}
        hasMore={hasMoreJobs}
        dataLength={jobs.length}
        loader={<h4>Loading.....</h4>}
      >
        { jobs.map((element:Job)=>(
          <JobFeed key={element._id} jobd={element} jobClick={()=>openJob(element)} />
        )) }
      </InfiniteScroll>
      {!hasMoreJobs && <h4 className='endingMessage'>We have these jobs only...</h4>}
    </div>
  );
};

export default PendingJobs;
