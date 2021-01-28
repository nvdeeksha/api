import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  setLoggedIn,
  setUserDetails,
  setAccountType
} from '../../../redux/action';
import Axios from 'axios';
import { ADMIN, USER } from 'src/redux/constants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Logo from '../../dashboard-360/components/loginlogo'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Grassroots
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/static/images/merittrack.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageWrapper: {
    background:
      'linear-gradient(45eg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15))',
    height: '100%',
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));


var APIENDPOINT = 'https://mt2.granalytics.in';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addToQueue(agentId, queue) {
  var axios = require('axios');
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueAdd'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/addq?Interface='+agentId+'&Queue=' +
      queue +
      '',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) { })
    .catch(function (error) {
      console.log(error);
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function removeFromQueue(agentId, queue) {
  var axios = require('axios');
  var data = JSON.stringify({
    agentId: agentId,
    queue: queue,
    action: 'QueueRemove'
  });

  var config = {
    method: 'get',
    url:
      APIENDPOINT +
      '/ami/actions/rmq?Queue=' +
      queue +
      '&Interface='+agentId+'',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios(config)
    .then(function (response) {

    })
    .catch(function (error) {
      console.log(error);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



function Login({ setLoggedInMain, setAccountTypeMain, setUserDetailsMain }) {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);
  const [message, setMessage] = useState(true);
  async function authenticate(values) {
    setError('');
    try {
      const url = 'https://mt3.granalytics.in/auth/apiM/login'
      // const url='http://192.168.3.45:42009/user/login'
      console.log("values", values)

      const res = await Axios.post(url, values);
      console.log("login api", res.data)
      const obj = res.data.userDetails;
      const { accessToken } = res.data;
  
      localStorage.setItem("jwtToken", accessToken);
     
      localStorage.setItem('AgentSIPID', res.data.userDetails.External_num);
      localStorage.setItem('role',res.data.userDetails.role);
      localStorage.setItem('Agenttype', res.data.userDetails.AgentType);
      setUserDetailsMain(obj);
      setAccountTypeMain(obj.role === 'Agent' ? ADMIN : USER);

      if(res.data.userDetails.AgentType === 'L1'){
        // addToQueue('Local/5'+localStorage.getItem('AgentSIPID')+'@from-internal', 7001)
        addToQueue('Local/5'+localStorage.getItem('AgentSIPID')+'@from-queue\n', 7001)
      }
      if(res.data.userDetails.AgentType === 'L2'){
        // addToQueue('Local/3'+localStorage.getItem('AgentSIPID')+'@from-internal', 7002)
        addToQueue('Local/3'+localStorage.getItem('AgentSIPID')+'@from-queue\n', 7002)
      }
      setLoggedInMain(true);
      setError(false);
      
    } catch (err) {
      setLoggedInMain(false);
      setError(true);
    }
  }

  async function getOtp(e) {

    console.log("values", username)

    console.log("password", password)
    var userData = {
      userName: username,
      password: password,
    }
    const url = 'https://mt3.granalytics.in/auth/apiM/sendOTP'


    const res = await Axios.post(url, userData);
    console.log("login api", res.data)
    if (res.data.statusCode === 200) {
      setEnable(false)
      setMessage(true)
    }
    if (res.data.statusCode === 404) {
      setMessage(false)
    }

  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image}>
        <div className={classes.imageWrapper} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        component={Paper}
        elevation={6}
        square
        style={{ display: 'flex' }}
      >
        <div className={`${classes.paper}`}>
          <div>
          <div ><center><Logo /></center></div>
            <div className={classes.avatarWrapper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
                role: '',
                AgentType: 'Inbound',
                AgentSIPID: '', 
                OTP:''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required'),
                OTP: Yup.string()
                  .max(255)
                  .required('OTP is required')
              })}
              onSubmit={values => {

                // console.log('values', values);
                localStorage.setItem('AgentType', values.AgentType);
                localStorage.setItem('role', values.role);
               

                // navigate('/app/dashboard', { replace: true });
                authenticate(values);
              }}
              onBlur={e => {
                console.log("onblur")
                if (e.target.name === "password") {
                  setPassword(e.target.value)
                }
                if (e.target.name === "email") {
                  setUsername(e.target.value)
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={e => {
                      setUsername(e.target.value)
                      setMessage(true)
                      // getOtp()
                    }}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={e => {
                      setPassword(e.target.value)
                      setMessage(true)
                      // getOtp(e)
                    }}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  {/* <TextField
                    error={Boolean(touched.role && errors.role)}
                    fullWidth
                    helperText={touched.role && errors.role}008618
                    label="role"
                    margin="normal"
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.role}
                    variant="outlined"
                  /> */}
                  {/* <TextField
                    error={Boolean(touched.AgentType && errors.AgentType)}
                    fullWidth
                    helperText={touched.AgentType && errors.AgentType}
                    label="Agent Type"
                    margin="normal"
                    name="AgentType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.AgentType}
                    variant="outlined"
                  /> */}
                  {/* <TextField
                    error={Boolean(touched.AgentSIPID && errors.AgentSIPID)}
                    fullWidth
                    helperText={touched.AgentSIPID && errors.AgentSIPID}
                    label="Agent SIPID"
                    margin="normal"
                    name="AgentSIPID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.AgentSIPID}
                    variant="outlined"
                  /> */}
                 {enable === false ? <ThemeProvider theme={theme}>
                    <Typography variant="h6">OTP Sent Sucessfully</Typography>
                  </ThemeProvider> : <></>}
                  {message === false ? <ThemeProvider theme={theme}>
                    <Typography variant="h6">Invalid Username/Password</Typography>
                  </ThemeProvider> : <></>}
                  {enable === false ?    <TextField
                    error={Boolean(touched.OTP && errors.OTP)}
                    fullWidth
                    helperText={touched.OTP && errors.OTP}
                    label="OTP"
                    margin="normal"
                    name="OTP"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.OTP}
                    variant="outlined"
                    disabled={enable}
                  />:<></>}
                  {!!error && (
                    <Box my={1}>
                      <Typography color="secondary">
                        Invalid Username/Password
                      </Typography>
                    </Box>
                  )}
                   {enable === false ? <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button> : <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={(e) => getOtp(e)}
                      >
                       Generate OTP
                    </Button>}
                </form>
              )}
            </Formik>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: type => dispatch(setAccountType(type)),
  setLoggedInMain: val => dispatch(setLoggedIn(val))
});

export default connect(null, mapDispatchToProps)(Login);
