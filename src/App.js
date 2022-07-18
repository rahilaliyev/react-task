import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailsPageHeader from "components/DetailsPageHeader";
import UserDetails from "pages/UserDetails";
import Home from "pages/Home";
import { Container, GlobalStyle } from "GlobalStyles";
import PostDetails from "pages/PostDetails";
import { SnackbarProvider } from "notistack";
import { RecoilRoot } from "recoil";

export const api = "https://jsonplaceholder.typicode.com";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <RecoilRoot>
        <Container>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="user" element={<DetailsPageHeader />}>
                  <Route path=":userID" element={<UserDetails />} />
                  <Route path=":userID/:postID" element={<PostDetails />} />
                </Route>
              </Route>
            </Routes>
          </SnackbarProvider>
        </Container>
      </RecoilRoot>
    </Router>
  );
}

export default App;
