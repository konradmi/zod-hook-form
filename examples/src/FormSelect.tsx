import * as z from 'zod'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { ZodFormElement, ZodForm, ZodFormInput, ZodFormSubmitButton, ZodFormCancelButton } from 'zod-hook-form'
import type { ComponentProps } from 'zod-hook-form'

const MUISelect = ({ value, onChange, onBlur, error, ...rest }: ComponentProps<number>) => {
  return (
    <FormControl>
      <InputLabel>Age</InputLabel>
      <Select
        value={value}
        label="Age"
        onChange={e => onChange(+e.target.value)}
        {...rest}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={18}>Eighteen</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}

// ---------------------------------------------------

const schema = z.object({
  username: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  age: z.number()
})

const initialValues = {
  username: '',
  age: 10,
}

const FormSelect = () => {
  const submitValidation = async (values: z.infer<typeof schema>) => {
    return Promise.resolve()
  }

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log('values', values)
  }

  return (
    <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema} submitValidation={submitValidation}>
      <div>
        <label htmlFor='username'>Username</label>
        <ZodFormInput name='username'/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <ZodFormElement name='age' component={MUISelect}/>
      </div>
      <ZodFormSubmitButton label='Submit'/>
      <ZodFormCancelButton label='Cancel'/>
    </ZodForm>
  )
}

export default FormSelect
