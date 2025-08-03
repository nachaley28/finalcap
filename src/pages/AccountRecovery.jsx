import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Figure, ProgressBar } from 'react-bootstrap';
import { ImgLoginBackground, ImgLoginBackgroundDark } from '../components/general/Images';
import PasswordInput from '../components/forms/PasswordInput'
import { useTheme } from '../services/ThemeContext';



export default function AccountRecoveryPage() {
    const { theme, toggleTheme } = useTheme()

    const nav = useNavigate()
    const [progress, setProgress] = useState(0)
    const [loading, toggleLoading] = useState(false)
    const [status, setStatus] = useState(null)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [otp, setOtp] = useState("");

    const [recoveryStep, setRecoveryStep] = useState(0)

    // check password validity
    useEffect(() => {
        if (password != passwordConfirm && password.length > 0 && passwordConfirm.length != 0) {
            setStatus({
                variant: 'danger',
                message: 'password does not match'
            })
        } else {
            if (password.length > 0 && password.length < 8 && passwordConfirm.length < 8) {
                setStatus({
                    variant: 'danger',
                    message: 'password needs to be at least 8 characters'
                })
            } else {
                setStatus(null)
            }
        }
    }, [password, passwordConfirm])


    // handle login
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recoveryStep == 0) {
            toggleLoading(true)
            setRecoveryStep(recoveryStep + 1)
            alert('sent otp to email')
            toggleLoading(false)

        } else if (recoveryStep == 1) {
            toggleLoading(true)
            setRecoveryStep(recoveryStep + 1)
            alert('Success, Update your password to finish')
            toggleLoading(false)

        } else if (recoveryStep == 2) {
            toggleLoading(true)
            setRecoveryStep(3)
            toggleLoading(false)

        } else if (recoveryStep == 3) {
            toggleLoading(true)
            console.log(password)
            console.log(passwordConfirm)
            alert('asdasd')
            nav('/login')

        }
    }

    // set progress bar
    useEffect(() => {
        setProgress(100 * (recoveryStep / 3))
    }, [recoveryStep])

    return (
        <>

            <div className="container-fluid position-relative vh-100 vw-100 d-flex justify-content-center">
                <div className="position-absolute top-0 start-0 vw-100 vh-100">
                    <img src={theme == 'dark' ? ImgLoginBackgroundDark : ImgLoginBackground} className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} alt="..." />
                </div>

                <div className="container z-1">
                    <div className="row h-100 justify-content-center">
                        <div className="col-12 col-xl-6 d-flex flex-column gap-3 align-items-center justify-content-center">
                            <form onSubmit={handleSubmit} className="p-4 bg-primary-subtle w-100 rounded shadow-lg">
                                <ProgressBar now={progress} style={{ height: '10px' }} />
                                <div className="h5 mt-3">Account Recovery Step {recoveryStep + 1}</div>


                                <div className="my-5">
                                    {
                                        recoveryStep == 0 ?
                                            <>
                                                <div className="p text-center">Enter below the email address registered on the system</div>

                                                <div className="my-4">
                                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus placeholder='Email Address' />
                                                </div>
                                            </> : ''
                                    }

                                    {
                                        recoveryStep == 1 ?
                                            <>
                                                <div className="p text-center">OTP Code Sent. Please check your email inbox for the OTP code</div>

                                                <div className="my-4 d-flex justify-content-center align-items-center gap-3">
                                                    <input type="text" className="form-control text-center w-auto" value={otp} onChange={(e) => setOtp(e.target.value.toUpperCase())} autoFocus placeholder='ABC1234' maxLength={7} />
                                                    <Link to="/recovery" className="p text-muted " aria-disabled>{"Resend OTP Code"}</Link>
                                                </div>
                                            </> : ''
                                    }

                                    {
                                        recoveryStep == 2 ?
                                            <>
                                                <div className="p">Recover your account. Enter your new password</div>

                                                <div className="my-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">New Password</label>
                                                        <PasswordInput value={password} onChangeFunction={(e) => setPassword(e.target.value)} autoFocus />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">New Password Confirmation</label>
                                                        <PasswordInput value={passwordConfirm} onChangeFunction={(e) => setPasswordConfirm(e.target.value)} />
                                                    </div>
                                                </div>


                                            </> : ''
                                    }

                                    {
                                        recoveryStep == 3 ?
                                            <>
                                                <div className="p text-center">Successfully recovered your account</div>
                                                <div className="p mb-3 text-center">Log in again to continue</div>
                                            </> : ''
                                    }

                                    {
                                        status ?
                                            <Alert className='p-2 text-center' variant={status.variant}>
                                                {status.message}
                                            </Alert>
                                            : <></>
                                    }
                                </div>


                                <div className="d-flex justify-content-end align-items-center gap-3">
                                    {
                                        recoveryStep > 0 && recoveryStep < 3 ?
                                            <div
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setRecoveryStep(recoveryStep - 1)
                                                }
                                                }
                                            >Return</div> : ''
                                    }

                                    {
                                        recoveryStep == 0 ?
                                            <div
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    nav('/login')
                                                }
                                                }
                                            >Return</div> : ''
                                    }

                                    <input type='submit' className="btn btn-primary fw-bold" value={loading ? "Spinner Here" : recoveryStep < 2 ? "Next" : recoveryStep == 3 ? "Done" : "Submit"} />
                                </div>

                                <div className="text-center text-danger mt-3">NOTE: Recovery endpoints disabled at the moment</div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 