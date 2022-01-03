import React, { useEffect, useState } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import DownloadReport from '../../../dashboard-360/views/DashboardView/DownloadReport'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import Popup from './PopUp'

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
    IconButton,
     //Modal
} from '@material-ui/core';
import {
    MenuItem, InputLabel, Select,
    FormControl
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors';
import data from 'src/modules/dashboard-360/views/customer/CustomerListView/data';


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

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}




const Inbound = () => {
    const [profiles, setprofiles] = useState([])
    const [Hired, sethired] = useState([])
    const [Discarded, setdiscarded] = useState([])
    const [Rejected, setrejected] = useState([])
    const [Shortlisted, setshortlist] = useState([])
    const [total, settotal] = useState([])
    const [Applied, setapplied] = useState([])
    const[show,setshow] = useState(false)
    const [data,setdata]= useState([])

   
    
    
    const handleClose=(e)=>{
        setshow(false)
    }


    const handlehired = (e) => {
        setprofiles(Hired)
    }

    const handlediscard = (e) => {
        setprofiles(Discarded)
    }

    const handleapplied = (e) => {
        setprofiles(Applied)
    }

    const handleshort = (e) => {
        setprofiles(Shortlisted)
    }

    const handlereject = (e) => {
        setprofiles(Rejected)
    }

    const handletotal = (e) => {
        setprofiles(total)
    }

    

    const getprofile = () => {
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
        console.log(data.row)
        setshow(true)
     setdata(data.row)
    }
 
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={2} >
                    <Card onClick={handleapplied} style={{ backgroundColor: "#004d40" }}>
                        <CardContent >
                        
                            Applied <br />
                            {Applied.length}
                            

                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={2} md={3} lg={2}>

                    <Card onClick={handleshort} style={{ backgroundColor: "#00695c" }}>
                        <CardContent>
                        Shortlisted <br />
                            {Shortlisted.length}
                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={2} md={3} lg={2}>
                    <Card onClick={handlereject} style={{ backgroundColor: "#00796b" }}>
                        <CardContent>
                            Rejected <br />
                            {Rejected.length}
                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={2} md={3} lg={2}>
                    <Card onClick={handletotal} style={{ backgroundColor: "#00897b" }}>
                        <CardContent>
                            Total profiles <br />
                            {total.length}

                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={2} md={3} lg={2}>
                    <Card onClick={handlehired} style={{ backgroundColor: "#009688" }}>
                        <CardContent >
                       
                            Hired <br />
                            {Hired.length}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={2} md={3} lg={2}>
                    <Card onClick={handlediscard} style={{ backgroundColor: "#26a69a" }}>
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
                                // rowsPerPageOptions={[10, 20, 50]}
                                pagination onRowClick={showProfile} />

                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <Popup  handleClose={handleClose} show={show} data={data} />

        </div>
    );
};
export default Inbound;

