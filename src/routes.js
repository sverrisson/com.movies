import Movies from './pages/Movies'
import NotFound from './pages/NotFound'
import Boot from './pages/Boot'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'

export default {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: Home,
    },
    {
      path: 'movies/:actorID',
      component: Movies,
    },
    {
      path: '*',
      component: NotFound,
    },
    {
      path: '!',
      component: ErrorPage,
    },
    {
      path: '$',
      component: Boot,
    },
  ],
}
