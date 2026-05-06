import React from 'react'
import { FaCheckCircle, FaComments, FaLightbulb, FaRobot, FaStar } from 'react-icons/fa'

const repeatedBehavioralQuestions = [
  {
    question: 'Tell me about yourself.',
    teach: 'Keep it short: present role or studies, strongest skills, one proof point, and why this job fits.',
    answer: 'I am a frontend developer focused on building clean, responsive user experiences. In my recent projects, I worked with React, APIs, and authentication flows. I enjoy turning requirements into simple interfaces, and this role fits because it lets me keep improving product quality while learning from a strong team.',
  },
  {
    question: 'What are your strengths?',
    teach: 'Choose strengths that match the job, then prove them with a real example.',
    answer: 'My biggest strengths are consistency, problem solving, and communication. For example, when I was stuck on an API issue, I broke the problem into smaller checks, tested each part, and explained the fix clearly to my team so the same issue would not repeat.',
  },
  {
    question: 'What is your weakness?',
    teach: 'Pick a real but manageable weakness, then show the action you are taking.',
    answer: 'Earlier, I sometimes spent too much time trying to make a solution perfect. I am improving by setting time limits, asking for feedback earlier, and focusing first on a working solution before polishing details.',
  },
  {
    question: 'Why should we hire you?',
    teach: 'Connect your skills, attitude, and learning ability to the company need.',
    answer: 'You should hire me because I can learn quickly, take ownership, and communicate clearly. I may not know everything on day one, but I am consistent, I ask the right questions, and I focus on delivering reliable work.',
  },
  {
    question: 'Tell me about a time you faced a challenge.',
    teach: 'Use STAR: Situation, Task, Action, Result. Spend most time on your action.',
    answer: 'In one project, a feature was not working close to the deadline. I checked the error logs, isolated the API response issue, and coordinated the frontend changes. We fixed it on time, and I learned to test integrations earlier.',
  },
  {
    question: 'Describe a conflict with a teammate.',
    teach: 'Do not blame. Show listening, calm communication, and a shared solution.',
    answer: 'A teammate and I disagreed about the best UI approach. I listened to their reason, shared my concern about user flow, and suggested comparing both options. We chose the simpler design and finished faster without affecting quality.',
  },
  {
    question: 'Tell me about a mistake you made.',
    teach: 'Own the mistake, explain the fix, and end with what changed in your process.',
    answer: 'I once missed a validation case while testing a form. After it was found, I fixed it quickly and added a checklist for common edge cases. Since then, I test normal, empty, and invalid inputs before submitting work.',
  },
  {
    question: 'How do you handle pressure or deadlines?',
    teach: 'Show prioritization, communication, and steady execution.',
    answer: 'Under pressure, I list the most important tasks, estimate what can be finished, and communicate early if something is risky. This helps me stay calm and focus on progress instead of panic.',
  },
  {
    question: 'Where do you see yourself in five years?',
    teach: 'Keep it ambitious but connected to growth in the same career path.',
    answer: 'In five years, I see myself as a strong engineer who can handle larger features independently, mentor juniors, and contribute to product decisions. I want to grow through real project experience and continuous learning.',
  },
  {
    question: 'Why do you want to join this company?',
    teach: 'Mention role fit, learning opportunity, and contribution. Avoid only salary or brand name.',
    answer: 'I want to join because the role matches my skills and gives me room to grow. I am interested in contributing to useful products, learning from experienced people, and becoming someone the team can depend on.',
  },
]

const aiFrequentScenarios = [
  {
    question: 'What would you do if your colleague took credit for your work?',
    teach: 'Stay professional. First verify the situation, then speak privately, keep proof ready, and focus on correcting the record without creating drama.',
    answer: 'If a colleague took credit for my work, I would first stay calm and confirm whether it was intentional. I would speak to them privately, explain my concern, and share the facts clearly. If the issue continued, I would involve my manager professionally with evidence, focusing on fairness and team trust.',
  },
  {
    question: 'What would you do if your manager gave you unrealistic deadlines?',
    teach: 'Do not simply say no. Clarify priorities, explain tradeoffs, and offer a realistic plan.',
    answer: 'I would first understand the deadline and the reason behind it. Then I would break down the work, identify risks, and discuss priorities with my manager. If needed, I would suggest reducing scope or getting support so we can still deliver the most important work well.',
  },
  {
    question: 'What would you do if a teammate was not doing their part?',
    teach: 'Show ownership, communication, and problem solving before escalation.',
    answer: 'I would first talk to the teammate privately and understand if they are blocked. If I can help, I would support them and agree on clear next steps. If the problem still affects delivery, I would update the team lead with facts and focus on completing the work.',
  },
]

function BehaviouralQuestions() {
  return (
    <main className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 sm:px-6 lg:px-8'>
      <section className='mx-auto max-w-6xl'>
        <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <div className='mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-700'>
              <FaComments />
              Behavioural Interview Practice
            </div>
            <h1 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
              10 repeated behavioural questions
            </h1>
            <p className='mt-3 max-w-2xl text-gray-600'>
              Learn a simple structure and sample answer for common interview questions. No resume upload needed.
            </p>
          </div>

          <div className='rounded-xl border border-emerald-100 bg-white px-5 py-4 shadow-sm'>
            <div className='flex items-center gap-2 text-sm font-semibold text-gray-800'>
              <FaStar className='text-emerald-600' />
              Answer formula
            </div>
            <p className='mt-1 text-sm text-gray-600'>Situation + Action + Result + Learning</p>
          </div>
        </div>

        <div className='grid gap-5 lg:grid-cols-2'>
          {repeatedBehavioralQuestions.map((item, index) => (
            <article key={item.question} className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
              <div className='mb-4 flex items-start gap-3'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white'>
                  {index + 1}
                </span>
                <h2 className='text-lg font-bold leading-snug text-gray-900'>{item.question}</h2>
              </div>

              <div className='mb-4 rounded-xl bg-emerald-50 p-4'>
                <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700'>
                  <FaLightbulb />
                  How to answer
                </div>
                <p className='text-sm leading-relaxed text-gray-700'>{item.teach}</p>
              </div>

              <div className='rounded-xl border border-gray-100 p-4'>
                <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800'>
                  <FaCheckCircle className='text-emerald-600' />
                  Sample answer
                </div>
                <p className='text-sm leading-relaxed text-gray-600'>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>

        <section className='mt-10'>
          <div className='mb-5 flex items-center gap-3'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white'>
              <FaRobot />
            </span>
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>AI frequently asked scenarios</h2>
              <p className='text-sm text-gray-600'>Tough behavioural questions interviewers often ask to test maturity.</p>
            </div>
          </div>

          <div className='grid gap-5 lg:grid-cols-3'>
            {aiFrequentScenarios.map((item) => (
              <article key={item.question} className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
                <h3 className='mb-4 text-lg font-bold leading-snug text-gray-900'>{item.question}</h3>

                <div className='mb-4 rounded-xl bg-gray-50 p-4'>
                  <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800'>
                    <FaLightbulb className='text-emerald-600' />
                    Smart approach
                  </div>
                  <p className='text-sm leading-relaxed text-gray-700'>{item.teach}</p>
                </div>

                <div className='rounded-xl border border-emerald-100 bg-emerald-50 p-4'>
                  <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700'>
                    <FaCheckCircle />
                    Best answer
                  </div>
                  <p className='text-sm leading-relaxed text-gray-700'>{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default BehaviouralQuestions
