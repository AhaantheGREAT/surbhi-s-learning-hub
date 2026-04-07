import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, total } = useCart();

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Your Cart" />

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">Your cart is empty</p>
            <Link to="/courses" className="mt-4 inline-block text-primary font-semibold hover:underline">Browse Courses →</Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-card">
                  <img src={item.image} alt={item.title} className="h-16 w-24 rounded object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-primary font-bold">₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg bg-card p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center rounded-lg gradient-gold py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
