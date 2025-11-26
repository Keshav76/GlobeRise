import ClientSidebar from './ClientSidebar';
import ClientHeader from './ClientHeader';

const ClientLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#222831]">
      <ClientSidebar />
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        <ClientHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-[#222831]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;

