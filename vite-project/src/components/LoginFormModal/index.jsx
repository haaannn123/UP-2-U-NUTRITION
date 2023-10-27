import { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from 'react-router-dom'
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      navigate('/')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col justify-center items-center w-full">
      <h1 className="text-5xl p-1">Log In</h1>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="text-3xl">Email</label>
      <input
        className="bg-slate-400"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="text-3xl">Password</label>
      <input
        className="bg-slate-400"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-white w-full border-black p-2 text-2xl" type="submit">Log In</button>
    </form>
  );
}

export default LoginFormModal;
