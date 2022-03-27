import { SubmitHandler, useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import SocialLogin from "../components/auth/SocialLogin";
import FormBox from "../components/auth/FormBox";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/FormError";
import { useNavigate } from "react-router-dom";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

interface IForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  result: string;
}

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<IForm>({ mode: "onChange" });

  const navigate = useNavigate();

  // graphQL db
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT, {
    onCompleted: (data) => {
      const {
        createAccount: { ok, error },
      } = data;
      if (!ok) return setError("result", { message: error || undefined });
      const { username, password } = getValues();
      navigate("/login", { state: { username, password } });
    },
  });

  // form submit
  const onSubmitValid: SubmitHandler<IForm> = async () => {
    if (loading) return;
    const { username, email, password, passwordConfirm } = getValues();
    // Check password Cofirm
    if (password !== passwordConfirm) {
      return setError(
        "password",
        { message: "Password confirm Wrong" },
        { shouldFocus: true }
      );
    }
    // Create Account
    createAccount({
      variables: {
        username: String(username),
        email: String(email),
        password: String(password),
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <input
            {...register("username", {
              required: "required",
              minLength: { value: 4, message: "should be more than 4" },
              maxLength: { value: 20, message: "Too long" },
            })}
            placeholder="Username 4-20"
            maxLength={40}
            onFocus={() => clearErrors("result")}
          />
          <FormError text={errors?.username?.message}></FormError>

          <input
            {...register("email", {
              required: "required",
              maxLength: 50,
            })}
            type="email"
            placeholder="Email"
            maxLength={40}
            onFocus={() => clearErrors("result")}
          />
          <FormError text={errors?.email?.message}></FormError>

          <input
            {...register("password", {
              required: "required",
              minLength: { value: 4, message: "more than 4" },
              maxLength: { value: 16, message: "shorter than 16" },
            })}
            type="password"
            placeholder="Password 4-16"
            maxLength={40}
          />
          <FormError text={errors?.password?.message}></FormError>

          <input
            {...register("passwordConfirm", {
              required: "required",
              maxLength: 16,
            })}
            type="password"
            placeholder="Password Confirm"
            maxLength={40}
          />

          <input type="submit" value="Join" disabled={!isValid} />
        </form>
        <FormError text={errors?.result?.message} />
      </FormBox>
      <SocialLogin />
      <BottomBox to="/login" text="Do you already have an account?" />
    </AuthLayout>
  );
}

export default Signup;
