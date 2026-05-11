import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auths'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import AptitudePage from './pages/AptitudePage'
import Layout from './components/Layout'
import BehaviouralQuestions from './pages/BehaviouralQuestions'
import About from './pages/About'

export const ServerUrl = `http://localhost:8000`

const PageLoader = () => (
  <div className='flex min-h-screen items-center justify-center bg-slate-50 text-slate-600'>
    Loading...
  </div>
)

function App() {

  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(()=>{
    const getUser = async () => {
      if (localStorage.getItem("prepwise-auth") !== "true") {
        dispatch(setUserData(null))
        setAuthLoading(false)
        return
      }

      try {
        const result = await axios.get(ServerUrl +"/api/user/current-user", {withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        if (error.response?.status !== 401) {
          console.log(error)
        }
        localStorage.removeItem("prepwise-auth")
        dispatch(setUserData(null))
      } finally {
        setAuthLoading(false)
      }
    }
    getUser()

  },[dispatch])

  const protectedPage = (children) => {
    if (authLoading) return <PageLoader />
    if (!userData) return <Navigate to='/auth' replace />
    return <Layout>{children}</Layout>
  }

  return (
    <>
      <Routes>
        <Route path='/auth' element={authLoading ? <PageLoader /> : userData ? <Navigate to='/' replace /> : <Auth/>}/>
        <Route path='/' element={protectedPage(<Home/>)} />
        <Route path='/interview' element={protectedPage(<InterviewPage/>)} />
        <Route path='/hr-interview' element={protectedPage(<InterviewPage initialMode="HR"/>)} />
        <Route path='/behavioural-interview' element={protectedPage(<BehaviouralQuestions/>)} />
        <Route path='/aptitude' element={protectedPage(<AptitudePage/>)} />
        <Route path='/about' element={protectedPage(<About/>)} />
        <Route path='/history' element={protectedPage(<InterviewHistory/>)} />
        <Route path='/pricing' element={protectedPage(<Pricing/>)} />
        <Route path='/report/:id' element={protectedPage(<InterviewReport/>)} />
      </Routes>
    </>
  )
}

export default App
