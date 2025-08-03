// src/pages/LoginPage.jsx
import { useEffect, useState } from 'react';
import LoadingPage from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
export default function RegisterPage() {
    const nav = useNavigate();
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState('')

    // Password Toggle
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Account credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [branch, setBranch] = useState(null);
    const [role, setRole] = useState(0);

    // Account Profile
    const [setupProfile, toggleSetupProfile] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [middle_name, setMiddleName] = useState("");
    const [last_name, setLastName] = useState("");
    const [birth_date, setBirthDate] = useState("");

    // Check password match
    useEffect(() => {
        if (password !== passwordConfirm && password.length > 0 && passwordConfirm != 0) {
            setPasswordError('Password does not match')

        } else {
            if (password.length <= 10 && password.length > 0) {
                setPasswordError('Password should contain at least 10 characters')
            } else {
                setPasswordError('')
            }
        }

    }, [password, passwordConfirm])


    // handle clear forms
    function handleClearForms(){
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setBirthDate("");
        setBranch(null)
        setRole(0)
        setError("")
        setPasswordError("")
        toggleSetupProfile(false)
    }
    

    // handle register
    const handleRegister = async (e) => {
        e.preventDefault()

        let profile = {}

        if(setupProfile){
            profile = {
                first_name, middle_name, last_name, birth_date
            }
        }

        const res = await register(email, password, profile);

        if (res.success) {
            alert("Account Registered")
            handleClearForms();
            nav('./register')
        } else {
            setError(res.messsage);
        }
    }

    if (loading) return <LoadingPage />

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" >
                <div className="col-12 col-md-8 p-4 my-5 bg-primary-subtle rounded shadow-lg">
                    <form onSubmit={handleRegister}>
                        <div className="h4 text-center fw-bold mb-3">Create New Account</div>


                        {/* <div className="h4 text-start">Account Credentials</div> */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group rounded bg-white border-secondary-subtle">
                                <input type={showPassword ? "text" : "password"} className="form-control border-0" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button
                                    className="btn border-0 material-symbols-outlined"
                                    type="button"
                                    onClick={() =>
                                        showPassword ? setShowPassword(false) : setShowPassword(true)
                                    }
                                >{showPassword ? "visibility_off" : "visibility"}</button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <div className="input-group rounded bg-white border-secondary-subtle">
                                <input type={showPasswordConfirm ? "text" : "password"} className="form-control border-0" minLength={8} required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                <button
                                    className="btn border-0 material-symbols-outlined"
                                    type="button"
                                    onClick={() =>
                                        showPasswordConfirm ? setShowPasswordConfirm(false) : setShowPasswordConfirm(true)
                                    }
                                >{showPasswordConfirm ? "visibility_off" : "visibility"}</button>
                            </div>
                        </div>

                        {
                            passwordError ? (
                                <div className="d-flex justify-content-end">
                                    <div className="p p-1 px-2 bg-danger border rounded border-danger text-center mb-3">{passwordError}</div>
                                </div>
                            ) : ""
                        }

                        {/* Role */}
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <Form.Select aria-label="Default select example" required value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="0">Guest (Default)</option>
                                <option value="1">Staff</option>
                                <option value="2">Branch Manager</option>
                                <option value="3">Regional Manager</option>
                                <option value="4">Administrator</option>
                            </Form.Select>
                        </div>

                        {/* Branch */}
                        <div className="mb-3">
                            <label className="form-label">Branch</label>

                            <Form.Select aria-label="Default select example" required value={branch} onChange={(e) => setBranch(e.target.value)}>
                                <option hidden>Open this select menu</option>
                                <option value="1">name - address</option>
                                <option value="2">option1 - address option</option>
                            </Form.Select>
                        </div>


                        <div className="d-flex justify-content-end">
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="setup-profile"
                                value={setupProfile}
                                onChange={() => toggleSetupProfile(setupProfile ? false : true)}
                                label="Add Profile"
                                reverse
                            />
                        </div>

                        {/* Profile */}
                        {
                            setupProfile ? (
                                <>
                                    <hr />
                                    {/* <div className="h4 text-center fw-bold">Account Profile</div> */}

                                    <div className="mb-3">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Middle Name</label>
                                        <input type="text" className="form-control" value={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control" value={birth_date} onChange={(e) => setBirthDate(e.target.value)} />
                                    </div>
                                </>
                            ) : ""
                        }

                        {
                            error ? (
                                <div className="p py-1 bg-danger-subtle border rounded border-danger text-center mt-5">{error}</div>
                            ) : ""
                        }

                        <div className="d-flex justify-content-end align-items-center mt-5 gap-2">
                            <div className="btn btn-outline-secondary fw-bold" onClick={handleClearForms}>Clear</div>
                            <input type='submit' className="btn btn-primary fw-bold" value="Create" />
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
} 