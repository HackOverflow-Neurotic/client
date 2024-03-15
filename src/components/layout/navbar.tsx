import AuthButton from "../auth/Authbutton";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50  flex justify-center items-center pt-5 ">
            <div className="flex w-2/3 rounded-full bg-white bg-opacity-20 backdrop-blur-lg justify-between items-center p-6 border-white border-1.5 ">
                <div className="text-3xl font-bold px-5">
                    <span className="text-purple-600">Bin</span>Sense
                </div>
                <div className="px-5">
                <AuthButton />
                </div>
                
            </div>
        </div>
    );
}
