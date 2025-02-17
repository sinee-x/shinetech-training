import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { AuthProvider } from './auth/AuthContext';
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  const content = useRoutes(routes);

  return (
    <>
      <AuthProvider>
        <ConfirmProvider>
          {content}
        </ConfirmProvider>
      </AuthProvider>
    </>
  );
}

export default App;
