import Routes from './routes';

import './assets/styles/global.css';
import { TypesProvider } from './contexts/TypesContext';
import { FinancesProvider } from './contexts/FinancesContext';
import { UsersProvider } from './contexts/UsersContext';

function App() {
  return (
    <UsersProvider>
      <TypesProvider>
        <FinancesProvider>
          <Routes />
        </FinancesProvider>
      </TypesProvider>
    </UsersProvider>
  );
}

export default App;
