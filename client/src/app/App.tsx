import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AppRoute, AuthStatus } from "../const";
import { MainPage } from "../pages/main/main-page";
import { LoginPage } from "../pages/login/login-page";
import { AlbumPage } from "../pages/album/album-page";
import { Player } from "../components/player/player";
import { PrivateRoute } from "../components/private-route/private-route";
import { FavoritesPage } from "../pages/favorites/favorites-page";
import { ArtistPage } from "../pages/artist/artist-page";
import { getTheme } from "../service/user-storage";

function App() {
  useEffect(() => {
    const theme = getTheme();
    if (theme !== null) {
      const body = document.querySelector('body');
      body?.style.setProperty('--gradient', theme);
    };
  });

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
          <Route path={`${AppRoute.Artist}/:artistID`} element={ <ArtistPage /> } />
        </Routes>
        <Player />
      </div>
    </BrowserRouter>
  );
}

export default App;
