import { useEffect, useState } from "react"
import { useTheme } from "../../services/ThemeContext"

export default function PasswordInput({value, onChangeFunction, autoFocus}) {
    const [show, setShow] = useState(false)
    const [inputError, setInputError] = useState('')
    const { theme } = useTheme()

    useEffect( () => {
        if(value.length < 8 && value.length > 0) {
            setInputError('Requires at least 8 characters ')
        } else {
            setInputError('')
        }
    }, [value])

    return (
        <>
            <div className={`input-group rounded border border-1 ${inputError.length > 0 ? 'border-danger ' : ''}`}>
                <input type={show ? "text" : "password"} className="form-control border-0" minLength={8} value={value} onChange={onChangeFunction} autoFocus={autoFocus?true:false}  />
                <button
                    className={`btn material-symbols-outlined ${theme == 'dark' ? 'bg-dark-subtle' : 'bg-white'}`}
                    type="button"
                    onClick={() =>
                        show ? setShow(false) : setShow(true)
                    }
                    tabIndex={-1}
                >{show ? "visibility_off" : "visibility"}</button>
            </div>
            {
                inputError ? <div className="text-muted text-end">{inputError}</div> : ''
            }
        </>
    )
}