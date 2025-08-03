export default function LoadingPage({message}) {
    const display_msg = message ? message : "Generating Content"
    return (
        <>
            <div className="container-fluid flex-column h-100 d-flex justify-content-center align-items-center">


                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>


                <div className="p mt-3 text-center">{display_msg} <br />Please Wait</div>
            </div>
        </>
    )
}