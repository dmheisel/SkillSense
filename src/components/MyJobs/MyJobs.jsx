import React, { Component } from 'react';
import { connect } from 'react-redux';

//COMPONENT IMPORTS
import OneColumnLayout from '../OneColumnLayout/OneColumnLayout';
import JobTabs from '../JobsTabs/JobTabs';
import JobListItem from '../JobListItem/JobListItem';
import {Typography} from '@material-ui/core';

class MyJobs extends Component {
  componentDidMount() {
    if (this.props.user.access_id === 1) {
      this.props.dispatch({
        type: 'FETCH_ACTIVE_JOBS'
      });
    } else if (this.props.user.access_id === 3) {
      this.props.dispatch({
        type: 'FETCH_CLIENT_JOBS',
        //active job status by default
        payload: 3
      });
    }
  }

  render() {
    //uses the JobListItem component to render the job search results
    let jobList = this.props.jobs.map((job, i) => {
      return <JobListItem key={i} job={job} />;
    });

    //checks if user type should be able to view this page
    let isStudent = () => {
      return this.props.user.access_id === 1;
    };

    //checks if user type should be able to view this page
    let isClient = () => {
      return this.props.user.access_id === 3;
    };

    return (
      <div>
        {isStudent() || isClient() ?
          <OneColumnLayout header="My Jobs">
            {/* Navigation tabs on Job Page:
            (Active, Applied, Completed) */}
            <div>
              <JobTabs />
            </div>
            {/* Selected Job List */}
            <div className="list">{jobList}</div>
          </OneColumnLayout >

          : <Typography>You are not authorized to viewthis page</Typography>}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
    jobs: store.allJobsReducer
  };
};

export default connect(mapStateToProps)(MyJobs);
