"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();

  return (
    // <div>Client: {session.data?.user ? "signed in" : "signed out"}</div>
    <div>Client: {session.status}</div>
  )
}

export default Profile;