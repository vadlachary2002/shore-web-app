import React,{ useState } from 'react';
import { DropDown } from './DropDown';
import { getRegions } from '../../../services/Utils';

interface Props{
  selected: string[],
  updateArray: (field:string,value:string[])=>void,
  updateSearchContents: (field:string,value:string|number|string[])=> void,

}
export const Regions = (props:Props)=>{

  const { selected, updateArray, updateSearchContents } = props;
  const [allRegions, setAllRegions] = useState([]);

  const fetchRegions = async ()=>{
    const res = await getRegions();
    setAllRegions(res);
  };
  React.useEffect(()=>{
    fetchRegions();
  },[]);

  return (
    <DropDown 
      name={'region'} 
      values={allRegions} 
      updateSearchContents={updateSearchContents} 
      selected={selected} 
      updateArray={updateArray} 
    />
  );
};