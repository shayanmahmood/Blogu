function Spinner() {
    return (
        <div className="h-screen m-0 p-0 flex justify-center items-center">
            <div className="pointer-events-none w-[2.5em] h-[2.5em] border-[0.4em] border-[solid] border-[transparent] border-[#eee] [border-top-color:#3E67EC] rounded-[50%] animate-[loadingspin_1s_linear_infinite]"></div>
        </div>
    )
}

export default Spinner
