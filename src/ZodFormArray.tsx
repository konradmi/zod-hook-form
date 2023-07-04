import React from 'react'

import { 
  useFormContext,
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove, 
  FieldValues,
} from 'react-hook-form'

export type RowProps = {
  setName: (rowName: string) => string
  appendNewRow: (row: object) => void
  removeCurrentRow: () => void
}

export type ZodFormArrayAppend = UseFieldArrayAppend<FieldValues>
export type ZodFormArrayRemove = UseFieldArrayRemove

type ZodFormArrayProps = {
  name: string
  row: (props: RowProps) => JSX.Element
  children: (append: ZodFormArrayAppend, remove: ZodFormArrayRemove, rows: JSX.Element[]) => JSX.Element
}

export const ZodFormArray = ({ name, row: Row, children  }: ZodFormArrayProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name
  })

  const removeRow = (index: number) => () => remove(index)

  const appendNewRow = (row: object) => append(row)

  const setName = (index: number) => (rowName: string) => `${name}.${index}.${rowName}`

  const rows = fields.map((field, index) => <Row key={field.id} setName={setName(index)} removeCurrentRow={removeRow(index)} appendNewRow={appendNewRow}/>)

  return (
    <>
      { children(append, remove, rows) }
    </>
  )
}
