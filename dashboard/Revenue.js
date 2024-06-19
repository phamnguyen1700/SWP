import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { routes } from '../../routes'


export default function Revenue() {
  return (
    <React.Fragment>
      <Title>Recent Revenue</Title>
      <Typography component="p" variant="h4">
        $12,345.67
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 30 May, 2024
      </Typography>
      <div>
        <Link color="primary" href={routes.revenuePage} >
          View details
        </Link>
      </div>
    </React.Fragment>
  );
}
