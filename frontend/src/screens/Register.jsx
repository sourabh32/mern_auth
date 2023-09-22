import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux"
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/userApiSlice';

import {setCredentials} from "../slices/authslice"
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {userInfo} = useSelector((state)=> state.authReducer)
 const [register,{isLoading}] = useRegisterMutation()
 const navigate = useNavigate()
 const dispatch = useDispatch()

  useEffect(()=>{

    if(userInfo){
      navigate("/")
    }
  },[navigate,userInfo])

  
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Both passwords does not match")
    }
    try {
     const res =  await register({name,email,password}).unwrap()
     console.log(res)
     dispatch(setCredentials({...res}))
      toast.success("User Registered!")
     navigate("/")
    } catch (err) {
      toast.error(err?.data?.meassge || err.data)
    }
  
    
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
        {isLoading? "Proccesing":"Register"} 
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;