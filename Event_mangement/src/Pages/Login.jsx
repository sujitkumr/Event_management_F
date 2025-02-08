import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader } from 'lucide-react';

function Login() {
  const { isLoading, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await login(formData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-4xl font-bold blur-0 text-slate-400 text-center">
              Welcome to <br /> Event
            </h2>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
            <p className="text-sm text-gray-600 mt-2">
              Or{' '}
              <Link to="/register" className="text-primary hover:underline">
                create a new account
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <button className="btn btn-google w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
              Login with Google
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control relative">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-12 text-gray-600"
                onClick={togglePassword}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading && 'btn-disabled'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" /> Logging in
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;