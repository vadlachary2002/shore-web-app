import React, { useContext,useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Admin.scss';
import  { Job }  from '../../components/DataModels/Job';
import JobDetails from '../Home/JobDetails';
import { UserContext } from '../HomePage/HomePage';
import { setStatusReject,setStatusApprove } from '../../services/Jobs';
import PendingJobs from './PendingJobs';
import RejectedJobs from './RejectedJobs';
import Products from './Products';

const Admin = () => {

  const { state, dispatch } = useContext(UserContext);
  const [ tabCookie,setTabCookie,removeTabCookie ] = useCookies();
  const history = useHistory();
  const [ tab, setTab] = useState('');
  const [currentJob,setCurrentJob]= useState(null);
  const [ jobStatus,setJobStatus] = useState('');
  React.useEffect(() => {
    if(tabCookie.status){
      setTab(tabCookie.status);
      return ;
    }
    setTab('Pending');
    setTabCookie('status','Pending');
  }, []);
  const jobClick=(job:Job)=>{
    setCurrentJob(job);
  };
  const handleApprove = async  (job: Job)=>{
    const id = job._id;
    const res = await setStatusApprove({id});
    if(res){
      window.location.reload();
      return ;
    }
  };

  const handleReject = async (job: Job)=>{
    const id = job._id;
    const res = await setStatusReject({id});
    if(res){
      window.location.reload();
      return ;
    }
  };
  if(!state.isAdmin){
    history.push('/login');
  }
  return (
    <div className="adminDashboard">
      <div className='listItems'>
        <h1>Admin Options</h1>
        <ul>
          <li 
            className={tab==='Pending' && 'active'}
            onClick={()=>setTab(()=>{
              jobClick(null);
              setTabCookie('status','Pending');
              return 'Pending';
            })}
          >Pending</li>
          <li 
            className={tab==='Rejected' && 'active'}
            onClick={()=>setTab(()=>{
              jobClick(null);
              setTabCookie('status','Rejected');
              return 'Rejected';
            })}
          >Rejected</li>
          <li 
            className={tab==='Products' && 'active'}
            onClick={()=>setTab(()=>{
              jobClick(null);
              setTabCookie('status','Products');
              return 'Products';
            })}
          >Products</li>
        </ul>
      </div>
      
      <div className="down">
        {tab==='Pending' && <PendingJobs openJob={jobClick}/>}
        {tab==='Rejected' && <RejectedJobs openJob={jobClick}/>}
        {tab==='Products' && <Products />}
        {currentJob &&
        <div className='show'>
          <div className="onejob">
            <JobDetails key={currentJob._id} jobd={currentJob} jobClick={jobClick} disablePreview={null} isHome={true}  isAdmin={true}>
              <div className="controls">
                <h3 className="status">Status of Job:{jobStatus?jobStatus:currentJob.status}</h3>
                <div className="footer">
                  <div className='containerSpecial'>
                    {currentJob.status ==='Pending' &&
                      <button
                        className="reject-btn"
                        onClick={()=>handleReject(currentJob)}>
                        {'Reject'}
                      </button>
                    }
                    <button 
                      className="accept-btn" 
                      onClick={()=>handleApprove(currentJob)}>
                      {'Approve'}
                    </button>
                  </div>
                </div>
              </div>
            </JobDetails>
          </div>
        </div>}
      </div>
    </div>

  );
};

export default Admin;
