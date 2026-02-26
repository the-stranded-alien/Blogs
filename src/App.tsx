import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Post from './pages/Post';
import About from './pages/About';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'blog', element: <Blog /> },
        { path: 'blog/:slug', element: <Post /> },
        { path: 'about', element: <About /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    basename: '/',
  }
);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
