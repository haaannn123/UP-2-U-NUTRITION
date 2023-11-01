import { useNavigate } from 'react-router-dom'
import "./LoginForm.css";
import { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { logout } from "../../store/session";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      navigate('/');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
    {user ? (
      <button onClick={handleLogout}>Logout</button>
    ): (
      <div className="login-container">
      <div className="login-box flex flex-1 flex-col justify-center px-3 py-9 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors.map((error, idx) => (
            <p className="text-red-500"key={idx}>{error}</p>
          ))}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" style={{color: "#5eac00"}} className="font-semibold">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                style={{backgroundColor: '#5eac00'}}
                className="sign-in-button flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-white"
              >Sign in</button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">Not a member?{' '}<a href="#" style={{color: "#5eac00"}} className="font-semibold leading-6">Sign Up</a>
          </p>
        </div>
      </div>
      </div>
      )}
      
    </>
  );
}

export default LoginFormPage;

