import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'

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
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import Timeline from './timeline'
import axios from 'axios'
import { URL1 } from './constants'
import data from 'src/modules/dashboard-360/views/customer/CustomerListView/data';


const Popup = (props) => {
    const {  handleClose, show,data } = props
    //console.log(candidate)
    //console.log(resume)
  
    var url = URL1


    // const Applied = {
    //     action: "Applied",
    //     created_At: candidate.created_At,
    //     userName: candidate.firstName
    // }

    console.log(data,"row data")


    useEffect(() => {

    }, [])


    return (<div>
        <Dialog
            open={show}
            onClose={() => handleClose()}
             
            style={{ padding: 2 }}
            fullWidth={true}
        >
            {/* <DialogTitle>{candidate.firstName} {candidate.lastName}</DialogTitle> */}
            < DialogContent>
                <Grid container spacing={3} direction="row" style={{color:"#bb2020" , backgroundColor:"black"}}> 
                    <Grid item xs={6} sm={6} >
                        <p>firstName: {data.firstName}</p>
                        <p>lastName: {data.lastName}</p>
                        <p>Role: {data.role}</p>
                        <p>Email : {data.email}</p>
                        <p>DOB : {data.Dob}</p>
                        <p>Mobile Number: {data.mobile}</p>
                        <p>Experience : {data.experience}</p>
                       
                    
                        {/* <p><b>First Name : </b>{candidate.firstName}</p>
                        <p> <b>Last Name: </b>{candidate.lastName}</p>
                        <p> <b>Role : </b>{candidate.role}</p>
                        <p><b>Email : </b>{candidate.email}</p>
                        <p><b>DOB</b> :{candidate.Dob}</p>
                        <p><b>Mobile Number : </b>{candidate.mobile}</p>
                        <p><b>Alternate Number : </b>{candidate.alternatemob}</p>
                        <p><b>Experience: </b>{candidate.experience}</p>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <p><b>Applied Date : </b>{candidate.created_At}</p>
                        <p><b>Graduation year : </b>{candidate.graduation}</p>
                        <p><b>Backlogs : </b>{candidate.backlogs}</p>
                        <p><b>Current CTC : </b>{candidate.ctc}</p>
                        <p><b>Notice Period : </b>{candidate.joining}</p>
                        <p><b>Profile Status : </b>{candidate.prrofileStatus} </p>
                        <p><b>Resume</b> : {resume ? (<a href={URL1 + resume} target="_blank" rel="noopener noreferrer">View</a>) : null}</p>
                        <p>{link}</p> */}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {/* <Timeline id1={candidate._id} Applied={Applied} /> */}
                    </Grid>
                </Grid>
            
                <p><Button variant="contained" onClick={handleClose}>Close</Button></p>
            </DialogContent>
        </Dialog>
    </div >)
}

export default Popup