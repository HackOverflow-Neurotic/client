import AuthButton from "../auth/Authbutton";

export default function Navbar(){
    return(
        <>
            <div className="flex w-full fixed justify-between items-center p-6">
                <span className="text-3xl font-semi-bold ">Lorem</span>
                <AuthButton />
            </div>
        </>
    )
}