import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { useNavigate } from "react-router-dom";

function SignupFormPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (user) return navigate('/');

  const emailValidation = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  useEffect(() => {
    const errors = {}
    if (!emailValidation(email)) errors.email = "Not a valid email address";
    if (!firstName || firstName.trim().length > 50 || firstName.trim().length < 2)
      errors.firstName = "First name must be between 2 characters and 50 characters";
    if (!lastName || lastName.trim().length > 50 || lastName.trim().length < 2)
      errors.lastName = "Last name must be between 2 characters and 50 characters";
    if (!password || password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Password must match"
    if (!phone || phone.replace(/-/g, '').length !== 10) errors.phone = "Must be a valid US Number"

    setErrors(errors)
  }, [email, password, firstName, lastName, phone])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    let formErrors = {}

    if (!emailValidation(email)) errors.email = "Not a valid email address";
    if (!firstName || firstName.trim().length > 50 || firstName.trim().length < 2)
      errors.firstName = "First name must be between 2 characters and 50 characters";
    if (!lastName || lastName.trim().length > 50 || lastName.trim().length < 2)
      errors.lastName = "Last name must be between 2 characters and 50 characters";
    if (!password || password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Password must match"
    if (!phone || phone.replace(/-/g, '').length !== 10) errors.phone = "Must be a valid US Number"


    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const data = await dispatch(signUp(email, firstName, lastName, phone, password));

  };

  return (
    <>
      <div className="login-container">
        <div className="login-box flex flex-1 flex-col justify-center px-3 py-9 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-extrabold leading-9 tracking-tight text-gray-900">
              Sign up for an account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* {errors.map((error, idx) => (
              <p className="text-red-500" key={idx}>{error}</p>
            ))} */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                {errors.email && submitted && (
                  <p className="text-red-600 text-xs italic" >{errors.email}</p>
                )}
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
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                {errors.firstName && submitted && (
                  <p className="text-red-600 text-xs italic" >{errors.firstName}</p>
                )}
                <div className="mt-2">
                  <input
                    id="first_name_signup"
                    name="first_name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                {errors.lastName && submitted && (
                  <p className="text-red-600 text-xs italic" >{errors.lastName}</p>
                )}
                <div className="mt-2">
                  <input
                    id="last_name_signup"
                    name="last_name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                {errors.phone && submitted && (
                  <p className="text-red-600 text-xs italic" >{errors.phone}</p>
                )}
                <div className="mt-2">
                  <input
                    id="phone_signup"
                    name="phone"
                    type="text"
                    onChange={(e) => {
                      const input = e.target.value;
                      const formattedInput = "+1" + input
                      setPhone(formattedInput);
                    }}
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
                  {errors.password && submitted && (
                    <p className="text-red-600 text-xs italic" >{errors.password}</p>
                  )}
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  style={{ backgroundColor: '#5eac00' }}
                  className="sign-in-button flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-white"
                >Sign up</button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">Already a member?{' '}
              <a href="#" style={{ color: "#5eac00" }} onClick={() => navigate('/login')} className="font-semibold leading-6">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
