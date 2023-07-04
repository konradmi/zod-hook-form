import React from 'react'
import { useFormContext } from 'react-hook-form'

type ZodFormInputProps = {
  className?: string
  name: string
  type?: string
}

export const ZodFormInput = ({ name, type, className }: ZodFormInputProps) => {
  const { register, formState: { errors } } = useFormContext()

  const getError = () => {
    return name.split('.').reduce((acc, curr) => {
      return acc?.[curr]
    }, (errors || {}) as any)
  }
  
  return (
    <div className={className}>
      <input className={`${className}__input`} {...register(name)} type={type}/>
      { getError() && <div className={`${className}--error`}>{ getError().message as string }</div> }
    </div>
  )
}
