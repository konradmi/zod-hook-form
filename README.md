## zod-hook-form

Thin wrapper over react-hook-form and zod. Types are infered based on the provided zod schema. It also provides helpers for dealing with:
- form inputs
- form arrays
- custom form components

### Examples

- A login form:

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

- A custom form input:

```
import { ZodFormElement } from 'zod-hook-form'
import type { ComponentProps, ZodFormElementProps } from 'zod-hook-form'

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

```

Somewhere in the form:

```
...
<ZodFormElement component={Input} name='phone'/>
...

```

- Integration with 3rd party libraries:

```
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
```
Somewhere in the form:

```
...
<ZodFormElement name='age' component={MUISelect}/>
...

```

To run the examples:

```
cd examples
yarn
yarn run dev
```
