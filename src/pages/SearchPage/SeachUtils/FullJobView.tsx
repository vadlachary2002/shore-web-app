import React, { useState } from 'react';
import JobDetails from '../../Home/JobDetails';
import { useParams, useHistory } from 'react-router-dom';
import { getJobById } from '../../../services/Jobs';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './FullJobView.scss';

export const FullJobView = () => {

  const { jobId } = useParams();
  const history = useHistory();
  const [ error, setError ] = useState('');
  const [ job, setJob ] = useState(null);
  const [ loading, setLoading] = useState(true);
 
  const getJob = async (jobId:string)=>{
    const res = await getJobById(jobId);
    if(!res){
      setError('Something went wrong');
      return ;
    }
    if(res.status!=200){
      setError(res.data.message);
      return ;
    }
    setLoading(false);
    setJob(res.data);
  };
  const goBack = ()=>{
    history.push('/search');
    return ;
  };
  React.useEffect(()=>{
    getJob(jobId);
  },[jobId]);
  return (
    <div className='searchedJob'>
      <div className="topElements">
        <div className='backArrow' onClick={goBack}><FA icon={faArrowLeftLong} />Back </div>
        <div className='errorBox'></div>
      </div>
      <div className='job'>
        { job && <JobDetails key={job._id} jobd={job} jobClick={null} disablePreview={null} isHome={false} />}
        <div className='errorBox'>{error}</div>
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};