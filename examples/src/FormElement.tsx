import * as z from 'zod'

import { ZodFormElement, ZodForm, ZodFormSubmitButton, ZodFormCancelButton } from 'zod-hook-form'
import type { ComponentProps } from 'zod-hook-form'

const Input = ({ value, onChange, onBlur, error, ...rest }: ComponentProps<string>) => {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      {...rest}
    />
  )
}

// ---------------------------------------------------

const schema = z.object({
  firstName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  phone: z.string().min(9, { message: 'Too short'}).max(20, { message: 'Too long'}),
})

const initialValues = {
  firstName: '',
  phone: '',
}

const FormElement = () => {
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log('values', values)
  }

  const parseFirstName = (value: string) => {
    return value.toLowerCase()
  }

  const formatFirstName = (value: string) => {
    return value.toUpperCase()
  }

  return (
    <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <ZodFormElement component={Input} name='firstName' format={formatFirstName} parse={parseFirstName}/>
      </div>
      <div>
        <label htmlFor='phone'>Phone</label>
        <ZodFormElement component={Input} name='phone'/>
      </div>
      <ZodFormSubmitButton label='Submit'/>
      <ZodFormCancelButton label='Cancel'/>
    </ZodForm>
  )
}

export default FormElement
