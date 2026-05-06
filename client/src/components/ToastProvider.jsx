import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const toastIdRef = useRef(0)

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'info') => {
    const id = toastIdRef.current + 1
    toastIdRef.current = id

    setToasts((current) => [
      ...current,
      { id, message, type },
    ])

    setTimeout(() => removeToast(id), 3200)
  }, [removeToast])

  const confirmToast = useCallback((message, options = {}) => {
    const id = toastIdRef.current + 1
    toastIdRef.current = id

    return new Promise((resolve) => {
      const close = (result) => {
        removeToast(id)
        resolve(result)
      }

      setToasts((current) => [
        ...current,
        {
          id,
          message,
          type: 'confirm',
          confirmText: options.confirmText || 'Leave',
          cancelText: options.cancelText || 'Stay',
          onConfirm: () => close(true),
          onCancel: () => close(false),
        },
      ])
    })
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast, confirmToast }}>
      {children}

      <div className='fixed right-4 top-4 z-[10000] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3'>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-2xl border bg-white p-4 shadow-xl ${
              toast.type === 'success'
                ? 'border-emerald-200'
                : toast.type === 'error'
                  ? 'border-red-200'
                  : toast.type === 'confirm'
                    ? 'border-gray-200'
                    : 'border-primary-100'
            }`}
          >
            <p className='text-sm font-medium leading-relaxed text-gray-800'>{toast.message}</p>

            {toast.type === 'confirm' && (
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  onClick={toast.onCancel}
                  className='rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50'
                >
                  {toast.cancelText}
                </button>
                <button
                  onClick={toast.onConfirm}
                  className='rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700'
                >
                  {toast.confirmText}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
