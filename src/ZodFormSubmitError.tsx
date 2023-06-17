import React from 'react'

import { useFormContext } from 'react-hook-form'

type ZodFormSubmitErrorProps = {
  className?: string
  error: string
}

export const ZodFormSubmitError = ({ error, className }: ZodFormSubmitErrorProps) => {
  const { formState: { errors } } = useFormContext()
  
  return (
    <div>
      { errors?.root?.submit.type === 'submit_error' && <div className={className}>{error}</div> }
    </div>
  )
}
