import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../Chart';
import Orders from '../Orders';
import './DashboardContent.css';
import Revenue from '../Revenue';

export default function DashboardContent() {
  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className="dashboard-paper dashboard-chart">
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className="dashboard-paper dashboard-deposits">
            <Revenue />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className="dashboard-paper dashboard-orders">
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
