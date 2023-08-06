import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const ProtectedServer = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>
        Wellcome to{" "}
        <span className="text-red-600 uppercase">protected server page</span>
      </h1>
      <h2>Email: {session?.user?.email}</h2>
      <h2>Name: {session?.user?.name}</h2>
      <h2>Role: {session?.user?.role}</h2>
    </div>
  );
};

export default ProtectedServer;
