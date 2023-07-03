import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import type { SubmitHandler } from 'react-hook-form'
import { useForm, FormProvider } from 'react-hook-form'

type FormProps<T extends z.ZodType> = {
  initialValues: z.infer<T>
  onSubmit: SubmitHandler<z.infer<T>>
  submitValidation?: (values: z.infer<T>) => Promise<void>
  children: React.ReactNode
  className?: string
  schema: T
}

export const ZodForm = <T extends z.ZodType>({ initialValues, onSubmit, children, className, schema, submitValidation = () => Promise.resolve() }: FormProps<T>) => {
  const methods = useForm<z.infer<T>>({
    mode: 'onBlur',
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    methods.reset(initialValues)
  }, [initialValues])

  const onSubmitWithValidation = async (values: z.infer<T>) => {
    let error = false
    try {
      await submitValidation(values)
    }
    catch {
      methods.setError('root.submit', {
        type: 'submit_error',
      })
      error = true
    }
    if(!error) {
      await onSubmit(values)
    }
  }
  
  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmitWithValidation)}>
        { children }
      </form>
    </FormProvider>
  )
}
