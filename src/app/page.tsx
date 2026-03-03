"use client";

import { useState } from "react";

export default function RetirementCalculator() {
  const [step, setStep] = useState(1);

  // Step 1 Inputs (Now Split into Lifestyle and Healthcare for Innovation)
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [lifestyleExpense, setLifestyleExpense] = useState(500000); // Annual Lifestyle
  const [medicalExpense, setMedicalExpense] = useState(100000); // Annual Healthcare

  // Step 2 Inputs (Separate Inflation Buckets)
  const [lifestyleInflation, setLifestyleInflation] = useState(6);
  const [medicalInflation, setMedicalInflation] = useState(10); // Medical inflation is typically higher
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(8);

  // Math Engine as per Hackathon Specs (Upgraded with Variability)
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const retirementDuration = Math.max(0, lifeExpectancy - retirementAge);

  // 1. Inflate Expenses Separately
  const inflatedLifestyle =
    lifestyleExpense * Math.pow(1 + lifestyleInflation / 100, yearsToRetirement);
  const inflatedMedical =
    medicalExpense * Math.pow(1 + medicalInflation / 100, yearsToRetirement);
  const totalInflatedAnnualExpense = inflatedLifestyle + inflatedMedical;

  // 2. Retirement Corpus (Present Value of Annuity)
  const rPost = postRetirementReturn / 100;
  const t = retirementDuration;
  const requiredCorpus =
    rPost > 0
      ? totalInflatedAnnualExpense * ((1 - Math.pow(1 + rPost, -t)) / rPost)
      : totalInflatedAnnualExpense * t;

  // 3. Required SIP
  const rPreMonthly = preRetirementReturn / 100 / 12;
  const nMonths = yearsToRetirement * 12;
  const requiredSIP =
    rPreMonthly > 0 && nMonths > 0
      ? requiredCorpus /
        (((Math.pow(1 + rPreMonthly, nMonths) - 1) / rPreMonthly) *
          (1 + rPreMonthly))
      : 0;

  // Visual Graph Logic (Total Invested vs Returns)
  const totalInvested = requiredSIP * nMonths;
  const wealthGained = Math.max(0, requiredCorpus - totalInvested);
  const investedPercentage = requiredCorpus > 0 ? (totalInvested / requiredCorpus) * 100 : 0;
  const gainedPercentage = requiredCorpus > 0 ? (wealthGained / requiredCorpus) * 100 : 0;

  // Helper function to format INR
  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center font-sans">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-[#224c87] text-white p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Retirement Planning Calculator
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Plan your future with precision and illustrative clarity.
          </p>
        </header>

        {/* Wizard Progress */}
        <div className="flex bg-gray-100 p-4 justify-between text-sm font-semibold text-[#919090]">
          <span className={step >= 1 ? "text-[#224c87]" : ""}>1. Basic Details</span>
          <span className={step >= 2 ? "text-[#224c87]" : ""}>2. Assumptions</span>
          <span className={step >= 3 ? "text-[#224c87]" : ""}>3. Action Plan</span>
        </div>

        <div className="p-8">
          {/* STEP 1: Upgraded with Expense Buckets */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-[#224c87] border-b pb-2">
                Your Basic Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="currentAge" className="block text-sm font-medium text-gray-700 mb-1">Current Age</label>
                  <input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                </div>
                <div>
                  <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-700 mb-1">Retirement Age</label>
                  <input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                </div>
                <div>
                  <label htmlFor="lifeExpectancy" className="block text-sm font-medium text-gray-700 mb-1">Expected Lifespan</label>
                  <input id="lifeExpectancy" type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
                <p className="text-sm text-[#224c87] font-semibold mb-3">Breakdown of Current Annual Expenses (₹)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="lifestyleExpense" className="block text-sm font-medium text-gray-700 mb-1">Lifestyle & Household</label>
                    <input id="lifestyleExpense" type="number" value={lifestyleExpense} onChange={(e) => setLifestyleExpense(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                  </div>
                  <div>
                    <label htmlFor="medicalExpense" className="block text-sm font-medium text-gray-700 mb-1">Medical & Healthcare</label>
                    <input id="medicalExpense" type="number" value={medicalExpense} onChange={(e) => setMedicalExpense(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                  </div>
                </div>
              </div>

              <button onClick={() => setStep(2)} className="mt-6 w-full bg-[#da3832] text-white py-3 rounded font-bold hover:bg-red-700 transition">
                Next: Set Advanced Assumptions
              </button>
            </div>
          )}

          {/* STEP 2: Upgraded with Inflation Variability */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-bold text-[#224c87] border-b pb-2">
                Future Assumptions <span className="text-sm font-normal text-[#919090]">(Fully Editable)</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded border border-gray-200">
                <div>
                  <label htmlFor="lifestyleInflation" className="block text-sm font-medium text-gray-700 mb-1">Lifestyle Inflation Rate (%)</label>
                  <input id="lifestyleInflation" type="number" value={lifestyleInflation} onChange={(e) => setLifestyleInflation(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                  <p className="text-xs text-gray-500 mt-1">Usually matches standard CPI.</p>
                </div>
                <div>
                  <label htmlFor="medicalInflation" className="block text-sm font-medium text-gray-700 mb-1">Healthcare Inflation Rate (%)</label>
                  <input id="medicalInflation" type="number" value={medicalInflation} onChange={(e) => setMedicalInflation(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                  <p className="text-xs text-gray-500 mt-1">Medical costs historically rise faster.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preRetirementReturn" className="block text-sm font-medium text-gray-700 mb-1">Pre-Retirement Annual Return (%)</label>
                  <input id="preRetirementReturn" type="number" value={preRetirementReturn} onChange={(e) => setPreRetirementReturn(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                </div>
                <div>
                  <label htmlFor="postRetirementReturn" className="block text-sm font-medium text-gray-700 mb-1">Post-Retirement Annual Return (%)</label>
                  <input id="postRetirementReturn" type="number" value={postRetirementReturn} onChange={(e) => setPostRetirementReturn(Number(e.target.value))} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#224c87] outline-none" />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={() => setStep(1)} className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded font-bold hover:bg-gray-300 transition">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="w-2/3 bg-[#da3832] text-white py-3 rounded font-bold hover:bg-red-700 transition">
                  Calculate My Plan
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Upgraded with Clean Visual Graph */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn" aria-live="polite">
              <h2 className="text-xl font-bold text-[#224c87] border-b pb-2">
                Your Illustrative Plan
              </h2>
              
              <div className="bg-[#224c87] text-white p-6 rounded-lg text-center mb-6 shadow-md">
                <p className="text-sm text-blue-200 mb-1">Required Monthly SIP</p>
                <p className="text-4xl md:text-5xl font-bold">{formatINR(requiredSIP)}</p>
                <p className="text-xs mt-2 opacity-80">to achieve your retirement goal over {yearsToRetirement} years.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded bg-gray-50 flex flex-col justify-center">
                  <p className="text-sm text-[#919090] font-medium">Inflated Annual Expense at Age {retirementAge}</p>
                  <p className="text-xl font-bold text-[#224c87]">{formatINR(totalInflatedAnnualExpense)}</p>
                  <p className="text-xs text-gray-500 mt-1">(Lifestyle + Healthcare Combined)</p>
                </div>
                <div className="border border-gray-200 p-4 rounded bg-gray-50">
                  <p className="text-sm text-[#919090] font-medium mb-2">Total Retirement Corpus Required</p>
                  <p className="text-2xl font-bold text-[#224c87] mb-4">{formatINR(requiredCorpus)}</p>
                  
                  {/* Clean Visual Progress Bar (No Arrows, Strictly Compliant) */}
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2 flex overflow-hidden">
                    <div className="bg-[#da3832] h-4" style={{ width: `${investedPercentage}%` }} title="Total Invested"></div>
                    <div className="bg-[#224c87] h-4" style={{ width: `${gainedPercentage}%` }} title="Wealth Gained"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#da3832]"></span> Invested: {formatINR(totalInvested)}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#224c87]"></span> Wealth Gained: {formatINR(wealthGained)}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#919090] bg-gray-100 p-3 rounded mt-4">
                <p className="font-bold text-[#da3832] mb-1">Important Note:</p>
                <p>All figures are strictly illustrative and not predictive. Assumes life expectancy of {lifeExpectancy} years and no withdrawal taxes.</p>
              </div>

              <button onClick={() => setStep(1)} className="mt-6 w-full border-2 border-[#224c87] text-[#224c87] py-3 rounded font-bold hover:bg-blue-50 transition">
                Recalculate
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}