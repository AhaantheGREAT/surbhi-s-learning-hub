import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  { id: "gpay", label: "Google Pay" },
  { id: "upi", label: "UPI" },
  { id: "netbanking", label: "Net Banking" },
];

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("gpay");
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground text-lg">No items in cart</p>
          <button onClick={() => navigate("/courses")} className="mt-4 text-primary font-semibold hover:underline">Browse Courses →</button>
        </div>
      </Layout>
    );
  }

  const handlePayment = () => {
    toast.success("Redirecting to payment gateway...");
    setTimeout(() => {
      clearCart();
      toast.success("Payment successful! Welcome to your courses.");
      navigate("/");
    }, 2000);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Checkout" />

        <div className="max-w-2xl mx-auto grid gap-6">
          {/* Order summary */}
          <div className="rounded-lg bg-card p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{item.title}</span>
                <span className="text-sm font-semibold text-primary">₹{item.price.toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex justify-between pt-4 mt-2">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Payment method */}
          <div className="rounded-lg bg-card p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                    selectedMethod === m.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={selectedMethod === m.id}
                    onChange={() => setSelectedMethod(m.id)}
                    className="accent-primary"
                  />
                  <span className="font-medium text-foreground">{m.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full rounded-lg gradient-gold py-4 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] text-lg"
          >
            Pay ₹{total.toLocaleString("en-IN")}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
