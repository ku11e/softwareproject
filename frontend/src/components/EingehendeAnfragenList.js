import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/PersonForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import {StudooAPI} from "../api";
import LoadingProgress from "./dialogs/LoadingProgress";
import ContextErrorMessage from "./dialogs/ContextErrorMessage";
import TeilnehmerListEntry from "./TeilnehmerListEntry";
import EingehendeAnfragenListEntry from "./EingehendeAnfragenListEntry";
//import AccountList from './AccountList';


class EingehendeAnfragenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eingehendeKonversationsAnfragen: [],
        }
    }

    getEingehendeKonversationsAnfragen = () => {
        StudooAPI.getAPI().getEingehendePartnerVorschlaegeForPersonID(this.props.person.getID())
            .then(anfragen => {
                this.setState({
                    eingehendeKonversationsAnfragen: anfragen
                })
            })
    }


    componentDidMount() {
        this.getEingehendeKonversationsAnfragen();
    }

    render() {
        const { classes } = this.props;
        const { eingehendeKonversationsAnfragen } = this.state;

        return (
            <Typography>
                {
                    eingehendeKonversationsAnfragen.length > 0 ?
                        <Typography>
                            Das sind alle eingehenden Konversationsanfragen von {this.props.person.getName()}: <br/>
                            {
                                eingehendeKonversationsAnfragen.map( anfrage =>
                                    <EingehendeAnfragenListEntry
                                        person={this.props.person}
                                        anfrage={anfrage}
                                    />
                                )
                            }

                        </Typography>
                        :
                        <Typography>
                            Du hast keine eingehenden Konversationsanfragen :/
                        </Typography>

                }

            </Typography>

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
EingehendeAnfragenList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(EingehendeAnfragenList);