import Signin from "@/components/Auth/Signin";

const Login = ({ searchParams: { callbackUrl } }) => {
  return <Signin callbackUrl={callbackUrl || "/"} />;
};

export default Login;
