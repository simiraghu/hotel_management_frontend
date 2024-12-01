import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { ClearState, LoginUser } from '../../features/UserSlice';
import Alert from '@mui/material/Alert';


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isSuccessAlert, setIsSuccessAlert] = useState(false)
    const [isErrorAlert, setIsErrorAlert] = useState(false)

    const { error, user } = useSelector((state) => state?.users)
    console.log(error, user, "error")

    const [value, setvalue] = useState(
        {
            email: "",
            password: ""
        }
    )

    const handleOnchange = (e) => {
        setvalue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleOnsubmit = (e) => {
        e.preventDefault()
        dispatch(LoginUser(value))
    }

    useEffect(() => {
        if (user?.message) {
            setIsSuccessAlert(true)

            setTimeout(() => {
                setIsSuccessAlert(false)
                navigate('/')
                dispatch(ClearState())
            }, 3000);
        }

        if (error) {
            setIsErrorAlert(true)

            setTimeout(() => {
                setIsErrorAlert(false)
            }, 3000);
        }

    }, [user?.message, user, error, navigate, dispatch])

    return (
        <form
            className='mainLoginDiv'
            onSubmit={handleOnsubmit}>


            <div className='leftSide'>
                <main className='leftSideText'>
                    <h1 className='leftSideContent'>Hello, Friends!</h1>
                    <p className='leftSideContent'>Use your Email and Password to Login and <br /> start your journey with us</p>
                    <button
                        className='signupbutton'
                        onClick={() => {
                            dispatch(ClearState());
                            navigate('/signup');
                        }}
                    >
                        SignUp
                    </button>
                </main>

            </div>


            <div className='rightSide'>
                <div className='rightSideInputs'>
                    <h1 className='signinheading'>Sign In</h1>

                    {isSuccessAlert && <Alert severity="success">{user?.message}</Alert>}
                    {isErrorAlert && <Alert severity="error">{error}</Alert>}

                    <div>
                        <input
                            className='input'
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            value={value?.email}
                            onChange={(e) => handleOnchange(e)}
                        />
                    </div>

                    <div>
                        <input
                            className='input'
                            type="password"
                            name='password'
                            placeholder='Enter your password'
                            value={value?.password}
                            onChange={(e) => handleOnchange(e)}
                        />
                    </div>

                    <button
                        className='signinbutton'
                        type='submit'
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Login