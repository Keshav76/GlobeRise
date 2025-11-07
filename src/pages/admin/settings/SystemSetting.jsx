import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

const SystemSetting = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h1>
      <Card>
        <div className="space-y-4">
          <Input label="Site Name" defaultValue="GlobeRise" />
          <Input label="Site Email" defaultValue="admin@globerise.com" />
          <Input label="Site Phone" defaultValue="+1234567890" />
          <Button variant="primary">Save Settings</Button>
        </div>
      </Card>
    </div>
  );
};

export default SystemSetting;

