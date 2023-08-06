import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signout from "../Auth/Signout";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex gap-2">
      <Link className="text-orange-600" href="/">
        Home
      </Link>
      <Link href="/protected/client">Protected client</Link>
      <Link href="/protected/server">Protected server</Link>

      {session ? (
        <>
          <Link href="/profile/client">Profile client</Link>
          <Link href="/profile/server">Profile server</Link>
          <Link href="/dashboard">Admin Dashboard</Link>
          <Signout />
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </header>
  );
};

export default Header;
