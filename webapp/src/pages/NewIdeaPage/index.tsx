import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '../../components/input'
import { Segment } from '../../components/segment'
import { TextArea } from '../TextArea'

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info('Submitted', values)
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1, 'Name can not be empty').max(20, 'Name is too long!'),
        nick: z
          .string()
          .min(1, 'Nick can not be empty')
          .regex(/^[a-z0-9-]+$/, 'Nick may contains only lowercase latters, numbers and dashers'),
        description: z.string().min(1, 'Description can not be empty'),
        text: z.string().min(10, 'Text mush contain at least 10 characters'),
      })
    ),
  })
  return (
    <Segment title="New idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="name" label="Name" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />

        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid </div>}
        <button type="submit">Submit new idea</button>
      </form>
    </Segment>
  )
}
