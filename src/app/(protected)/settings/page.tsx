import APIKeys from '@/components/settings/settings-apikeys';
import GeneralSettings from '@/components/settings/settings-general';
import SettingsHeader from '@/components/settings/settings-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  return (
    <section className='h-full w-full flex flex-col gap-3 p-1'>
      <SettingsHeader />
      <Tabs defaultValue='apiKeys'>
        <TabsList variant='line'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='apiKeys'>API Keys</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <GeneralSettings />
        </TabsContent>
        <TabsContent value='apiKeys'>
          <APIKeys />
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default Settings;
