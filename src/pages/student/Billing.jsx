import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import Toggle from "../../components/common/Toggle";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { initialInvoices, plans } from "../../data/studentData";
import { downloadTextFile } from "../../utils/format";

const initialBilling = { planId: "pro", autoRenew: true, card: { last4: "4242", expiry: "08/28", name: "John Smith" } };

function Billing() {
  const toast = useToast();
  const [billing, setBilling] = useLocalStorage("myoc_billing", initialBilling);
  const [invoices] = useLocalStorage("myoc_invoices", initialInvoices);
  const [modal, setModal] = useState(null); // "plans" | "card" | "manage"
  const [showAll, setShowAll] = useState(false);
  const [card, setCard] = useState({ number: "", expiry: "", name: "" });

  const plan = plans.find((p) => p.id === billing.planId) || plans[1];
  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);

  const choosePlan = (newPlan) => {
    setBilling((prev) => ({ ...prev, planId: newPlan.id }));
    setModal(null);
    toast(`You're now on the ${newPlan.name}.`);
  };

  const saveCard = (event) => {
    event.preventDefault();
    const digits = card.number.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits) || !/^\d{2}\/\d{2}$/.test(card.expiry) || !card.name.trim()) {
      toast("Enter a 16-digit card number, expiry as MM/YY and the name on card.", "error");
      return;
    }
    setBilling((prev) => ({ ...prev, card: { last4: digits.slice(-4), expiry: card.expiry, name: card.name } }));
    setCard({ number: "", expiry: "", name: "" });
    setModal(null);
    toast("Payment method updated.");
  };

  const downloadInvoice = (invoice) => {
    downloadTextFile(
      `${invoice.id}.txt`,
      `MAKE YOUR OWN COURSE - INVOICE\n\nInvoice: ${invoice.id}\nDate: ${invoice.date}\nPlan: ${invoice.plan}\nAmount: $${invoice.amount}.00\nStatus: ${invoice.status}\n\nThank you for learning with us!`
    );
    toast(`Downloaded ${invoice.id}`);
  };

  return (
    <>
      <PageHeader eyebrow="Account" title="Billing" description="Manage your plan, payment method and invoices." />

      <section className="mb-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-[#10131d] p-7 text-white">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/20"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Active Plan</span>
              <span className="text-xs text-white/50">{billing.autoRenew ? "Renews automatically" : "Auto-renew is off"}</span>
            </div>
            <h2 className="mt-5 text-3xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-4xl font-bold">
              ${plan.price}
              <span className="text-base font-normal text-white/50"> / month</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {plan.features.map((f) => (
                <span key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs">{f}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setModal("plans")}>Change plan</Button>
              <Button variant="outline" onClick={() => setModal("manage")}>Manage subscription</Button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Payment Method</h3>
              <p className="text-sm text-gray-400">Your default payment method</p>
            </div>
            <Button size="sm" variant="outline" icon="ri-edit-line" onClick={() => setModal("card")}>Edit</Button>
          </div>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-5 text-white">
            <i className="ri-visa-line text-3xl"></i>
            <p className="mt-6 font-mono tracking-widest">•••• •••• •••• {billing.card.last4}</p>
            <div className="mt-3 flex justify-between text-xs text-white/70">
              <span>{billing.card.name}</span>
              <span>Expires {billing.card.expiry}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Monthly Amount" value={`$${plan.price}.00`} icon="ri-money-dollar-circle-line" />
        <StatCard label="Next Billing Date" value={billing.autoRenew ? "15 Nov 2026" : "—"} icon="ri-calendar-line" tone="blue" />
        <StatCard label="Total Paid" value={`$${totalPaid}.00`} icon="ri-wallet-3-line" tone="green" />
      </section>

      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-lg font-semibold">Billing History</h2>
            <p className="text-sm text-gray-400">Download your previous invoices.</p>
          </div>
          <button type="button" onClick={() => setShowAll((v) => !v)} className="text-sm font-medium text-primary hover:underline">
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                {["Invoice", "Date", "Plan", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="px-6 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(showAll ? invoices : invoices.slice(0, 4)).map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 font-medium">{invoice.id}</td>
                  <td className="px-6 py-4 text-gray-500">{invoice.date}</td>
                  <td className="px-6 py-4 text-gray-500">{invoice.plan}</td>
                  <td className="px-6 py-4 font-medium">${invoice.amount}.00</td>
                  <td className="px-6 py-4"><StatusBadge status={invoice.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => downloadInvoice(invoice)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50">
                      <i className="ri-download-2-line mr-1"></i> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal open={modal === "plans"} onClose={() => setModal(null)} title="Choose a plan" size="xl">
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.id} className={`rounded-2xl border p-5 ${p.id === plan.id ? "border-primary bg-primary/5" : "border-gray-200"}`}>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold">
                ${p.price}
                <span className="text-sm font-normal text-gray-400">/mo</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {p.features.map((f) => (
                  <li key={f}><i className="ri-check-line mr-2 text-green-500"></i>{f}</li>
                ))}
              </ul>
              <Button className="mt-5 w-full" variant={p.id === plan.id ? "outline" : "dark"} disabled={p.id === plan.id} onClick={() => choosePlan(p)}>
                {p.id === plan.id ? "Current plan" : `Switch to ${p.name}`}
              </Button>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={modal === "card"} onClose={() => setModal(null)} title="Update payment method" size="sm">
        <form onSubmit={saveCard} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="c-number">Card number</label>
            <input id="c-number" inputMode="numeric" maxLength={19} value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className={inputClass} placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="c-exp">Expiry</label>
              <input id="c-exp" maxLength={5} value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className={inputClass} placeholder="MM/YY" />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-name">Name on card</label>
              <input id="c-name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className={inputClass} />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">Save card</Button>
        </form>
      </Modal>

      <Modal open={modal === "manage"} onClose={() => setModal(null)} title="Manage subscription" size="sm">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 p-4">
          <div>
            <p className="font-medium">Auto-renew</p>
            <p className="text-sm text-gray-400">Renew your plan every month.</p>
          </div>
          <Toggle
            label="Auto-renew"
            checked={billing.autoRenew}
            onChange={(value) => {
              setBilling((prev) => ({ ...prev, autoRenew: value }));
              toast(value ? "Auto-renew turned on." : "Auto-renew turned off. Your plan stays active until the period ends.", "info");
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export default Billing;
