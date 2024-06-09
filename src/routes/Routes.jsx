import { lazy } from 'react';
import Loadable from 'components/Loadable';
import ProtectedRoutes from './ProtectedRoutes';

const Dashboard = Loadable(lazy(() => import('views/dashboard/Dashboard')));
const List = Loadable(lazy(() => import('views/product/List')));
const ProductDetail = Loadable(lazy(() => import('views/product/ProductDetail')));

const Routes = {
  path: '/',
  element: <ProtectedRoutes />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/list',
      element: <List />
    },
    {
      path: '/detail',
      // path: '/detail/:id:',
      element: <ProductDetail />
    }
  ]
};

export default Routes;