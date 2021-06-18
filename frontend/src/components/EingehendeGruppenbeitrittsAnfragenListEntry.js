import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {GruppenVorschlagBO, PartnerVorschlagBO, StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
//import AccountList from './AccountList';


class EingehendeGruppenbeitrittsAnfragenListEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anfrage: this.props.anfrage,
            lerngruppe: null,
            matchpoints: this.props.anfrage.getMatchpoints(),
            buttonPressed: false
        }
    }

    getLerngruppe = () => {
        StudooAPI.getAPI().getLerngruppe(this.state.anfrage.getGruppenID())
            .then(lerngruppe => {
                this.setState({
                    lerngruppe: lerngruppe
                })
            })
    }

    entscheidungTrue = () => {
        this.setState({
            entscheidung: true,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    entscheidungFalse = () => {
        this.setState({
            entscheidung: false,
            buttonPressed: true
        }, function () {
            this.updateGruppenvorschlagsAnfrage()
        });
    }

    updateGruppenvorschlagsAnfrage = () => {
        let updatedGruppenVorschlag = Object.assign(new GruppenVorschlagBO(), this.state.anfrage);
        updatedGruppenVorschlag.setEntscheidungPerson(true)
        if (this.state.entscheidung) {
            updatedGruppenVorschlag.setMatchpoints(this.state.matchpoints += 1)
        }
        StudooAPI.getAPI().updateGruppenVorschlag(updatedGruppenVorschlag)
            .then(gruppenVorschlag => {
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
        this.getLerngruppe()
    }

    render() {
        const {classes} = this.props;
        const {anfrage, lerngruppe, buttonPressed} = this.state;

        return (
            <>
                {
                    (anfrage && lerngruppe) ?
                        <Typography>
                            -------------- <br/>
                            Das ist eine eingehende Gruppenbeitrittsanfrage #{anfrage.getID()}<br/>
                            Matchpoints des Vorschlags: {anfrage.getMatchpoints()} &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button disabled={buttonPressed} variant={"contained"} color={"primary"}
                                    onClick={this.entscheidungTrue}>
                                Annehmen
                            </Button>
                            <Button disabled={buttonPressed} variant={"contained"} color={"secondary"}
                                    onClick={this.entscheidungFalse}>
                                Ablehnen
                            </Button>
                            <br/>
                            Gruppenname: {lerngruppe.getGruppenname()}
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
EingehendeGruppenbeitrittsAnfragenListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(EingehendeGruppenbeitrittsAnfragenListEntry);