import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardHeader,
    Box,
    Button,
    TextField,
    Paper,
    Snackbar,
    Tooltip,
    IconButton
} from '@material-ui/core';
import {
    MenuItem, InputLabel, Select,
    FormControl
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    grey: {
        color: theme.palette.getContrastText(grey[50]),
        backgroundColor: grey[50]
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    paper: {
        textAlign: 'center'
    },
    list: {},
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        marginRight: '0.5vw'
    },
    listItem: {
        padding: 0
    },
    cardcontent: {
        padding: '0 0 0 5%',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    formControl: {
        minWidth: 100,
    },
}));





const Inbound = () => {
    axios.get(`https://rms.grssl.com/api/profiles`)
        .then((response) => {
            let i = 0;
            response.data.map((ele) => {
                i = i + 1;
                return ele.id = i
            })
            setprofiles(response.data)
            console.log(response.data)

            const hired1 = response.data.filter((ele) => {

                return ele.prrofileStatus === 'Hired'

            })
            sethired(hired1)

            const discard1 = response.data.filter((ele) => {
                return ele.prrofileStatus === 'Discarded'
            })
            setdiscarded(discard1)

            const reject1 = response.data.filter((ele) => {
                return ele.prrofileStatus === 'Rejected'
            })
            setrejected(reject1)

            const shortlist1 = response.data.filter((ele) => {
                return ele.prrofileStatus === 'Shortlisted'
            })
            setshortlist(shortlist1)

            settotal(response.data)

            const Applied1 = response.data.filter((ele) => {
                return ele.prrofileStatus === 'Applied'
            })
            setapplied(Applied1)
        })

        .catch((error) => {
            console.log(error.message)
        })
}

useEffect(() => {
    getprofile()
}, [])

console.log(profiles, 'datainprofile')

const profilesColumns = [
    // {
    //     headerName: 'SL.No',
    //     field: 'id',
    //     flex: 0.5
    // },
    {
        headerName: 'First Name',
        field: 'firstName',
        flex: 0.5

    },
    {
        headerName: 'Last Name',
        field: 'lastName',
        flex: 0.5
    },
    {
        headerName: 'Position Applied',
        field: 'role',
        flex: 0.5
    },
    {
        headerName: 'Experience',
        field: 'experience',
        flex: 0.5
    },
    {
        headerName: 'Location',
        field: 'currentLocation',
        flex: 0.5
    },
    {
        headerName: 'Source',
        field: 'reference',
        flex: 0.5
    },
    {
        headerName: 'Profile Status',
        field: 'prrofileStatus',
        flex: 0.5
    },
    {
        headerName: 'Job Code',
        field: 'jobcode',
        flex: 0.5
    },

    {
        headerName: 'Applied Date',
        field: 'created_At',
        flex: 0.5
    },


];

const showProfile = (data) => {
    setshow(true)
}


return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={2} >
                <Card onClick={handleapplied} style={{ backgroundColor: "#bb2020" }}>
                    <CardContent >

                        Applied <br />
                        {Applied.length}
                    </CardContent>
                </Card>

            </Grid>



            return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} lg={2} >
                        <Card style={{ backgroundColor: "#1565c0" }}>
                            <CardContent >
                                Applied <br />
                                {Applied.length}


                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={2} md={3} lg={2}>

                        <Card style={{ backgroundColor: "#1976d2" }}>
                            <CardContent>
                                Shortlisted <br />
                                {Shortlisted.length}
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={2} md={3} lg={2}>
                        <Card style={{ backgroundColor: "#1e88e5" }}>
                            <CardContent>
                                Rejected <br />
                                {Rejected.length}
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={2} md={3} lg={2}>
                        <Card style={{ backgroundColor: "#2196f3" }}>
                            <CardContent>
                                Total profiles <br />
                                {total.length}

                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={2} md={3} lg={2}>
                        <Card style={{ backgroundColor: "#42a5f5" }}>
                            <CardContent >

                                Hired <br />
                                {Hired.length}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={2} md={3} lg={2}>
                        <Card style={{ backgroundColor: "#64b5f6" }}>
                            <CardContent>
                                Discarded <br />
                                {Discarded.length}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} >
                        <Card>
                            <CardContent style={{ height: 500, width: '100%' }}>
                                <DataGrid
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    rows={profiles} columns={profilesColumns} pageSize={20}
                                    rowsPerPageOptions={[10, 20, 50]}
                                    pagination onRowClick={showProfile} />

                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </div>
            );
};
            export default Inbound;


