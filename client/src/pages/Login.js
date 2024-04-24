import { gql, useApolloClient, useMutation } from '@apollo/client';
import { GoogleLogin } from '@react-oauth/google';
import { axiosBase as axios } from '@utils/Api.js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import busMapImg from '../assets/busMap.png';
import { ButtonLoading } from '../components/Button.js';
import { loginUser } from '../redux/reducers/authReducer.js';

export const LOGIN_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      user {
        name
        photo
        email
        role
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [err, setErr] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [LoginUser, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  const client = useApolloClient();

  const from = location?.state || '/dashboard/main';
  const handleLogin = async (googleData) => {
    const { data } = await LoginUser({
      variables: {
        input: { token: googleData.credential }
      }
    });
    dispatch(loginUser(data.loginUser));
    navigate(from);
    toast.success('Login successful');
    await client.resetStore();
    return true;
    // store returned user somehow
  };
  const onFailure = () => {
    toast.error(
      'Login process was not successful. Refresh the page and try again'
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  /* istanbul ignore next */
  const onValid = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/accounts/login', data);
      dispatch(loginUser(response.data.data));
      toast(`Welcome ${response.data.data.first_name}`, {
        type: 'info'
      });
      navigate(from);
    } catch (error) {
      setErr(error?.response?.data?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onErrors = (errors) => {
    if (errors.password && !errors.email) {
      setAttempts(attempts + 1);
    }
  };
  useEffect(() => {
    if (attempts > 3 && attempts < 5) {
      setErr('Wrong attempts of more than 3 times.');
    } else if (attempts > 5) {
      setErr('Try again in 5 minutes');
    }
  }, [attempts]);

  return (
    <div className=" z-0 h-full">
      <main className="min-h-[80vh] flex flex-col  md:flex-row items-center w-full justify-center shadow-md relative h-full pb-52 md:pb-1 md:pt-1 pt-10">
        <section className="max-w-sm mt-[-60px] md:flex md:items-center md:justify-center md:mx-auto xl:ml-64">
          <img src={busMapImg} className="w-full object-cover " alt="" />
        </section>
        <section className="flex flex-col  py-3 px-4 w-72 md:w-fit md:min-w-[300px] shadow-main absolute bg-white top-28 md:top-0 md:mx-auto md:relative rounded-lg xl:mr-64">
          <form
            id="loginForm"
            className="flex flex-col w-full px-4"
            onSubmit={handleSubmit(onValid, onErrors)}
          >
            <h2 className="text-2xl mb-5 text-center font-extrabold">Login</h2>

            <p className="font-bold text-sm font-raleway">
              {from !== '/dashboard/main' && (
                <div>
                  <p>Login is required to access:</p>
                  <p className="font-bold text-green-600 cursor-pointer">
                    {from}
                  </p>
                </div>
              )}
            </p>
            <p className="font-bold capitalize text-red text-sm py-1">{err}</p>
            <label
              htmlFor="email"
              className="capitalize mb-1.5 font-semibold text-sm required"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Enter a valid email'
                }
              })}
              className="rounded-md mb-1 p-1 border-2 w-full outline-none focus:border-gray-500"
            />
            <p id="email-errors" className="text-red-600 text-sm pb-3">
              {errors?.email && errors.email.message}
            </p>
            <label
              htmlFor="email"
              className="capitalize mb-2 font-semibold required"
            >
              Password:
            </label>
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter password"
              {...register('password', { required: 'Password is required' })}
              className="rounded-md mb-2 p-1 border-2 w-full outline-none focus:border-gray-500"
            />
            <p className="text-red-600 text-sm">
              {errors?.password && errors.password.message}
            </p>
            <div>
              <input
                onChange={(e) => togglePassword(e)}
                type="checkbox"
                name=""
                id="show"
              />
              <label
                className="font-raleway font-bold mx-1 text-sm"
                htmlFor="show"
              >
                Show password
              </label>
            </div>

            <Link to="/accounts/reset-password">
              <h4 className="text-primary text-right mb-5 text-sm font-bold">
                Forgot password?
              </h4>
            </Link>

            {attempts > 5 ? (
              <button
                type="button"
                disabled
                className="bg-red-500 px-5 py-2 rounded-md text-white w-fit mx-auto hover:bg-red-900 transition-all hover:transition-all"
              >
                Unlock in 5 minutes
              </button>
            ) : (
              <>
                {loading ? (
                  <div className="mx-auto">
                    <ButtonLoading name="sending..." />
                  </div>
                ) : (
                  <button
                    type="submit"
                    id="login-btn"
                    className="bg-primary px-5 py-2 rounded-md text-white w-fit mx-auto hover:bg-hover transition-all hover:transition-all"
                  >
                    Login
                  </button>
                )}
                <GoogleLogin
                  clientId={process.env.CLIENT_ID}
                  text={
                    loginLoading ? t('Loading....') : t('Log in with Google')
                  }
                  onSuccess={handleLogin}
                  onFailure={onFailure}
                  cookiePolicy="single_host_origin"
                  useOneTap
                />
              </>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
