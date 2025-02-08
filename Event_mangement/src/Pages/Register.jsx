import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
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
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await register(formData);
      navigate('/login');
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white text-center">
              Welcome to <br /> Event Manager
            </h2>
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
            <p className="text-sm text-gray-600 mt-2">
              Let's get started with your 30 days free trial
            </p>
          </div>
          <div className="mt-6">
            <button className="btn btn-google w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
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
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
            <div className="form-control">
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox checkbox-primary mr-2" required />
                <span className="label-text">I agree to all Term, Privacy Policy and Fees</span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading && 'btn-disabled'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mr-2" /> Signing up
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;