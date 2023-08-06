"use client";

import { useSession } from "next-auth/react";

const ProtectedClient = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>
        Wellcome to{" "}
        <span className="text-red-600 uppercase">protected client page</span>
      </h1>
      <h2>Email: {session?.user?.email}</h2>
      <h2>Name: {session?.user?.name}</h2>
      <h2>Role: {session?.user?.role}</h2>
    </div>
  );
};

export default ProtectedClient;
