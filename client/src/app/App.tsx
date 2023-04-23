import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppRoute, AuthStatus } from "../const";
import { MainPage } from "../pages/main/main-page";
import { LoginPage } from "../pages/login/login-page";
import { useAppDispatch } from "../hooks/hooks";
import { getAuthStatus } from "../redux/user/api-actions";
import { AlbumPage } from "../pages/album/album-page";
import { Player } from "../components/player/player";
import { PrivateRoute } from "../components/private-route/private-route";
import { FavoritesPage } from "../pages/favorites/favorites-page";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuthStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={AppRoute.Main} element={ <MainPage /> } />
          <Route path={`${AppRoute.Album}/:albumID`} element={ <AlbumPage /> } />
          <Route path={AppRoute.Login} element={ 
            <PrivateRoute requiredAuthStatus={AuthStatus.Unauthorized}>
              <LoginPage />
            </PrivateRoute>
          } />
          <Route path={AppRoute.Register} element={ 
            <PrivateRoute requiredAuthStatus={AuthStatus.Unauthorized}>
              <LoginPage />
            </PrivateRoute>
          } />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute requiredAuthStatus={AuthStatus.Authorized}>
              <FavoritesPage />
            </PrivateRoute>
          } />
        </Routes>
        <Player />
      </div>
    </BrowserRouter>
  );
}

export default App;
