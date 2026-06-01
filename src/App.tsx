import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortalPage } from './pages/PortalPage'
import { ProductPreviewPage } from './pages/ProductPreviewPage'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortalPage />} />
          <Route path="/:productId" element={<ProductPreviewPage />} />
          <Route path="/preview/:productId" element={<ProductPreviewPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
