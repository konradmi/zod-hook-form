## zod-hook-form

Thin wrapper over react-hook-form and zod. Types are infered based on the provided zod schema. It also provides helpers for dealing with:
- form inputs
- form arrays


### Examples

A login form:

```
import * as z from 'zod'

import { ZodForm, ZodFormInput, ZodFormSubmitButton, ZodFormCancelButton, ZodFormSubmitError } from 'zod-hook-form'

import './LoginForm.css'

const schema = z.object({
  username: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  password: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
})

const initialValues = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log('values', values)
  }

  return (
    <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema}>
      <div>
        <label htmlFor='username'>Username</label>
        <ZodFormInput className='zod-input' name='username'/>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <ZodFormInput className='zod-input' name='password' type='password'/>
      </div>
      <ZodFormSubmitButton className='submit-button' label='Login'/>
      <ZodFormCancelButton className='cancel-button' label='Cancel'/>
    </ZodForm>
  )
}
```

To run the examples:

```
cd examples
yarn
yarn run dev
```
