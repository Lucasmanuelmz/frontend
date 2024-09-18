import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/auth/login';
import ErrorPage from '../pages/errors/error';
import DashboardPage from '../pages/admins/dashboard';
import UserProfile from '../components/profile/profile';
import CreateCategoryPage from '../components/setCategories';
import ProtectedRoute from '../containers/protected';
import FormContainer from '../containers/form';
import HomePage from '../pages/home/home';
import SignupPage from '../pages/auth/signup';
import GetArticlesByCategory from '../components/bycategory';
import ReadArticles from '../components/readArticle';
import ReadRelatedArticles from '../components/related';
import CommunityGuidelines from '../pages/comunit/comunitPage';
import About from '../pages/comunit/about';
import PrivacyPolicyAndTerms from '../pages/comunit/privacyPolicy';
import SignupUpdatePage from '../components/editComponents/userPage';
import PostsList from '../pages/admins/posts';
import EditArticle from '../components/editComponents/editArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'home/:slug',
        element: <GetArticlesByCategory />,
      },
      {
        path: 'home/read/article/:slug',
        element: <ReadArticles />,
      },
      {
        path: 'posts/:slug',
        element: <ReadRelatedArticles />,
      },
    ],
  },
  {
    path: '/regras/da/comunidade',
    element: <CommunityGuidelines />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/politicas-de-privacidade-e-termos-de-uso',
    element: <PrivacyPolicyAndTerms />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <FormContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:id',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/:id/create/categories',
        element: (
          <ProtectedRoute>
            <CreateCategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:id/edit/user/:id',
        element: (
          <ProtectedRoute>
            <SignupUpdatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/list',
        element: (
          <ProtectedRoute>
            <PostsList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'edit/:id/post/:slug',
        element: <EditArticle />,
      },
    ],
  },
]);

export default router;
