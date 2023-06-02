import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session }  = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user!.name} <br />
        <img
          src={session.user!.image as string}
          alt="icon"
          style={{ width: "100px", height: "100px" }}
        />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
