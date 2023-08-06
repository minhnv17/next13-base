import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { redirect } from "next/navigation";

interface LoginReturn {
  status: boolean;
  token: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const { status, token } = (await signInWithCredentials({
          email,
          password,
        })) as LoginReturn;
        if (status) {
          return {
            email: email,
            access_token: token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/errors",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      let userInfomation = { ...token, ...user };
      let updateUser = await getUserInfomation(userInfomation.access_token);
      userInfomation = { ...userInfomation, ...updateUser };
      return userInfomation;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginReturn> {
  const url = "http://54.151.169.124:4001/user/login";
  const data = {
    email: email,
    password: password,
  };
  let result = { status: false, token: "" };
  await axios
    .post(url, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      result.status = true;
      result.token = response.data.access_token;
    })
    .catch((error) => {
      // Need handle error here
      result.status = false;
      redirect(`/errors?error=${error.response.statusText}`);
    });

  return result;
}

async function getUserInfomation(token: string) {
  const url = "http://54.151.169.124:4001/user";
  let userInfo = {
    name: "",
    role: [],
  };
  await axios
    .get(url, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      userInfo.name = response.data.fullName;
      userInfo.role = response.data.role;
    })
    .catch((error) => {
      console.log(error);
    });

  return userInfo;
}
