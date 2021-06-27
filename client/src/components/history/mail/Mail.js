import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { likemail, deletemail } from '../../../actions/mails';
import useStyles from './styles';

const mail = ({ mail, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={mail.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={mail.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{mail.name}</Typography>
        <Typography variant="body2">{moment(mail.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === mail?.creator || user?.result?._id === mail?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(mail._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{mail.sschedule}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{mail.subject}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{mail.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likemail(mail._id))}>
        </Button>
      </CardActions>
    </Card>
  );
};

export default mail;