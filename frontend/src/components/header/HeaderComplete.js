import React, {Component} from 'react';
import {AppBar, Container, Avatar, ThemeProvider, Toolbar, Typography} from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ChatIcon from "@material-ui/icons/Chat";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import GroupIcon from "@material-ui/icons/Group";
import theme from "./theme";
import ProfileDropDown from "../dialogs/ProfileDropDown";
import { StyleSheet, css } from "aphrodite";


class HeaderComplete extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;
        return (
            <>
                <div style={theme.test}>
                    <AppBar style={theme.root} >
                        <Toolbar style={theme.toolbar}>
                            <div style={theme.imagediv}>
                                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" style={theme.image}/>
                            </div>

                            <div>
                                <Link to="/partnervorschlaege">
                                    <BottomNavigationAction label={"Explore"} icon={<SearchIcon style={theme.iconcss}/>}/>
                                </Link>

                                <Link to="/partnerexplorer">
                                    <BottomNavigationAction label={"PartnerExplorer"} icon={<SearchIcon style={theme.iconcss}/>}/>
                                </Link>

                                <Link to="/konversationen">
                                    <BottomNavigationAction label={"Konversationen"} icon={<ChatIcon style={theme.iconcss}/>}/>
                                </Link>

                                <Link to="/lerngruppen">
                                    <BottomNavigationAction label={"Gruppen"} icon={<GroupIcon style={theme.iconcss}/>}/>
                                </Link>

                                <Link to="/personen">
                                    <BottomNavigationAction label={"Person"} icon={<GroupIcon style={theme.iconcss}/>}/>
                                </Link>
                            </div>

                            <div>
                            <ProfileDropDown user={user} />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </>
        );
    }
}

export default HeaderComplete;