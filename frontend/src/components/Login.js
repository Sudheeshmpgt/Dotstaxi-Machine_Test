import {
    Avatar,
    Box,
    Button,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { useForm } from "react-hook-form";
  import Toast from "./sweetalert/SweetAlert";
  import LockOpenIcon from "@mui/icons-material/LockOpen";
  import { useNavigate } from "react-router-dom";
  import axios from '../axiosInstance';
  import {useDispatch} from 'react-redux';
  import {login} from '../redux/userData';
  
  function Login() {
    const dispatch = useDispatch()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const navigate = useNavigate();
  
    const logOnSubmit = (data) => {
      const { email, password } = data;
      if (email && password) {
        axios.post('user/login',data)
        .then(res=>{
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          const token = {accessToken, refreshToken}
          localStorage.setItem("token", JSON.stringify(token));
          dispatch(login(res.data.user))
          const message = res.data.message
          Toast.fire({
            icon: "success",
            title: message,    
          });
          navigate('/home')
        })
        .catch(err=>{
          console.log(err)  
          const message = err.response.data.error     
          Toast.fire({
                icon: "error",
                title: message,
              });
        })
      } else {
        Toast.fire({
          icon: "warning",
          title: "Fill all the details",
        });
      }
    };
  
    const handleJoinNow = () => {
      navigate("/signup");
    };
  
    return (
      <Grid container>
        <Grid item xs={12} sx={{ mt: { sm: 3, xs: 12 } }}>
          <Box>
            <Paper
              sx={{
                elevation: 5,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: 3,
                height: "auto",
                width: { xs: 240, sm: 300 },
                margin: "8% auto",
                borderRadius: "10px",
              }}
            >
              <Avatar
                component={Paper}
                sx={{
                  m: "0 auto",
                  width: 50,
                  height: 50,
                  backgroundColor: "primary.main",
                }}
              >
                <LockOpenIcon sx={{ fontSize: 25 }} />
              </Avatar>
              <h2
                style={{
                  marginBottom: "10px",
                  fontFamily: "Poppins,sans-serif",
                  textAlign: "center",
                }}
              >
                SIGN IN
              </h2>
              <form onSubmit={handleSubmit(logOnSubmit)} autoComplete="off">
                <TextField
                  name="email"
                  type="text"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                  variant="outlined"
                  sx={{ color: "", mb: 2 }}
                  size="small"
                  label="Username"
                  fullWidth
                  placeholder="Enter Username"
                />
                <TextField
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 4,
                      message: "Password must be more than 4 characters",
                    },
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  variant="outlined"
                  sx={{ color: "", mb: 2 }}
                  size="small"
                  label="Password"
                  fullWidth
                  placeholder="Enter Password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="small"
                  sx={{
                    margin: "0 auto",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    mb: 2,
                  }}
                >
                  Sign In
                </Button>
              </form>
              <Typography
                textAlign="center"
                fontFamily="Poppins,san-serif"
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                don’t have an account?{" "}
                <Link
                  onClick={handleJoinNow}
                  sx={{ color: "blue", cursor: "pointer" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    );
  }
  
  export default Login;