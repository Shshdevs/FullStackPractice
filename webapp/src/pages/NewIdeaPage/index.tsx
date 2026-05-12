import { zCreateIdeaTrpcInput } from '@fullstackpractice/backend/src/router/newIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/alert'
import { Button } from '../../components/button'
import { FormItems } from '../../components/formitems'
import { Input } from '../../components/input'
import { Segment } from '../../components/segment'
import { TextArea } from '../../components/textArea'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const createIdea = trpc.newIdea.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: async (values) => {
      setSubmittingError(null)
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
  })
  return (
    <Segment title="New idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="name" label="Name" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <TextArea name="text" label="Text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid </div>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Idea Created</Alert>}

          <Button children={'Create new idea'} loading={formik.isSubmitting} />
        </FormItems>
      </form>
    </Segment>
  )
}
