import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import './index.css';
import { UserProvider } from './containers/protect';
import { CategoryProvider } from './containers/categoryContext';
import { ArticleProvider } from './containers/articleContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>
      <ArticleProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ArticleProvider>
    </CategoryProvider>
  </StrictMode>
);
