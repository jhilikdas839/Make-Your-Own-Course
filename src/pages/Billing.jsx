import React from "react";

const Billing = () => {
  const invoices = [
    {
      id: "INV-2026-009",
      date: "15 Sep 2026",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-2026-008",
      date: "15 Aug 2026",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-2026-007",
      date: "15 Jul 2026",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-2026-006",
      date: "15 Jun 2026",
      plan: "Pro Plan",
      amount: "$29.00",
      status: "Paid",
    },
  ];

  return (
    <div className="p-5 md:p-8">

      {/* =====================================
          PAGE HEADER
      ===================================== */}
      <div className="mb-8">
        <p className="text-xs text-gray-400 mb-1">
          Account
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-[#10131d]">
          Billing
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Manage your subscription, payment method and invoices.
        </p>
      </div>


      {/* =====================================
          CURRENT PLAN
      ===================================== */}
      <div className="bg-[#10131d] rounded-2xl p-6 md:p-8 text-white mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Plan Info */}
          <div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#168ee5] text-[#10131d]">
                Active Plan
              </span>

              <span className="text-xs text-gray-400">
                Renews automatically
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Pro Plan
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Full access to premium courses and learning resources.
            </p>

          </div>


          {/* Price */}
          <div className="lg:text-right">

            <div className="flex items-end lg:justify-end gap-1">
              <span className="text-3xl font-bold">
                $29
              </span>

              <span className="text-sm text-gray-400 mb-1">
                / month
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Next billing: 15 Oct 2026
            </p>

          </div>

        </div>


        {/* Plan Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-7 pt-6 border-t border-white/10">

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <i className="ri-check-line text-[#168ee5]"></i>
            Unlimited courses
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <i className="ri-check-line text-[#168ee5]"></i>
            Live classes
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <i className="ri-check-line text-[#168ee5]"></i>
            Certificates
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <i className="ri-check-line text-[#168ee5]"></i>
            Mentor sessions
          </div>

        </div>

      </div>


      {/* =====================================
          BILLING OVERVIEW
      ===================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Monthly Amount */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <i className="ri-money-dollar-circle-line text-blue-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">
            Monthly Amount
          </p>

          <h3 className="text-2xl font-bold text-[#10131d] mt-1">
            $29.00
          </h3>

        </div>


        {/* Next Billing */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <i className="ri-calendar-line text-purple-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">
            Next Billing Date
          </p>

          <h3 className="text-xl font-bold text-[#10131d] mt-2">
            15 Oct 2026
          </h3>

        </div>


        {/* Total Paid */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <i className="ri-wallet-3-line text-green-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">
            Total Paid
          </p>

          <h3 className="text-2xl font-bold text-[#10131d] mt-1">
            $116.00
          </h3>

        </div>

      </div>


      {/* =====================================
          PAYMENT METHOD + PLAN
      ===================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">


        {/* PAYMENT METHOD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-lg font-bold text-[#10131d]">
                Payment Method
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your default payment method
              </p>
            </div>

            <button className="text-sm font-semibold text-[#168ee5] hover:underline">
              Edit
            </button>

          </div>


          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#10131d] text-white flex items-center justify-center">
                <i className="ri-bank-card-line text-xl"></i>
              </div>

              <div>
                <p className="font-semibold text-sm text-[#10131d]">
                  Visa ending in 4242
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Expires 08/28
                </p>
              </div>

            </div>

            <span className="text-xs font-medium text-green-600">
              Default
            </span>

          </div>

        </div>


        {/* PLAN MANAGEMENT */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-lg font-bold text-[#10131d]">
                Plan Management
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage your current subscription
              </p>
            </div>

            <i className="ri-settings-3-line text-xl text-gray-400"></i>

          </div>


          <div className="space-y-3">

            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-left">

              <div className="flex items-center gap-3">

                <i className="ri-arrow-up-circle-line text-xl text-[#168ee5]"></i>

                <div>
                  <p className="text-sm font-semibold text-[#10131d]">
                    Upgrade Plan
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Get more learning benefits
                  </p>
                </div>

              </div>

              <i className="ri-arrow-right-s-line text-gray-400"></i>

            </button>


            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-left">

              <div className="flex items-center gap-3">

                <i className="ri-pause-circle-line text-xl text-gray-500"></i>

                <div>
                  <p className="text-sm font-semibold text-[#10131d]">
                    Manage Subscription
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Change your billing preferences
                  </p>
                </div>

              </div>

              <i className="ri-arrow-right-s-line text-gray-400"></i>

            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          BILLING HISTORY
      ===================================== */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="text-lg font-bold text-[#10131d]">
              Billing History
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              View and download your previous invoices.
            </p>
          </div>

          <button className="text-sm font-semibold text-[#168ee5] hover:underline">
            View All
          </button>

        </div>


        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-gray-100 text-left">

                <th className="px-6 py-4 text-xs font-semibold text-gray-400">
                  Invoice
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-400">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-400">
                  Plan
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-400">
                  Amount
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-gray-400 text-right">
                  Action
                </th>

              </tr>
            </thead>


            <tbody>

              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                >

                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-[#10131d]">
                      {invoice.id}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {invoice.date}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {invoice.plan}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-[#10131d]">
                    {invoice.amount}
                  </td>

                  <td className="px-6 py-5">

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-600">

                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>

                      {invoice.status}

                    </span>

                  </td>

                  <td className="px-6 py-5 text-right">

                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#168ee5] hover:underline">
                      <i className="ri-download-line"></i>
                      Invoice
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>


        {/* Mobile Billing Cards */}
        <div className="md:hidden divide-y divide-gray-100">

          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-sm font-semibold text-[#10131d]">
                    {invoice.id}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {invoice.date}
                  </p>

                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                  {invoice.status}
                </span>

              </div>


              <div className="flex items-center justify-between mt-4">

                <div>
                  <p className="text-xs text-gray-400">
                    Plan
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {invoice.plan}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    Amount
                  </p>

                  <p className="text-sm font-bold mt-1">
                    {invoice.amount}
                  </p>
                </div>

              </div>


              <button className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-[#10131d] hover:bg-gray-50 transition">

                <i className="ri-download-line mr-2"></i>

                Download Invoice

              </button>

            </div>
          ))}

        </div>

      </div>


      {/* =====================================
          BOTTOM CTA
      ===================================== */}
      <div className="mt-8 bg-[#168ee5] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <h2 className="text-xl font-bold text-[#10131d]">
            Want more from your learning?
          </h2>

          <p className="text-sm text-[#10131d]/70 mt-2">
            Explore our plans and unlock more courses, sessions and resources.
          </p>

        </div>

        <button className="px-5 py-3 rounded-xl bg-[#10131d] text-white text-sm font-semibold hover:opacity-90 transition">
          Explore Plans
          <i className="ri-arrow-right-line ml-2"></i>
        </button>

      </div>

    </div>
  );
};

export default Billing;