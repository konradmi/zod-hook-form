import React from 'react'
import { useFormContext } from 'react-hook-form'

type ZodFormCancelButtonProps = {
  label: string
  className?: string
}

export const ZodFormCancelButton = ({ label, className }: ZodFormCancelButtonProps) => {
  const { reset } = useFormContext()
  
  const onClick = () => {
    reset()
  }

  return (
    <button className={className} type='button' onClick={onClick}>{label}</button>
  )
}
