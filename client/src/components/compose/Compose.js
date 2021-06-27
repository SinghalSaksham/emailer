import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { createmail } from '../../actions/mails';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [mailData, setmailData] = useState({ to: '', cc: '', subject: '', message: '',schedule:'' });
  const mail = useSelector((state) => (currentId ? state.mails.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (mail) setmailData(mail);
  }, [mail]);

  const clear = () => {
    setCurrentId(0);
    setmailData({ to: '', cc: '', subject: '', message: '',schedule:'' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createmail({ ...mailData, name: user?.result?.name }));
      clear();
    } 
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own mails.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Composing a mail</Typography>
        <TextField name="to" variant="outlined" label="to" fullWidth value={mailData.to} onChange={(e) => setmailData({ ...mailData, to: e.target.value })} />
        <TextField name="cc" variant="outlined" label="cc" fullWidth multiline rows={4} value={mailData.cc} onChange={(e) => setmailData({ ...mailData, cc: e.target.value })} />
        <TextField name="subject" variant="outlined" label="subject" fullWidth multiline rows={4} value={mailData.subject} onChange={(e) => setmailData({ ...mailData, subject: e.target.value })} />
        <TextField name="message" variant="outlined" label="message" fullWidth multiline rows={4} value={mailData.message} onChange={(e) => setmailData({ ...mailData, message: e.target.value })} />
        <TextField label="schedule" type="datetime-local" defaultValue="2017-05-24T10:30" InputLabelProps={{shrink: true,}} fullWidth multiline rows={4} value={mailData.schedule}  onChange={(e) => setmailData({ ...mailData, schedule: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;