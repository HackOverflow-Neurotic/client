import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { DoorClosed, DoorOpen } from "lucide-react";


export default function AuthButton(){
    const {data:session} = useSession();
    const user = session?.user;
    return(
        <>
            {
                user ? (
                    <Button className="gap-2" onClick={async () => {
                        await signOut()
                    }}>
                        Logout <DoorOpen/>
                    </Button>
                ): (
                    <>
                        <Button className="gap-2" onClick={async () => {
                            await signIn('google');
                        }}>
                            Login <DoorClosed/>
                        </Button>
                    </>
                )
            }
        </>
    )
}