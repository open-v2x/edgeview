import { countries } from 'edge-src/services/device/device';
import { ProFormCascader } from '@ant-design/pro-form';

const Country: React.FC<any> = (props) => {
  return (
    <ProFormCascader
      {...props}
      fieldProps={{ fieldNames: { label: 'name', value: 'code' } }}
      request={async () => await countries()}
    />
  );
};

export default Country;
