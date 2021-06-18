import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {PartnerVorschlagBO, StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
//import AccountList from './AccountList';


class AusgehendeKonversationsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            anderePerson: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false
        }
    }

    getAnderePerson = () => {
        if (this.props.person.getID() === this.state.anfrage.getPersonID()) {
            StudooAPI.getAPI().getPerson(this.state.anfrage.getPartnerID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        } else if (this.props.person.getID() === this.state.anfrage.getPartnerID()) {
            StudooAPI.getAPI().getPerson(this.state.anfrage.getPersonID())
                .then(anderePerson =>
                    this.setState({
                        anderePerson: anderePerson
                    }))
        }
    }

    updateKonversationsAnfrage = () => {
        this.setState({
            buttonPressed: true
        })
        let updatedPartnerVorschlag = Object.assign(new PartnerVorschlagBO(), this.state.anfrage);
        updatedPartnerVorschlag.setMatchpoints(this.state.matchpoints -= 1)
        StudooAPI.getAPI().updatePartnerVorschlag(updatedPartnerVorschlag)
            .then(partnerVorschlag => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
                this.baseState.entscheidung = this.state.entscheidung;
            }).catch(e =>
            this.setState({
                updatingInProgress: false,
                updatingError: e
            }));
        this.setState({
            updatingInProgress: true,
            updatingError: null
        })
    }

    componentDidMount() {
        this.getAnderePerson()
    }

    render() {
        const {classes} = this.props;
        const {anfrage, anderePerson, buttonPressed} = this.state;

        return (
            <>
                {
                    (anfrage && anderePerson) ?
                        <Typography>
                            -------------- <br/>
                            Das ist eine ausgehende Partneranfrage #{anfrage.getID()}<br/>
                            Matchpoints des Vorschlags: {anfrage.getMatchpoints()} &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                    onClick={this.updateKonversationsAnfrage}>
                                Zurückziehen
                            </Button>
                            <br/>
                            Partnername: {anderePerson.getName()}
                            <br/>--------------
                        </Typography>
                        :
                        null
                }
            </>


        )
    }

}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
});

/** PropTypes */
AusgehendeKonversationsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AusgehendeKonversationsAnfragenListEntry);