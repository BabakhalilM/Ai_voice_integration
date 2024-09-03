
import 'regenerator-runtime/runtime';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { ApicontextProvider } from './components/apicontext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApicontextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ApicontextProvider>
  </StrictMode>,
)
