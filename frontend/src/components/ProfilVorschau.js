import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography, Avatar} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import { StudooAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
import {PersonBO} from "../api";
import LernvorliebenList from "./LernvorliebenList";
import AllProfile from "./AllProfile";
import AktuellesProfil from "./AktuellesProfil";
import PersonEntry from "./PersonEntry";

/**
 * Controlls a list of CustomerListEntrys to create a accordion for each customer.
 *
 * @see See [CustomerListEntry](#customerlistentry)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProfilVorschau extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandPerson) {
      expandedID = this.props.location.expandPerson.getID();
    }

    // Init an empty state
    this.state = {
      person: null,
      error: null,
      loadingInProgress: false
    };
  }

  getCurrentPerson = () => {
    StudooAPI.getAPI().getPersonByUID(this.props.person.getGoogleUserID())
        .then(personBO => {
            this.setState({
                person: personBO,
                error: null,
                loadingInProgress: false
            });
        }).catch(e => this.setState({
            profil: "No profil received.",
            error: e,
            loadingInProgress: false
        }));
	}

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM*/
  componentDidMount() {
    this.getCurrentPerson()
  }

  /** Renders the component */
  render() {
    const {classes, user, selfperson} = this.props;
    const { person, loadingInProgress, error } = this.state;

    return (
        <div className={classes.root}>
            {
                user ?
                    <IconButton className={classes.avatarButton}>
                        <Avatar src={user.photoURL}/>
                    </IconButton>
                    :null
            }
            {
            person ?
                <AktuellesProfil person={person} selfperson={selfperson}/>
                : null
          }
          <LoadingProgress show={loadingInProgress}/>
          <ContextErrorMessage error={error} contextErrorMsg={`The list of personen could not be loaded.`}
                               onReload={this.getCurrentPerson}/>
        </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  personFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
ProfilVorschau.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ProfilVorschau));