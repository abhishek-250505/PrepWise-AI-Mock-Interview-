import React from 'react'

function Footer() {
  return (
    <div className='border-t border-gray-200 bg-white px-4 py-8 sm:px-6'>
      <div className='mx-auto grid max-w-6xl gap-6 text-sm text-gray-600 md:grid-cols-[1.4fr_1fr_1fr]'>
        <div>
          <h1 className='mb-3 text-2xl font-bold text-primary-500'>
            PrepWise AI
          </h1>
          <p className='max-w-xl leading-relaxed'>
            AI-powered interview preparation platform for mock interviews,
            aptitude practice, behavioural coaching, and performance reports.
          </p>
        </div>

        <div>
          <h2 className='mb-3 font-semibold text-gray-900'>Practice</h2>
          <div className='space-y-2'>
            <p>Technical interviews</p>
            <p>HR and behavioural rounds</p>
            <p>AI aptitude tests</p>
          </div>
        </div>

        <div>
          <h2 className='mb-3 font-semibold text-gray-900'>Project</h2>
          <div className='space-y-2'>
            <p>Resume based setup</p>
            <p>Voice interview flow</p>
            <p>Detailed score reports</p>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-6 max-w-6xl border-t border-gray-100 pt-4 text-xs text-gray-500'>
        <p>&copy; {new Date().getFullYear()} PrepWise AI. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
