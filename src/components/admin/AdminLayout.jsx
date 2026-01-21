import { NavLink, Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { label: "Dashboard", to: "/admin" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Products", to: "/admin/products" },
  { label: "Attributes", to: "/admin/attributes" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Customers", to: "/admin/customers" },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const userLabel = useMemo(() => {
    if (user?.user_Name) return user.user_Name;
    if (user?.email) return user.email;
    try {
      const raw = localStorage.getItem("auth");
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed?.user?.email || parsed?.user?.user_Name || "User";
    } catch {
      return "User";
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background-primary">
      <header className="sticky top-0 z-50">
        <div className="bg-background-white shadow-card">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div className="text-text-primary font-semibold">Company Name</div>
              </div>

              <nav className="hidden md:flex items-center bg-background-primary rounded-full px-2 py-1 gap-1">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/admin"}
                    className={({ isActive }) =>
                      `px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-primary text-white"
                          : "text-text-primary hover:bg-background-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <NavLink
                  to="/admin/notifications"
                  className="w-10 h-10 rounded-full bg-background-primary flex items-center justify-center hover:bg-background-primary/70"
                  aria-label="Notifications"
                >
                  🔔
                </NavLink>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex items-center gap-3 bg-background-primary rounded-full px-3 py-2 hover:bg-background-primary/70"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E8ECF4] flex items-center justify-center">
                      <span className="text-text-primary font-semibold">U</span>
                    </div>
                    <span className="hidden sm:block text-sm text-text-primary">
                      {userLabel}
                    </span>
                    <span className="text-text-secondary text-xs">▼</span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-background-white rounded-xl shadow-card border border-border-light overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-background-primary"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile nav */}
            <nav className="md:hidden mt-3 flex items-center gap-2 overflow-x-auto pb-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-brand-primary text-white"
                        : "bg-background-primary text-text-primary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

