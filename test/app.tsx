import { createRoot } from 'react-dom/client';

import { Provider } from "./create-state-manager";
import StateUse from "./use-state-context";

const App = () => {
  return (
    <Provider>
      <StateUse />
    </Provider>
  );
}

const root = createRoot(document.getElementById('container'));
root.render(<App />);
