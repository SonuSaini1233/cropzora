import React from "react";
import {
  Calculator,
  Wheat,
  Sprout,
  Droplets,
  FlaskConical,
  IndianRupee,
  Ruler,
} from "lucide-react";

const calculators = [
  {
    title: "Yield Calculator",
    description: "Estimate your expected crop yield based on field size and productivity.",
    icon: Wheat,
  },
  {
    title: "Seed Calculator",
    description: "Calculate the required quantity of seeds for your field.",
    icon: Sprout,
  },
  {
    title: "Irrigation Calculator",
    description: "Estimate the water requirement for your crop.",
    icon: Droplets,
  },
  {
    title: "Fertilizer Calculator",
    description: "Calculate the approximate fertilizer requirement for your crop.",
    icon: FlaskConical,
  },
  {
    title: "Profit Calculator",
    description: "Estimate crop revenue, expenses and expected profit.",
    icon: IndianRupee,
  },
  {
    title: "Area Calculator",
    description: "Calculate and convert your farm area easily.",
    icon: Ruler,
  },
];

export default function Calculators({ onBack }) {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Calculator size={25} />
              </div>

              <span className="text-sm font-semibold uppercase tracking-wider text-green-100">
                Smart Farming Tools
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Farm Calculators
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-green-50 sm:text-base">
              Make better farming decisions with simple calculators for
              yield, seeds, irrigation, fertilizer, profit and farm area.
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>

      {/* Calculator Cards */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Choose a Calculator
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select a tool according to your farming requirement.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {calculators.map((calculator) => {
            const Icon = calculator.icon;

            return (
              <button
                key={calculator.title}
                className="group rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <span className="text-gray-300 transition group-hover:text-green-500">
                    →
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {calculator.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {calculator.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-green-600">
                  Open Calculator →
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="rounded-3xl border border-green-100 bg-green-50 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white">
            <Calculator size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Smart Farming Calculations
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              CropZora calculators are designed to help farmers estimate
              important farming requirements quickly and easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}