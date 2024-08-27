import { lazy } from 'react';
// import { ProtectedRoutes } from '../protectRoute/ProtectedRoutes';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));
import { AllUser } from 'views/User/allUser/AllUser';
import { SearchUser } from 'views/User/searchUser/SearchUser';

import { AllVendor } from 'views/AdminPanel/Vendor/allVendor/AllVendor';
import { AddVendor } from 'views/AdminPanel/Vendor/addVendor/AddVendor';
import { SearchVendorByBusNo } from 'views/AdminPanel/Vendor/searchVendorByBusNo/SearchVendorByBusNo';

import { MakerChecker } from 'views/MakerChecker/MakerChecker';

import { UserManagement } from 'views/AdminPanel/userManagement/UserManagement';

// Authorization
import { Authorization } from 'views/AdminPanel/Authorization/Authorization';
// marketing
// import { AddBlog } from 'views/Marketing/AddBlog';
import { element } from 'prop-types';
import { CategoryMaster } from 'views/AdminPanel/Catogory/categoryMaster';
import { Category } from '@mui/icons-material';
import { ProductMaster } from 'views/AdminPanel/Product/productMaster';
import { DriverOtp } from 'views/AdminPanel/Vendor/driverOtp/driverOtp';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes =[ {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
 
    {
      path: 'search_user',
      element: <SearchUser />
    },
    {
      path: 'all_user',
      element: <AllUser />
    },
    {
      path: 'all_vendor',
      element: <AllVendor />
    },
    {
      path: 'add_vendor',
      element: <AddVendor />
    },
    {
      path: 'search_vendor_by_busNo',
      element: <SearchVendorByBusNo />
    },

    {
      path: 'makerChecker',
      element: <MakerChecker />
    },
    {
      path: 'user_management',
      element: <UserManagement />
    },
    {
      path: 'assign_role',
      element: <Authorization />
    },

    {
      path:'productMaster',
      element:<ProductMaster />
    },
    {
      path:'categoryMaster',
      element:<CategoryMaster/>
    },
    {
      path:'driverOtp',
      element:<DriverOtp/>
    }

  ]
}
];

export default MainRoutes;
