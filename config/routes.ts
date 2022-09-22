export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            path: '/user/login',
            name: 'login',
            locale: 'Login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/device',
    name: 'device',
    locale: 'Device',
    icon: 'icon-device',
    routes: [
      {
        path: 'rsu',
        name: 'rsu',
        locale: 'RSU Device',
        routes: [
          {
            path: '/device/rsu',
            component: './deviceManagement/RSUManagement/DeviceList',
          },
          {
            path: 'details/:id',
            name: 'details',
            locale: 'Device Details',
            component: './deviceManagement/RSUManagement/DeviceDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'model',
        name: 'model',
        locale: 'RSU Model',
        component: './deviceManagement/RSUModelManagement',
      },
      {
        path: 'camera',
        name: 'camera',
        locale: 'Camera Device',
        component: './deviceManagement/CameraManagement',
      },
      {
        path: 'radar',
        name: 'radar',
        locale: 'Radar Device',
        component: './deviceManagement/RadarManagement',
      },
      {
        path: 'lidar',
        name: 'lidar',
        locale: 'Lidar Device',
        component: './deviceManagement/LidarManagement',
      },
      {
        path: 'spat',
        name: 'spat',
        locale: 'SPAT Device',
        component: './deviceManagement/SPATManagement',
      },
      {
        path: '/device',
        redirect: '/device/rsu',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    locale: 'Maintenance',
    icon: 'icon-maintain',
    routes: [
      {
        path: 'map',
        name: 'map',
        locale: 'MAP Config',
        routes: [
          {
            path: '/maintenance/map',
            component: './maintenanceManagement/mapConfig/ConfigList',
          },
          {
            path: 'details/:id',
            name: 'details',
            locale: 'MAP Details',
            component: './maintenanceManagement/mapConfig/ConfigDetails',
            hideInMenu: true,
          },
          {
            path: 'preview/:id',
            name: 'preview',
            locale: 'MAP Preview',
            component: './maintenanceManagement/mapConfig/ConfigPreview',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'business',
        name: 'business',
        locale: 'RSU Business Config',
        routes: [
          {
            path: '/maintenance/business',
            component: './maintenanceManagement/businessConfig/ConfigList',
          },
          {
            path: 'details/:id',
            name: 'details',
            locale: 'Business Details',
            component: './maintenanceManagement/businessConfig/ConfigDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'maintenance',
        name: 'maintenance',
        locale: 'RSU Maintenance Config',
        component: './maintenanceManagement/RSUMaintenance',
      },
      {
        path: 'log',
        name: 'log',
        locale: 'RSU Log Config',
        component: './maintenanceManagement/LogConfig',
      },
      {
        path: 'query',
        name: 'query',
        locale: 'RSU Information Query',
        routes: [
          {
            path: '/maintenance/query',
            component: './maintenanceManagement/RSUInfoQuery/InfoQueryList',
          },
          {
            path: 'details/:id',
            name: 'details',
            locale: 'Query Details',
            component: './maintenanceManagement/RSUInfoQuery/InfoQueryDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/maintenance',
        redirect: '/maintenance/map',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/event',
    name: 'event',
    locale: 'Event',
    icon: 'icon-event',
    routes: [
      {
        path: 'rsi',
        name: 'rsi',
        locale: 'Road Side Information',
        routes: [
          {
            path: '/event/rsi',
            component: './eventManagement/roadSideInformation/RSIList',
          },
          {
            path: 'details/:id',
            name: 'details',
            locale: 'RSI Details',
            component: './eventManagement/roadSideInformation/RSIDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'rsm',
        name: 'rsm',
        locale: 'Roadside Safety Message',
        routes: [
          {
            path: '/event/rsm',
            component: './eventManagement/roadsideSafetyMessage/RSMList',
          },
          {
            path: 'details',
            name: 'details',
            locale: 'RSM Details',
            component: './eventManagement/roadsideSafetyMessage/RSMDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'icw',
        name: 'icw',
        locale: 'Intersection Collision Warning',
        routes: [
          {
            path: '/event/icw',
            component: './eventManagement/intersectionCollisionWarning/ICWList',
          },
          {
            path: 'details',
            name: 'details',
            locale: 'ICW Details',
            component: './eventManagement/intersectionCollisionWarning/ICWDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'vrucw',
        name: 'vrucw',
        locale: 'Vulnerable Road User Collision Warning',
        routes: [
          {
            path: '/event/vrucw',
            component: './eventManagement/vulnerableRoadUser/VRUCWList',
          },
          {
            path: 'details',
            name: 'details',
            locale: 'VRUCW Details',
            component: './eventManagement/vulnerableRoadUser/VRUCWDetails',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'dnpw',
        name: 'dnpw',
        locale: 'Do Not Pass Warning',
        component: './eventManagement/DoNotPassWarning',
      },
      {
        path: 'sds',
        name: 'sds',
        locale: 'Sensor Data Sharing',
        component: './eventManagement/SensorDataSharing',
      },
      {
        path: 'clc',
        name: 'clc',
        locale: 'Cooperative Lane Change',
        component: './eventManagement/CooperativeLaneChange',
      },
      {
        path: '/event',
        redirect: '/event/rsi',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    locale: 'System',
    icon: 'icon-system',
    routes: [
      {
        path: 'site',
        name: 'site',
        locale: 'Edge Site Config',
        component: './systemConfiguration/EdgeSiteConfig',
      },
      {
        path: '/system',
        redirect: '/system/site',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/device/rsu',
  },
  {
    component: './404',
  },
];
