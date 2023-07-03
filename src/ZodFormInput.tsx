import React from 'react'
import { useFormContext } from 'react-hook-form'

type ZodFormInputProps = {
  className?: string
  name: string
  type?: string
}

export const ZodFormInput = ({ name, type, className }: ZodFormInputProps) => {
  const { register, formState: { errors } } = useFormContext()
  
  return (
    <div className={className}>
      <input className={`${className}__input`} {...register(name)} type={type}/>
      { errors[name] && <div className={`${className}--error`}>{ errors[name]?.message as string }</div> }
    </div>
  )
}
