import React from 'react'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

type ZodFormInputProps = {
  className?: string
  name: string
  type?: string
}

function ZodFormInput ({ name, type, className }: ZodFormInputProps) {
  const { register, formState: { errors } } = useFormContext()

  const classes = classNames(className, {
    [`${className}--error`]: !!errors[name]
  })
  
  return (
    <div className={classes}>
      <input {...register(name)} type={type}/>
      { errors[name] && <div className={`${className}--error`}>{ errors[name]?.message as string }</div> }
    </div>
  )
}

export default ZodFormInput
