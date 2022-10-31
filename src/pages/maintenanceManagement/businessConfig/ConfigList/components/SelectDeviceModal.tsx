import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deviceList } from 'edge-src/services/device/device';
import ParameterDeviceList from 'edge-src/components/ParameterDeviceList';

type SelectDeviceProps = {
  defaultSelectedIds: number[];
  selected: (data: Device.DeviceListItem[]) => void;
};

const SelectDeviceModal: React.FC<SelectDeviceProps> = ({ defaultSelectedIds, selected }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<Device.DeviceListItem[]>([]);
  const confirm = () => {
    if (!selectedData.length) {
      message.warn(t('Please choose an RSU device'));
      return;
    }

    selected(selectedData.filter((item) => !defaultSelectedIds.includes(item.id)));
    setIsVisible(false);
  };

  return (
    <>
      <Button
        className="create"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsVisible(true)}
      >
        {t('Configure RSU')}
      </Button>
      <Modal
        title={t('Configure RSU')}
        visible={isVisible}
        width={1000}
        style={{ top: '8vh' }}
        destroyOnClose
        wrapClassName="rsu_modal"
        onOk={confirm}
        onCancel={() => setIsVisible(false)}
      >
        <ParameterDeviceList
          request={deviceList}
          rowSelection={{
            defaultSelectedRowKeys: defaultSelectedIds,
            alwaysShowAlert: true,
            onChange: (_, rows) => setSelectedData(rows),
          }}
        />
      </Modal>
    </>
  );
};

export default SelectDeviceModal;
