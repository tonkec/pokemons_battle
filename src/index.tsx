import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PokemonSelectionProvider } from './context/PokemonSelectionProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { TournamentProvider } from './context/TournamentProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <TournamentProvider>
        <PokemonSelectionProvider>
          <App />
        </PokemonSelectionProvider>
      </TournamentProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
