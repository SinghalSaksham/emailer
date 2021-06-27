import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import mail from './mail/Mail';
import useStyles from './styles';

const mails = ({ setCurrentId }) => {
  const mails = useSelector((state) => state.mails);
  const classes = useStyles();

  return (
    !mails.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {mails.map((mail) => (
          <Grid key={mail._id} item xs={12} sm={6} md={6}>
            <mail mail={mail} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default mails;