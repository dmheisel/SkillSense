import React from 'react';
import { useHistory } from 'react-router-dom';

//material-ui imports:
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flexbox',
        flexDirection: 'column'
    },
    listItem: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        padding: '20px 20px 10px'
    },
    button: {
        margin: theme.spacing(1)
    }
}));

function ApplicantReviewStudent(props) {
    const classes = useStyles();
    const history = useHistory();

    const viewApplication = () => {
        history.push(`/jobs/detail/applicant/${props.jobDetails.application_id}`);
    };

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.listItem}>
            {/* left side info */}
            <Grid item xs={6}>
                <Typography color="primary" variant="h6">
                    {props.jobDetails.application_id &&
                        (props.jobDetails.hired
                            ? "You've been hired for this job!"
                            : 'You have applied to this job.')}
                </Typography>
            </Grid>
            {/* right side info */}
            <Grid item xs={6} align="right">
                {props.jobDetails.application_id && (
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => viewApplication()}>
                        View Your Application
                    </Button>
                )}
            </Grid>
        </Grid>
    );
}
export default ApplicantReviewStudent;
