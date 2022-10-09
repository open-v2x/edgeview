// 菜单项
export const MenuTitle = [
  t('Login'),
  t('Device'),
  t('RSU Device'),
  t('Device Details'),
  t('RSU Model'),
  t('Camera Device'),
  t('Radar Device'),
  t('Lidar Device'),
  t('SPAT Device'),
  t('Maintenance'),
  t('MAP Config'),
  t('MAP Details'),
  t('MAP Preview'),
  t('RSU Business Config'),
  t('Business Details'),
  t('RSU Maintenance Config'),
  t('RSU Log Config'),
  t('RSU Information Query'),
  t('Query Details'),
  t('Event'),
  t('Road Side Information'),
  t('RSI Details'),
  t('Roadside Safety Message'),
  t('RSM Details'),
  t('Intersection Collision Warning'),
  t('ICW Details'),
  t('Do Not Pass Warning'),
  t('Sensor Data Sharing'),
  t('Vulnerable Road User Collision Warning'),
  t('VRUCW Details'),
  t('Cooperative Lane Change'),
  t('System'),
  t('Edge Site Config'),
];

// 设备在线状态
export const DeviceOnlineStatusOptions = {
  true: t('Online'),
  false: t('Offline'),
};

// 设备状态
export const DeviceStatusOptions = {
  true: t('Enabled'),
  false: t('Disabled'),
};

export const RSUStatusOptions = {
  Normal: t('Normal'),
  Abnormal: t('Abnormal'),
};

// 下发状态
export const SendStatusOptions = [t('Sending'), t('Success'), t('Fail')];

// RSU 运维日志级别
export const LogLevelOptions = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'NOLog'];

// RSU 运维是否重启
export const RebootOptions = {
  not_reboot: t("Don't reboot"),
  reboot: t('Reboot'),
};

// 日志下发服务器类型
export const LogServerTypeOptions = ['http', 'https', 'ftp', 'sftp', 'other'];

// RSI 事件分类
export const EventClassOptions = {
  AbnormalTraffic: t('Abnormal traffic'),
  AdverseWeather: t('Adverse weather'),
  AbnormalVehicle: t('Abnormal vehicle'),
  TrafficSign: t('Traffic sign'),
};

// RSI 事件类型
export const EventTypeOptions = {
  301: t('Rain'),
  308: t('Snow'),
  305: t('Fog'),
  311: t('Haze'),
  302: t('Hail'),
  304: t('Wind'),
  399: t('Sand storm'),
  707: t('Traffic jam'),
  401: t('Throwing object'),
  405: t('Pedestrian recognition'),
  406: t('Animal'),
  408: t('Slippery road'),
  409: t('Icy road'),
  202: t('Fire'),
  205: t('Facility damaged'),
  901: t('Vehicle over speed'),
  902: t('Vehicle slow'),
  903: t('Vehicles top'),
  904: t('Vehicle converse'),
  905: t('Emergency vehicle'),
  906: t('Truck'),
};

// RSI 事件信息来源类型
export const EventSourceOptions = {
  unknown: t('Unknown'),
  police: t('Traffic police'),
  government: t('Government'),
  meteorological: t('Meteorological department'),
  internets: t('Internet services'),
  detection: t('Local detection'),
};

// RSM 参与者类型
export const ParticipantTypeOptions = {
  unknown: t('Unknown type'),
  motor: t('Motor vehicle'),
  non_motor: t('Non-motor vehicle'),
  pedestrian: t('Pedestrian'),
  rsu: t('RSU device'),
};

// RSM 数据来源类型
export const DataSourceOptions = [
  t('Unknown'),
  t('RSU'),
  t('V2X'),
  t('Video'),
  t('Microwave radar'),
  t('Loop'),
  t('Lidar'),
  t('Integrated'),
];

// RSU 查询信息类型
export const QueryTypeOptions = [
  t('RSU operating status information'),
  t('V2X data statistics'),
  t('Device information connected to RSU'),
];

// RSU 查询信息时间区间
export const QueryIntervalOptions = [
  t('Within an hour'),
  t('Within a day'),
  t('Within a week'),
  t('System boot up to now'),
];

// RSU 查询信息电源状态
export const PowerStatusOptions = {
  1: t('Normal'),
  2: t('Over voltage'),
  3: t('Under voltage'),
};

// RSU 查询信息运行状态
export const RunStatusOptions = {
  1: t('Normal'),
  2: t('Offline'),
  3: t('Restarting'),
};

// RSU 查询信息连接状态
export const NetworkStatusOptions = {
  1: t('Disconnect'),
  2: t('Connect'),
  3: t('Data transmission is normal'),
  4: t('Data transfer exception'),
};

// IP 正则
export const IPReg =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))?$/;
// 经度 正则
export const LngReg =
  /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180?|180\.0{1,10})$/;
// 纬度 正则
export const LatReg =
  /^[\-\+]?(0(\.\d{1,10})?|(9(\.\d{1,10})?)|([1-8](\d)?)(\.\d{1,10})?|90?|90\.0{1,10})$/;

// 驾驶行为类型
export const DriveBehaviorTypeOptions = [
  t('Go straight'),
  t('Change lane to the left'),
  t('Change lane to the right'),
  t('Drive in'),
  t('Drive out'),
  t('Go straight through the intersection'),
  t('Turn left through the intersection'),
  t('Turn right through the intersection'),
  t('U-turn through the intersection'),
  t('Stop and go'),
  t('Stop'),
  t('Slow down'),
  t('Speed up'),
  t('Parking'),
];

// 协调信息类型
export const CoordinationInfoTypeOptions = [
  t('Cooperative lane changing'),
  t('Cooperative vehicle merging'),
  t('Lane changing at intersection'),
  t('No-signal intersection passing'),
  t('Dynamic lane management'),
  t('Lane reservation'),
  t('Lane restriction'),
  t('Signal priority'),
];

// RSU 业务配置采样方式
export const SampleModeOptions = {
  ByAll: t('Global sampling'),
  ByID: t('Sampling by ID'),
};

// ICW 碰撞类型
export const ICWCollisionTypeOptions = [
  t('Rear end collision warning'),
  t('Forward collision warning'),
  t('Side collision warning'),
];

// SDS 设备类型
export const DSDEquipmentTypeOptions = [t('Unknown type'), t('RSU'), t('OBU'), t('VRU')];

// 边缘站点配置模式类型
export const SiteModeTypeOptions = {
  edge: t('Edge mode'),
  center: t('Center mode'),
  coexist: t('Coexist mode'),
};

export const LightStateOptions = [
  t('Disabled'),
  t('Black'),
  t('Red flashing'),
  t('Red'),
  t('Green flashing'),
  t('Allowable phase of traffic'),
  t('Traffic protection phase'),
  t('Yellow'),
  t('Yellow flashing'),
];
