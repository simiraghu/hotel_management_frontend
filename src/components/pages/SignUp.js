import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { ClearState, SignUpUser } from '../../features/UserSlice'
import { Alert } from '@mui/material';


const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, user } = useSelector((state) => state.users)
    console.log(error, user, "error, user")

    const [value, setvalue] = useState(
        {
            username: "",
            email: "",
            password: "",
            phonenumber: "",
            city: ""
        }
    )
    const [isErrorAlert, setIsErrorAlert] = useState(false)
    const [isSuccessAlert, setIsSuccessAlert] = useState(false)

    const handleOnChange = (e) => {
        setvalue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault(e)
        console.log(value, "value")
        dispatch(SignUpUser(value))
    }

    useEffect(() => {
        if (error) {
            setIsErrorAlert(true)
            setTimeout(() => {
                setIsErrorAlert(false)
            }, 3000);
        }

        if (user?.message) {
            setIsSuccessAlert(true)

            setTimeout(() => {
                setIsSuccessAlert(true)
                navigate('/login')
                dispatch(ClearState())
            }, 3000);

        }

    }, [error, user, user?.message, navigate, dispatch])

    return (
        <div className='mainLoginDiv' >
            <div className='leftSide'>
                <main className='leftSideText'>
                    <h1 className='leftSideContent'>Welcom to our WayToStay!</h1>
                    <p className='leftSideContent'>Use your details and register</p>
                    <button
                        className='signupbutton'
                        onClick={() => {
                            dispatch(ClearState());
                            navigate('/login');
                        }}
                    >
                        Sign In
                    </button>
                </main>
            </div>


            <form className='rightSide' onSubmit={handleOnSubmit}>
                <div className='rightSideInputsforSignup'>
                    <h1 className='signinheading'>Sign Up</h1>
                    {isSuccessAlert && <Alert severity="success">{user?.message}</Alert>}
                    {isErrorAlert && <Alert severity="error">{error}</Alert>}
                    <div>
                        <input
                            className='input'
                            type="text"
                            name="username"
                            placeholder='Enter your names'
                            value={value?.username}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            className='input'
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            value={value?.email}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            className='input'
                            type="password"
                            name='password'
                            placeholder='Enter your password'
                            value={value?.password}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            className='input'
                            type="number"
                            name='phonenumber'
                            placeholder='Enter your number'
                            value={value?.phonenumber}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            className='input'
                            type="text"
                            name='city'
                            placeholder='Enter your city'
                            value={value?.city}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <button
                        className='signinbutton'
                        type='submit'
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;