import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import LineChartComponent from './Recharts';
import EarningCard from './EarningCard';
import StackedBarChart from './BarCharts';
// project imports

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  const role=localStorage.getItem('role')

  return <p className="text-center font-semibold text-3xl">Askaja-Cafe - {role} Dashboard</p>;
};

export default Dashboard;
