import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { AuthProvider } from './auth/AuthContext';

function App() {
  var content = useRoutes(routes);

  return (
    <>
      <AuthProvider>
        {content}
      </AuthProvider>
    </>
  );
}

export default App;
