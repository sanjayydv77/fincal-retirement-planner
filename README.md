# FinCal Innovation: Advanced Retirement Planner 🚀
**Submission for TECHNEX '26 | Co-sponsored by HDFC Mutual Fund**

## 🎯 Overview
This project is an interactive, investor-friendly financial calculator designed to simplify retirement planning. Moving away from "spreadsheet-style" interfaces, it focuses on **Investor Education and Awareness** through an intuitive 3-step wizard.

## 🛠️ Technical Specifications (Mandatory Compliance)
- **Frontend**: Next.js 15.5.9
- **Environment**: Node.js 22.11.0
- **Styling**: Tailwind CSS (Strictly following HDFC Brand Guidelines: #224c87, #da3832, #919090)
- **Accessibility**: WCAG 2.1 AA Compliant (Semantic HTML, ARIA roles, Keyboard Navigation)

## 💡 Key Innovations
- **Inflation Variability**: Allows users to set different rates for Lifestyle and Healthcare inflation, educating them on real-world cost escalations.
- **Retirement Lifestyle Expectations**: Personalized expense buckets to help users plan for travel or medical buffers.
- **Transparent Assumptions**: All financial logic is illustrative, non-predictive, and fully user-editable.

## 📊 Financial Logic
The calculator follows a rigorous 3-step framework:
1. **Inflate Expenses**: Future annual needs are calculated based on separate lifestyle/medical inflation rates.
2. **Retirement Corpus**: Uses the **Present Value of Annuity** formula to estimate the required fund.
3. **Required SIP**: Reverse-calculates the monthly investment needed during working years using pre-retirement return rates.

## ⚖️ Compliance Disclaimer
> "This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns."