import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auths'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import AptitudePage from './pages/AptitudePage'
import Layout from './components/Layout'
import AuthModel from './components/AuthModel'
import BehaviouralQuestions from './pages/BehaviouralQuestions'
import About from './pages/About'

const apiHost = typeof window !== "undefined" ? window.location.hostname : "localhost"
export const ServerUrl = `http://${apiHost}:8000`

function App() {

  const dispatch = useDispatch()
  const [showAuth, setShowAuth] = useState(false)

  useEffect(()=>{
    const getUser = async () => {
      if (localStorage.getItem("prepwise-auth") !== "true") {
        dispatch(setUserData(null))
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
      }
    }
    getUser()

  },[dispatch])

  const handleShowAuth = () => setShowAuth(true)
  const handleCloseAuth = () => setShowAuth(false)

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/' element={<Layout onShowAuth={handleShowAuth}><Home onShowAuth={handleShowAuth}/></Layout>}/>
        <Route path='/interview' element={<Layout onShowAuth={handleShowAuth}><InterviewPage onShowAuth={handleShowAuth}/></Layout>}/>
        <Route path='/hr-interview' element={<Layout onShowAuth={handleShowAuth}><InterviewPage initialMode="HR" onShowAuth={handleShowAuth}/></Layout>}/>
        <Route path='/behavioural-interview' element={<Layout onShowAuth={handleShowAuth}><BehaviouralQuestions/></Layout>}/>
        <Route path='/aptitude' element={<Layout onShowAuth={handleShowAuth}><AptitudePage onShowAuth={handleShowAuth}/></Layout>}/>
        <Route path='/about' element={<Layout onShowAuth={handleShowAuth}><About/></Layout>}/>
        <Route path='/history' element={<Layout onShowAuth={handleShowAuth}><InterviewHistory/></Layout>}/>
        <Route path='/pricing' element={<Layout onShowAuth={handleShowAuth}><Pricing/></Layout>}/>
        <Route path='/report/:id' element={<Layout onShowAuth={handleShowAuth}><InterviewReport/></Layout>}/>
      </Routes>

      {showAuth && <AuthModel onClose={handleCloseAuth} />}
    </>
  )
}

export default App
