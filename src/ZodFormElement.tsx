import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

export type ComponentProps<TValue> = {
  value: TValue
  onChange: (value: TValue) => void
  onBlur: () => void
  error? : boolean
}

type InternalZodFormElementProps<TValue extends any> = {
  component: (props: ComponentProps<TValue>) => JSX.Element
  name: string
  label?: string
  parse?: (value: TValue) => TValue
  format?: (value: TValue) => TValue
}

export const ZodFormElement = <TValue extends any>({ name, label, parse = value => value, format = value => value, component: Component, ...rest }: InternalZodFormElementProps<TValue>) => {
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
