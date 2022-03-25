import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import SocialLogin from "../components/auth/SocialLogin";
import FormBox from "../components/auth/FormBox";
import PageTitle from "../components/PageTitle";

function Signup() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {};
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("username", {
              required: true,
              minLength: 4,
              maxLength: 8,
            })}
            placeholder="Username"
          />
          <input
            {...register("email", {
              required: true,
              maxLength: 50,
            })}
            placeholder="Email"
          />
          <input
            {...register("password", {
              required: true,
              minLength: 4,
              maxLength: 16,
            })}
            type="Password"
          />
          <input
            {...register("passwordConfirm", { required: true, maxLength: 16 })}
            type="Password Confirm"
          />
          <input type="submit" value="Join" />
        </form>
      </FormBox>
      <SocialLogin />
      <BottomBox to="/login" text="Do you already have an account?" />
    </AuthLayout>
  );
}

export default Signup;
