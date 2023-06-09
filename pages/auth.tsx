import axios from 'axios';
import { useState, useCallback } from 'react';
import { Input } from '@/components';
import { signIn } from 'next-auth/react';


const Auth = () => {

  const [ formData, setFormData ] = useState({ name: '', email: '', password: '' });
  const [ variant, setVariant ] = useState('login');

  const handleInputChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  });

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/profiles'
      });
    } catch (err) {
      console.log(err);
    }
  }, [formData.email, formData.password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email: formData.email,
        name: formData.name,
        password: formData.password
      });

      login();
    } catch (err) {
      console.log(err);
    }
  }, [formData.email, formData.name, formData.password, login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={formData.name}
                  onChange={handleInputChange} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={formData.email}
                onChange={handleInputChange} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={formData.password}
                onChange={handleInputChange} 
              />
            </div>
            <button onClick={ variant === 'login' ?  () => login() : () => register() } className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Sign Up' : 'Sign In'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;