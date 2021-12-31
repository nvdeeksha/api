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
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import {
  setLoggedIn,
  setUserDetails,
  setAccountType
} from '../../../redux/action';
import Axios from 'axios';
import { ADMIN, USER } from 'src/redux/constants';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
// import Typography from '@material-ui/core/Typography';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.grssl.com/">
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
    backgroundImage: 'url(/static/images/login1.jpg)',
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
  },
  root1: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
}));


// var APIENDPOINT = SOCKETENDPOINT2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// addToQueue start //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// removeFromQueue end //////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Login({ setLoggedInMain, setAccountTypeMain, setUserDetailsMain }) {
  const classes = useStyles();
  const [error, setError] = useState('');
  const user_Details = useSelector(state => state.userData)

  console.log(user_Details)

  async function authenticate(values) {
    setError('');
    const url = '/https://rms.grssl.com//api/users/login'
    axios.post(`https://rms.grssl.com//api/users/login`, values)
      .then((res) => {
        console.log(res)
        if (res.data.token) {
          localStorage.setItem('jwt', res.data.token)
          localStorage.setItem('ID', res.data.userID)
          localStorage.setItem('username', res.data.username)
          setAccountTypeMain(ADMIN);
          setLoggedInMain(true);
          setError(false)
        }
        // setAccountTypeMain(ADMIN);
        // setLoggedInMain(true);
        // setError(false)
      })
      .catch((err) => {
        console.log(err)
        setLoggedInMain(false);
        setError(true);
      })


    // if (values.email === 'Admin@gmail.com' && values.password === 'Admin@123') {
    //   localStorage.setItem('role', 'Admin');
    //   localStorage.setItem('email', 'Admin@gmail.com')
    //   localStorage.setItem('password', 'Admin@gmail.com')

    //   setAccountTypeMain(ADMIN);
    //   setLoggedInMain(true);
    //   setError(false)
    // } else {
    //   setLoggedInMain(false);
    //   setError(true);
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
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  // .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required')
              })}
              onSubmit={values => {
                // console.log('values', values);
                // localStorage.setItem('AgentType', values.AgentType);
                // localStorage.setItem('role', values.role);
                // localStorage.setItem('AgentSIPID', values.AgentSIPID);

                // navigate('/app/dashboard', { replace: true });
                authenticate(values);
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
                    label="User Name"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  {!!error && (
                    <Box my={1}>
                      <Typography color="secondary">
                        Invalid Username/Password
                      </Typography>
                    </Box>
                  )}
                  <Box my={2} mt={5}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            {
              error ? (<div className={classes.root1}>
                <Alert variant="outlined" severity="error">You are not authorized to login !</Alert>
              </div>) : (<div></div>)
            }
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
