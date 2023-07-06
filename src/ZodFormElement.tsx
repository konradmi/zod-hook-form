import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

export type ComponentProps = {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error? : boolean
}

export type ZodFormElementProps = Omit<InternalZodFormElementProps, 'component'>

type InternalZodFormElementProps = {
  component: (props: ComponentProps) => JSX.Element
  name: string
  label?: string
  parse?: (value: string) => string
  format?: (value: string) => string
}

export const ZodFormElement = ({ name, label, parse = value => value, format = value => value, component: Component, ...rest }: InternalZodFormElementProps) => {
  const { control, formState: { errors } } = useFormContext()

  const getError = () => {
    return name.split('.').reduce((acc, curr) => {
      return acc?.[curr]
    }, (errors || {}) as any)
  }

  return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Component
            {...rest}
            error={!!getError()}
            value={format(field.value)}
            onChange={value => field.onChange(parse(value))}
            onBlur={field.onBlur}
          />
        )}
      />
  )
}
