import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logoDefault from "@/assets/logo.png";
import { useState } from "react";
import { getNavItems, getSettings } from "@/hooks/useAdminData";

const Navbar = () => {
  const { items } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = getNavItems().filter((n) => n.visible).sort((a, b) => a.order - b.order);
  const settings = getSettings();
  const logo = settings.logoUrl || logoDefault;

  return (
    <nav className="sticky top-0 z-50 gradient-gold shadow-soft">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt={settings.brandName} className="h-10 w-10 rounded-full" />
          <span className="font-heading text-xl font-bold text-primary-foreground">{settings.brandName}</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors hover:text-foreground ${
                location.pathname === l.to ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/cart" className="relative text-primary-foreground hover:text-foreground transition-colors">
            <ShoppingCart size={22} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden gradient-gold px-4 pb-4 space-y-2">
          {navItems.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-semibold text-primary-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm font-semibold text-primary-foreground">
            <ShoppingCart size={18} /> Cart ({items.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
