import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import NumbersContainer from "../numbers/NumbersContainer";
import * as S from "./styles";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={{}}>
      <QueryClientProvider client={queryClient}>
        <S.AppContainer>
          <header className="app-header">
            <h1>Number Selections</h1>
          </header>
          <NumbersContainer />
        </S.AppContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
