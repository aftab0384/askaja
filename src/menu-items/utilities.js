import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Man3Icon from '@mui/icons-material/Man3';
import PaymentIcon from '@mui/icons-material/Payment';
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconKey } from '@tabler/icons';
import {
  IconBus,
  IconArrowRightRhombus,
  IconRoute,
  IconSteeringWheel,
  IconEdit,
  Icon360,
  IconPlus,
  IconBusStop,
  IconSearch,
  IconUser,
  IconHandStop,
  IconUserCog,
  IconDirections,
  IconCalendarPlus,
  IconUserScan,
  IconShoppingCart,
  IconPackage
} from '@tabler/icons-react';

import { store } from '../store/index';
// import { UpdateRounded } from '@mui/icons-material';

const icons = {
  DirectionsCarIcon,
  IconWindmill,
  PersonAddIcon,
  LocalAtmIcon,
  IconKey,
  AttachMoneyIcon,
  PostAddIcon,
  Man3Icon,
  PaymentIcon,
  IconBus,
  IconRoute,
  IconSteeringWheel,
  IconEdit,
  IconPlus,
  IconBusStop,
  IconSearch,
  IconTypography,
  IconPalette,
  IconShadow,
  Icon360,
  IconArrowRightRhombus,
  IconUser,
  IconHandStop,
  IconUserCog,
  IconDirections,
  IconCalendarPlus,
  IconUserScan,
  IconShoppingCart,
  IconPackage
};

var role = '';
var arrAdmin = [];
var arrOperation = [];
var makerChecker = [];
let bool=true;
store.subscribe(() => {
  if (bool) { //updatedRole != nul/
    // role = updatedRole;
    arrAdmin = [
        {
          id: 'product',
          title: 'Product',
          type: 'collapse',
          icon: icons.IconShoppingCart,
          children: [
            {
              id: 'all_product',
              title: 'Product Master',
              type: 'item',
              url: '/productMaster',
              icon: icons.IconPackage,
              breadcrumbs: false,
              target: false
            }
          ]
        },

        //category
        {
          id: 'category',
          title: 'Category',
          type: 'collapse',
          icon: icons.IconShoppingCart,
          children: [
            {
              id: 'all_category',
              title: 'Category Master',
              type: 'item',
              url: '/categoryMaster',
              icon: icons.IconPackage,
              breadcrumbs: false,
              target: false
            }
          ]
        },
      // vendor
      {
        id: 'vendor',
        title: 'Vendor',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'add vendor',
            title: 'Add Vendor',
            type: 'item',
            url: '/add_vendor',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all_vendor',
            title: 'All Vendor',
            type: 'item',
            url: '/all_vendor',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          },

          {
            id: 'search_vendor',
            title: 'Search By Bus No.',
            type: 'item',
            url: '/search_vendor_by_busNo',
            icon: icons.IconSearch,
            breadcrumbs: false,
            target: false
          }
        ]
      },
      // user
      {
        id: 'users',
        title: 'User',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'all_user',
            title: 'All User',
            type: 'item',
            url: '/all_user',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'search_user',
            title: 'Search User By No.',
            type: 'item',
            url: '/search_user',
            icon: icons.IconSearch,
            breadcrumbs: false
          }
        ]
      },

      // user management
      {
        id: 'usermanagement',
        title: 'User Management',
        type: 'collapse',
        icon: icons.IconUserCog,
        children: [
          {
            id: 'user_management',
            title: 'User Management',
            type: 'item',
            url: '/user_management',
            icon: icons.IconUserCog,
            breadcrumbs: false,
            target: false
          }
        ]
      },
      // register user dashboard
      {
        id: 'assignrole',
        title: 'Access Dashboard',
        type: 'collapse',
        icon: icons.IconUserScan,
        children: [
          {
            id: 'assign_role',
            title: 'Provide Access',
            type: 'item',
            url: '/assign_role',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          }
        ]
      },
    
    ];
    makerChecker = [
      // user
      {
        id: 'users',
        title: 'User',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'search user',
            title: 'Search User',
            type: 'item',
            url: '/search_user',
            icon: icons.IconSearch,
            breadcrumbs: false
          },
          {
            id: 'all user',
            title: 'All User',
            type: 'item',
            url: '/all_user',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          }
        ]
      }
    ];
    // arrMarketing = [
    //   // marketing
    //   {
    //     id: 'marketing',
    //     title: 'Marketing',
    //     type: 'collapse',
    //     icon: icons.IconUserScan,
    //     children: [
    //       {
    //         id: 'add_blog',
    //         title: 'Add Blog',
    //         type: 'item',
    //         url: '/add_blog',
    //         icon: icons.IconUser,
    //         breadcrumbs: false,
    //         target: false
    //       }
    //     ]
    //   }
    // ];

  }
  createUtilitiesObject();
});
const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: []
};

function createUtilitiesObject() {
  // utilities.children = role
  //   ? role === 'ADMIN'
  //     ? arrAdmin
  //     : role === 'MARKETING'
  //     ? arrMarketing
  //     : role === 'OPERATION'
  //     ? arrOperation
  //     : role === 'BILLING'
  //     ? arrBilling
  //     : []
  //   : [];
  utilities.children =  arrAdmin ;
}

export default utilities;
