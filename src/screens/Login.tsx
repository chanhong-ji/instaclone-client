import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import SocialLogin from "../components/auth/SocialLogin";
import PageTitle from "../components/PageTitle";
import { useRef } from "react";

interface IForm {
  username?: string;
  password?: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = ({ username, password }: IForm) => {};
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("username", {
              required: "Username is required",
              maxLength: 16,
            })}
            placeholder="Username"
          />
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
          />
          <input type="submit" value="Login" disabled={false} />
        </form>
      </FormBox>
      <SocialLogin />
      <Link to="/">
        <span>Forgot Password?</span>
      </Link>
      <BottomBox to="/signup" text="Don't have an account?" />
    </AuthLayout>
  );
}

export default Login;
