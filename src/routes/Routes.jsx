import { lazy } from 'react';
import Layout from 'layouts/index';
import Loadable from 'components/Loadable';

const Dashboard = Loadable(lazy(() => import('views/dashboard/Dashboard')));
const List = Loadable(lazy(() => import('views/product/List')));
const ProductDetail = Loadable(lazy(() => import('views/product/ProductDetail')));

const Routes = {
  path: '/',
  element: <Layout />,
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