import React, { useState } from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auths({ isModel = false }) {
  const dispatch = useDispatch()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + '/api/auth/google', { name, email }, { withCredentials: true })
      localStorage.setItem("prepwise-auth", "true")
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message || 'Google sign-in failed.')
      dispatch(setUserData(null))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const payload = { email: form.email, password: form.password }
      if (mode === 'register') payload.name = form.name
      const result = await axios.post(ServerUrl + url, payload, { withCredentials: true })
      localStorage.setItem("prepwise-auth", "true")
      dispatch(setUserData(result.data))
    } catch (error) {
      setError(error?.response?.data?.message || 'Authentication failed.')
      dispatch(setUserData(null))
    }

    setLoading(false)
  }

  return (
    <div className={`w-full ${isModel ? 'py-0' : 'min-h-[100dvh] bg-[#f3f3f3] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-20'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.05 }}
        className={`w-full ${isModel ? 'max-w-md p-5 pt-12 sm:p-8 sm:pt-12 rounded-2xl sm:rounded-3xl' : 'max-w-lg p-6 sm:p-10 lg:p-12 rounded-3xl'} bg-white shadow-2xl border border-gray-200`}
      >
        <div className='flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex min-w-0 items-center gap-3'>
            <div className='shrink-0 bg-[#5937F7] text-white p-3 rounded-2xl'>PW</div>
            <div>
              <h2 className='font-semibold text-lg'>PrepWise AI</h2>
              <p className='text-xs text-gray-500'>HR & behavioral interview coach</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2 text-sm text-gray-500 sm:flex'>
            <button type='button' onClick={() => setMode('login')} className={`px-3 py-2 rounded-full ${mode === 'login' ? 'bg-[#5937F7] text-white' : 'bg-gray-100'}`}>
              Login
            </button>
            <button type='button' onClick={() => setMode('register')} className={`px-3 py-2 rounded-full ${mode === 'register' ? 'bg-[#5937F7] text-white' : 'bg-gray-100'}`}>
              Register
            </button>
          </div>
        </div>

        <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
          {mode === 'login' ? 'Welcome back,' : 'Create your account'}
        </h1>

        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-6'>
          {mode === 'login'
            ? 'Login with email and password or continue with Google.'
            : 'Register to save your interview progress and receive detailed feedback reports.'}
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {mode === 'register' && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#5937F7] outline-none'
                placeholder='Enter your name'
              />
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
            <input
              required
              type='email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className='w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#5937F7] outline-none'
              placeholder='Enter your email'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <input
              required
              type='password'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className='w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#5937F7] outline-none'
              placeholder='Enter a secure password'
            />
          </div>

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#5937F7] text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-60'
          >
            {loading ? 'Working...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-gray-500'>Or continue with</div>
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className='w-full mt-4 flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-2xl'
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Auths
