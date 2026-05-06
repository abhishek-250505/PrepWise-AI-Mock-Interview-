import React from 'react'
import { BsBarChart, BsCheckCircle, BsFileEarmarkText, BsMic } from 'react-icons/bs'
import { FaBrain, FaCode, FaComments, FaServer } from 'react-icons/fa'

function About() {
  const features = [
    {
      icon: <BsMic />,
      title: 'AI Mock Interviews',
      text: 'Technical and HR interview practice with voice, timer, answer submission, feedback, and final scoring.',
    },
    {
      icon: <FaComments />,
      title: 'Behavioural Coaching',
      text: 'Repeated behavioural questions, workplace scenarios, smart answer structure, and sample responses.',
    },
    {
      icon: <FaBrain />,
      title: 'Aptitude Practice',
      text: 'AI-generated 20-question aptitude slots with timer, scoring, and reduced repeat questions.',
    },
    {
      icon: <BsBarChart />,
      title: 'Reports',
      text: 'Performance reports show score, confidence, communication, correctness, feedback, and ideal answers.',
    },
  ]

  const techStack = [
    'React + Vite frontend',
    'Tailwind CSS styling',
    'Redux user state',
    'React Router navigation',
    'Node.js + Express backend',
    'MongoDB interview history',
    'OpenRouter AI generation',
    'PDF resume parsing',
    'Razorpay payment flow',
  ]

  const workflow = [
    'User signs in and selects interview, HR, behavioural, or aptitude practice.',
    'Resume upload can extract role, experience, projects, and skills for better interview setup.',
    'AI generates questions or teaches repeated interview questions depending on the selected module.',
    'User answers timed questions and receives feedback, scores, and improvement guidance.',
  ]

  return (
    <div className='space-y-8'>
      <section className='rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-10'>
        <div className='max-w-3xl'>
          <p className='mb-3 inline-flex rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-500'>
            About PrepWise AI
          </p>
          <h1 className='text-4xl font-bold leading-tight text-gray-900 sm:text-5xl'>
            A full-stack AI platform for interview preparation.
          </h1>
          <p className='mt-5 text-base leading-relaxed text-gray-600 sm:text-lg'>
            PrepWise AI helps candidates practice mock interviews, aptitude rounds,
            HR questions, behavioural scenarios, and resume-based preparation from one dashboard.
          </p>
        </div>
      </section>

      <section className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {features.map((feature) => (
          <article key={feature.title} className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-xl text-primary-500'>
              {feature.icon}
            </div>
            <h2 className='text-lg font-bold text-gray-900'>{feature.title}</h2>
            <p className='mt-2 text-sm leading-relaxed text-gray-600'>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <div className='mb-5 flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white'>
              <FaCode />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>Technology Stack</h2>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            {techStack.map((item) => (
              <div key={item} className='flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-700'>
                <BsCheckCircle className='shrink-0 text-emerald-600' />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
          <div className='mb-5 flex items-center gap-3'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600'>
              <FaServer />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>Project Flow</h2>
          </div>

          <div className='space-y-4'>
            {workflow.map((item, index) => (
              <div key={item} className='flex gap-3'>
                <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white'>
                  {index + 1}
                </span>
                <p className='text-sm leading-relaxed text-gray-600'>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='mb-5 flex items-center gap-3'>
          <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-500'>
            <BsFileEarmarkText />
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>Main Goal</h2>
        </div>
        <p className='max-w-4xl text-sm leading-relaxed text-gray-600'>
          The goal of PrepWise AI is to make interview preparation practical and guided.
          Instead of only reading questions, users can practice timed answers, receive
          feedback, improve communication, understand common behavioural situations,
          and track reports from previous mock interviews.
        </p>
      </section>
    </div>
  )
}

export default About
