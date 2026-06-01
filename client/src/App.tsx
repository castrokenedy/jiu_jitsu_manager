import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Metas from "./pages/Metas";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/metas" component={Metas} />
      {/* Mantenha suas rotas antigas de dashboard aqui abaixo se necessário */}
      <Route>404 - Página Não Encontrada</Route>
    </Switch>
  );
}

export default App;