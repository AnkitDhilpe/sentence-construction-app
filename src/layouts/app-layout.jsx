// Importing Outlet from react-router-dom
// Outlet is a placeholder for nested child routes
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="text-center text-sm text-gray-400 py-4 bg-gray-200">
        made with ❤️ by Ankit
      </footer>
    </div>
  );
}

export default AppLayout;
;
