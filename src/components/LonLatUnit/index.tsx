import React from 'react';

const LonLatUnit: React.FC<{ data: number }> = ({ data }) => <>{data / Math.pow(10, 7)} °</>;

export default LonLatUnit;
