"use strict";
exports.__esModule = true;
exports.navMenuBar = void 0;
exports.navMenuBar = [
    {
        routeLink: 'analytic',
        icon: 'bar_chart',
        label: 'Analytics',
        role_flag: ['STORE_ADMIN', 'MULTI_ADMIN', 'SUPER_ADMIN']
    },
    {
        routeLink: 'store/list',
        icon: 'store',
        label: 'Store',
        role_flag: ['SUPER_ADMIN']
    },
    {
        routeLink: 'product/list',
        icon: 'shopping_basket',
        label: 'Product',
        role_flag: ['SUPER_ADMIN', 'STORE_ADMIN']
    },
    {
        routeLink: 'inventory/list',
        icon: 'inventory_2',
        label: 'Inventory',
        role_flag: ['STORE_ADMIN', 'MULTI_ADMIN']
    },
    {
        routeLink: 'customers/list',
        icon: 'diversity_3',
        label: 'Customers',
        role_flag: ['BOCXY_ADMIN']
    },
    {
        routeLink: 'order/list',
        icon: 'book',
        label: 'Orders',
        role_flag: ['STORE_ADMIN', 'MULTI_ADMIN']
    },
    {
        routeLink: 'marketing/list',
        icon: 'campaign',
        label: 'Marketing',
        role_flag: ['BOCXY_ADMIN']
    },
    {
        routeLink: 'coupon/list',
        icon: 'price_change',
        label: 'Coupon',
        role_flag: ['SUPER_ADMIN', 'MULTI_ADMIN', 'STORE_ADMIN']
    },
];
