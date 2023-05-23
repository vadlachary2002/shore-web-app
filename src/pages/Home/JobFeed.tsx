import React from 'react';
import './JobFeed.scss';
import { ErrorBoundary } from '../../components';
import { Job } from '../../components/DataModels/Job';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faMapMarker, faClock } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
interface Props {
    key:string;
    jobd:Job;
    jobClick:(currentJob:Job,currentView:string)=>void;
    viewBtn?:boolean;
    isUser?: boolean;
    isAdmin?: boolean;
    isHome?: boolean;
}
const JobFeed = (det: Props) => {
  let p=det.jobd;
  const { viewBtn, isUser, isAdmin, isHome } = det;
  const history = useHistory();
  const setJob=()=>{
    det.jobClick(p,'show');
  };
  const viewJob = () => {
    history.push(`/job/${p._id}`);
    return ;
  };
  const makePayment = ()=>{
    
  };
  dayjs.extend(relativeTime);
  const postingDate = dayjs(p.dates.postingDate).format('DD/MM/YYYY');
  return (
    <ErrorBoundary>
      <div className="jobFeed"  onClick={isHome?viewJob:null}>
        <div className="flex">
          <div className="title">
            <h4 >{p.job.title}</h4>
            <span className="company"> {p.company.name}</span>
            <span> {p.location.city},{p.location.state}</span>
          </div>
          <div className="title">
            {isUser && 
            <div className="jobStatus">
              <span className="field">Type:</span>
              <span className="value blue">{p.productType}</span>
            </div>}
            {isUser && p.productType!='Regular' &&
            <div className="jobStatus">
              <span className="field">Payment Status</span>
              <span className={p.paymentStatus?'value green':'value orange'}>{p.paymentStatus?'Paid':'Pending'}</span>
            </div>}
            {isUser &&
            <div className="jobStatus">
              <span className="field">Approval Status:</span>
              <span className={p.status==='Approved'?'value green':'value orange'}>{p.status}</span>
            </div>
            }
          </div>
        </div>
        <div className="shift">
          <span>&#8377; {p.salary.sal}-{p.job.type}</span>
          <span>{p.job.experience}</span>
          <span> {p.company.companyType}</span>
        </div>
        <ul className='color-green'>
          <li> 
            <FA icon={faClock} />
          </li>
          <li>
            Posted On : { postingDate }
          </li>
        </ul>
        <h2>Discipline:</h2>
        <ul>
          {p.discipline.map((discipline: string, index: number) => (
            <li key={index}>{discipline}</li>
          ))}
        </ul>
        <div className="foot">
          <div>
            <p>Hiring ongoing: From
              <b>
                {p.job.title} in {p.location.city},{p.location.state}
              </b>
            </p>
          </div>
          <div>
            { viewBtn && <button className='viewBtn' onClick={isAdmin?setJob:viewJob} >View Details</button> }
            { isUser && !p.paymentStatus && <button className='viewBtn' onClick={makePayment} >Make Payment</button> }
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default JobFeed;
