import React from 'react'
import { useFormContext } from 'react-hook-form'

type ZodFormSubmitButtonProps = {
  className?: string
  label: string
}

export const ZodFormSubmitButton = ({ label, className }: ZodFormSubmitButtonProps) => {
  const { formState: { isDirty, isValid, isSubmitSuccessful, isLoading } } = useFormContext()

  const isDisabled = !isDirty || !isValid || isSubmitSuccessful || isLoading
  
  return (
    <button className={className} type='submit' disabled={isDisabled}>{label}</button>
  )
}

export default ZodFormSubmitButton
