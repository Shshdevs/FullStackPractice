import { TrpcProvider } from './lib/TrpcProvider'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
      <ViewIdeaPage />
    </TrpcProvider>
  )
}
