import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LernvorliebenList from "./LernvorliebenList";
import EineLernvorliebe from "./EineLernvorliebe";




class AktProfilEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profil: props.profil
        }
    }

    render() {
        const { classes } = this.props;
        const { profil } = this.state;

        console.log("Aus ProfilEntry das aktuelle Lernvorliebe-Objekt:")
        console.log(this.state);

        return (
            <div>
                <Grid>
                    <Grid item>
                        <Typography className={classes.heading}>
                            { /*Profil ID:
                            {
                                profil.getID()
                            }
                            }
                            Lernvorliebe ID:
                            {
                                profil.getLernvorliebeID()
                            */
                            }
                            {
                                <EineLernvorliebe lvId={profil.getLernvorliebeID()} />
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
AktProfilEntry.propTypes = {
  /** @ignore */
  //classes: PropTypes.object.isRequired,
  /** The CustomerBO to be rendered */
  //nachricht: PropTypes.object.isRequired,

}

export default withStyles(styles)(AktProfilEntry);