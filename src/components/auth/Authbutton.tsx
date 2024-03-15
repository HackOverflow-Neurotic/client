import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function AuthButton(){
    const {data:session} = useSession();
    const user = session?.user;
    return(
        <>
            {
                user ? (
                    <Button onClick={async () => {
                        await signOut()
                    }}>
                        Logout
                    </Button>
                ): (
                    <>
                        <Button onClick={async () => {
                            await signIn('google');
                        }}>
                            Login
                        </Button>
                    </>
                )
            }
        </>
    )
}