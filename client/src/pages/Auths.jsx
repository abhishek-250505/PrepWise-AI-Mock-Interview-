import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
function Auths({ isModel = false, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.userData)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])
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
      navigate('/')
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
      navigate('/')
    } catch (error) {
      setError(error?.response?.data?.message || 'Authentication failed.')
      dispatch(setUserData(null))
    }

    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-slate-100  via-slate-50 to-slate-200 flex items-center justify-center px-6 lg:px-12'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center'>
          <div className='hidden lg:block rounded-[40px] bg-white/80 border border-slate-200 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)]'>
            <div className='max-w-md'>
              <span className='inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#5937F7] text-xl font-bold text-white'>PW</span>
              <h2 className='mt-10 text-4xl font-bold tracking-tight text-slate-900'>PrepWise AI</h2>
              <p className='mt-4 text-lg text-slate-600'>A polished interview platform using AI, scoring, and full reporting.</p>
              <div className='mt-10 space-y-4 text-slate-700'>
                <div className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4'>Resume-based technical questions</div>
                <div className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4'>Instant AI feedback and scoring</div>
                <div className='rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4'>Clean session reports and history</div>
              </div>
            </div>
          </div>

          <div className='relative w-full  bg-white rounded-[40px] border mt-5 border-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.08)] p-8 sm:p-10'>
            <button
              type='button'
              onClick={() => {
                if (onClose) return onClose()
                navigate('/')
              }}
              className='absolute top-4 right-4 text-gray-800 hover:text-black text-xl z-10'
            >
              <FaTimes size={18} />
            </button>
            <div className='flex flex-col items-center gap-3'>
              <div className='inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#5937F7] text-xl font-bold text-white'>PW</div>
              <div className='flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2'>
                <button type='button' onClick={() => setMode('login')} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-[#5937F7] text-white' : 'text-slate-600 hover:bg-white'}`}>
                  Login
                </button>
                <button type='button' onClick={() => setMode('register')} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${mode === 'register' ? 'bg-[#5937F7] text-white' : 'text-slate-600 hover:bg-white'}`}>
                  Register
                </button>
              </div>
            </div>

            <div className='mt-2 text-center'>
              <h1 className='text-2xl sm:text-4xl font-bold text-slate-900'>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
              <p className='mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto'>
                {mode === 'login'
                  ? 'Enter your credentials to access your interview dashboard.'
                  : 'Sign up to save your sessions and view detailed reports.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className='mt-4 space-y-5'>
              {mode === 'register' && (
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className='w-full border border-slate-200 rounded-3xl px-5 py-1 focus:ring-2 focus:ring-[#5937F7] outline-none text-sm sm:text-base bg-slate-50'
                    placeholder='Enter your name'
                  />
                </div>
              )}

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
                <input
                  required
                  type='email'
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className='w-full border border-slate-200 rounded-3xl px-5 py-1 focus:ring-2 focus:ring-[#5937F7] outline-none text-sm sm:text-base bg-slate-50'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
                <input
                  required
                  type='password'
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className='w-full border border-slate-200 rounded-3xl px-5 py-1 focus:ring-2 focus:ring-[#5937F7] outline-none text-sm sm:text-base bg-slate-50'
                  placeholder='Enter a secure password'
                />
              </div>

              {error && <p className='text-sm text-red-500 text-center'>{error}</p>}

              <button
                type='submit'
                disabled={loading}
                className='w-full rounded-3xl bg-[#5937F7] text-white py-1 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60'
              >
                {loading ? 'Working...' : mode === 'login' ? 'Login' : 'Register'}
              </button>
            </form>

            <div className='mt-3 text-center text-sm text-slate-500'>Or continue with</div>
            <button
              type='button'
              onClick={handleGoogleAuth}
              className='w-full mt-2 flex items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white py-2 text-sm sm:text-base font-semibold text-slate-700 hover:bg-slate-50 transition'
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auths
