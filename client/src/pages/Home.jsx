import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  BsBarChart,
  BsLightningCharge,
  BsMic,
} from 'react-icons/bs'
import { FaComments, FaUserTie } from 'react-icons/fa'
import { GiBrain } from 'react-icons/gi'

function Home() {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const requireAuth = (path) => {
    if (!userData) {
      navigate('/auth')
      return
    }
    navigate(path)
  }

  const featureCards = [
    {
      icon: <BsMic size={24} />,
      title: 'AI Mock Interview',
      desc: 'Practice technical interviews with voice, timer, answer review, and final performance report.',
      cta: 'Start mock',
      path: '/interview',
    },
    {
      icon: <FaUserTie size={24} />,
      title: 'HR Practice',
      desc: 'Prepare for common HR questions about goals, weakness, motivation, teamwork, and culture fit.',
      cta: 'Practice HR',
      path: '/hr-interview',
    },
    {
      icon: <FaComments size={24} />,
      title: 'Behaviour Guide',
      desc: 'Learn repeated behavioural questions with structured sample answers and tough workplace scenarios.',
      cta: 'Learn answers',
      path: '/behavioural-interview',
      public: true,
    },
    {
      icon: <GiBrain size={24} />,
      title: 'AI Aptitude Test',
      desc: 'Generate a fresh 20-question aptitude slot with timer, scoring, and reduced question repetition.',
      cta: 'Take test',
      path: '/aptitude',
      public: true,
    },
  ]

  const stats = [
    { value: '20', label: 'AI aptitude questions per slot' },
    { value: '3', label: 'Interview modes' },
    { value: '10+', label: 'Repeated behavioural questions' },
    { value: 'Live', label: 'Voice based mock flow' },
  ]

  return (
    <div className='space-y-10'>
      <section className='overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-soft'>
        <div className='grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10'>
          <div className='flex flex-col justify-center'>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-500'
            >
              <BsLightningCharge />
              AI interview preparation dashboard
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className='max-w-3xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl'
            >
              Practice interviews, aptitude, and behavioural answers in one place.
            </motion.h1>

            <p className='mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg'>
              PrepWise AI helps candidates prepare with resume assisted mock interviews,
              repeated HR and behavioural questions, AI-generated aptitude tests, and
              detailed performance reports.
            </p>

            <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
              <button
                onClick={() => requireAuth('/interview')}
                className='rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-white shadow-soft transition hover:opacity-95'
              >
                Start Interview
              </button>
              <button
                onClick={() => navigate('/aptitude')}
                className='rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-50'
              >
                Take Aptitude Test
              </button>
            </div>
          </div>

          <div className='rounded-2xl border border-gray-100 bg-gray-50 p-5'>
            <div className='mb-5 flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white'>
                <BsBarChart size={22} />
              </div>
              <div>
                <h2 className='font-bold text-gray-900'>Preparation Snapshot</h2>
                <p className='text-sm text-gray-500'>Everything your project currently supports</p>
              </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {stats.map((item) => (
                <div key={item.label} className='rounded-xl bg-white p-4 shadow-sm'>
                  <p className='text-2xl font-bold text-primary-500'>{item.value}</p>
                  <p className='mt-1 text-sm text-gray-600'>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {featureCards.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft'
          >
            <div className='mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-500'>
              {feature.icon}
            </div>
            <h3 className='text-lg font-bold text-gray-900'>{feature.title}</h3>
            <p className='mt-2 min-h-20 text-sm leading-relaxed text-gray-600'>{feature.desc}</p>
            <button
              onClick={() => feature.public ? navigate(feature.path) : requireAuth(feature.path)}
              className='mt-5 font-semibold text-primary-500 transition hover:text-primary-600'
            >
              {feature.cta}
            </button>
          </motion.article>
        ))}
      </section>
    </div>
  )
}

export default Home
