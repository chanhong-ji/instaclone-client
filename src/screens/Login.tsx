import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import SocialLogin from "../components/auth/SocialLogin";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/FormError";
import { getUserLogin } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setError,
  } = useForm({ mode: "onChange" });
  // form submit
  const onSubmitValid = () => {
    if (loading) return;
    const { username, password } = getValues();
    login({ variables: { username, password: String(password) } });
  };
  // graphQL db
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { ok, error, token },
      } = data;
      if (!ok) {
        return setError("result", { message: error });
      }
      if (token) {
        getUserLogin(token);
      }
    },
  });

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <input
            {...register("username", {
              required: "Username is required",
              maxLength: 20,
            })}
            placeholder="Username"
          />
          <FormError text={errors?.username?.message} />
          <input
            {...register("password", {
              required: "Password is required",
              maxLength: 20,
            })}
            type="password"
            placeholder="Password"
          />
          <FormError text={errors?.password?.message} />
          <input type="submit" value={"Login"} disabled={!isValid || loading} />
        </form>
        <FormError text={errors?.result?.message} />
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
