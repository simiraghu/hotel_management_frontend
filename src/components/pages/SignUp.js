import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { ClearState, SignUpUser } from '../../features/UserSlice'
import { Alert } from '@mui/material';


const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, user } = useSelector((state) => state.users)

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
    const [inputError, setInputError] = useState({})



    const validate = () => {
        let newErrors = {}
        if (value?.username.length < 3) {
            newErrors.userNameError = "User name must be 3 charactor long"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value?.email)) {
            newErrors.emailError = "Please write a valid email"
        }

        if (value?.password.length < 3) {
            newErrors.passwordError = "Password must be 3 charactor long"
        }

        if (value?.phonenumber.length < 10) {
            newErrors.phoneNumberError = "Phone number must be 10 number"
        }

        setInputError(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleOnChange = (e) => {
        setvalue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
        setInputError({})
    }

    const handleOnSubmit = (e) => {
        e.preventDefault(e)
        if (!validate()) {
            return
        }

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
                        {inputError?.userNameError && <p style={{ color: "red" }}>{inputError?.userNameError}</p>}
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
                        {inputError?.emailError && <p style={{ color: "red" }}>{inputError?.emailError}</p>}
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
                        {inputError?.passwordError && <p style={{ color: "red" }}>{inputError?.passwordError}</p>}
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
                        {inputError?.phoneNumberError && <p style={{ color: "red" }}>{inputError?.phoneNumberError}</p>}
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