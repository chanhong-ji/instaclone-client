import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormBox from "../components/auth/FormBox";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import SocialLogin from "../components/auth/SocialLogin";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/FormError";
import { getUserLogin } from "../apollo";
import { login, loginVariables } from "../__generated__/login";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const location = useLocation();
  const state = location.state as loginVariables;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<loginVariables & { result: string }>({
    mode: "onChange",
    defaultValues: {
      username: state?.username,
      password: state?.password,
    },
  });

  // form submit
  const onSubmitValid: SubmitHandler<loginVariables> = () => {
    if (loading) return;
    const { username, password } = getValues();
    login({
      variables: { username: String(username), password: String(password) },
    });
  };

  // after getting mutation data
  const onCompleted = (data: login) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", { message: data.login?.error || "" });
    }
    if (token) {
      getUserLogin(token);
      navigate(0);
    }
  };

  // graphQL db
  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    { onCompleted }
  );

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
            maxLength={40}
            onFocus={() => clearErrors("result")}
          />
          <FormError text={errors?.username?.message} />

          <input
            {...register("password", {
              required: "Password is required",
              maxLength: 20,
            })}
            type="password"
            placeholder="Password"
            maxLength={40}
            onFocus={() => clearErrors("result")}
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
