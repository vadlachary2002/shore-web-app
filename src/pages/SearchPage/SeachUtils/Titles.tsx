import React,{ useState } from 'react';
import { DropDown } from './DropDown';
import { getTitles } from '../../../services/Utils';

interface Props{
  selected: string[],
  updateArray: (field:string,value:string[])=>void,
  updateSearchContents: (field:string,value:string|number|string[])=> void,

}
export const Titles = (props:Props)=>{

  const { selected, updateArray, updateSearchContents } = props;
  const [allTitles, setAllTitles] = useState([]);

  const fetchTitles = async ()=>{
    const res = await getTitles();
    setAllTitles(res);
  };
  React.useEffect(()=>{
    fetchTitles();
  },[]);

  return (
    <DropDown 
      name={'title'} 
      values={allTitles} 
      updateSearchContents={updateSearchContents} 
      selected={selected} 
      updateArray={updateArray} 
    />
  );
};