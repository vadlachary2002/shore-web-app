import React from 'react';
const jobTypes = [
  'Postdoctoral Fellow',
  'Lecturer',
  'Researcher',
  'Junior Scientist',
  'Senior Scientist',
  'Technician',
  'Scientist',
  'Application Scientist',
  'Faculty Member',
  'PhD Studentship',
  'PhD Fellowship',
  'Data Scientist',
  'Bio Statistician',
  'Research Assistant',
  'Research Associate',
  'Research Scientist',
  'Project Assistant',
  'Project Associate',
  'Bioinformatician',
  'Computational Chemist',
  'Computational Biologist',
  'Molecular Biologist',
  'Forensic Scientist',
  'Director',
  'Internship',
  'Engineer',
  'Principal Investigator',
  'Head of Department',
  'Manager',
  'Lab Manager',
  'Editor',
  'Health Professional',
  'Project Manager',
  'Sales',
  'Writer',
  'Team/Group Leader',
  'Clinical Data Manager',
  'Synthetic Chemist',
  'Material Chemist',
  'Residency Notifications',
  'MD Notifications'
];

const data = jobTypes.map((jobType, index) => ({
  id: index,
  name: jobType
}));

export default data;
