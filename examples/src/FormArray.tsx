'use client'

import * as z from 'zod'

import { ZodForm, ZodFormInput, ZodFormSubmitButton, ZodFormCancelButton, ZodFormArray } from 'zod-hook-form'
import type { RowProps, ZodFormArrayAppend } from 'zod-hook-form'

const schema = z.object({
  firstName: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  interests: z.array(z.object({
    name: z.string().min(3, { message: 'Too short'}).max(20, { message: 'Too long'}),
  }))
})

const initialValues = {
  firstName: '',
  interests: [],
}

const Row = ({ setName, appendNewRow, removeCurrentRow }: RowProps) => {
  const emptyRow = { name: '' }
  return (
    <div>
      <label htmlFor='name'>Interest</label>
      <ZodFormInput name={setName('name')}/>
      <button type='button' onClick={() => appendNewRow(emptyRow)}>+</button>
      <button type='button' onClick={removeCurrentRow}>-</button>
    </div>
  )
}

const AddRow = ({ append }: { append: ZodFormArrayAppend}) => {
  const handleClick = () => append({ name: '' })

  return (
    <div>
      <button type='button' onClick={handleClick}>Add</button>
    </div>
  )
}

const FormArray = () => {
  const handleSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values)
  }

  return (
      <ZodForm initialValues={initialValues} onSubmit={handleSubmit} schema={schema}>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <ZodFormInput name='firstName'/>
      </div>
      <h3>Interests: </h3>
      <ZodFormArray name='interests' row={Row}>
        {
          (append, _, rows) => {
            return (
              <>
                <AddRow append={append}/>
                <div>Rows:</div>
                {rows}
              </>
            )
          }
        }
      </ZodFormArray>

      <ZodFormSubmitButton label='Submit'/>
      <ZodFormCancelButton label='Cancel'/>
    </ZodForm>
  )
}

export default FormArray
