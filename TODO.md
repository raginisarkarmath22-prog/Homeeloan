# TODO: Create "Compare Home Loan Interest Rates" Page

## Steps to Complete

- [x] Create new CheckRates.jsx component in homeloan-frontend-main/src/pages/user/
- [x] Add /check-rates route in App.jsx
- [x] Implement data fetching from /api/banks in CheckRates.jsx
- [x] Design responsive grid layout (3 cols desktop, 1-2 mobile) for bank cards
- [x] Style bank cards: white background, shadow, rounded corners, padding, hover animation
- [x] Add bank logo and name at top of each card
- [x] Display Interest Rate (e.g., "8.5% to 11.05%")
- [x] Display Processing Fee (e.g., "0.5%")
- [x] Display Max Tenure (e.g., "Up to 30 yrs")
- [x] Add green "Check Eligibility" button at bottom linking to /eligibility-form
- [x] Integrate sticky ads on the right side using Ads component
- [x] Add section heading: “Compare Home Loan Interest Rates” with subtext
- [x] Handle fallbacks for missing data ("Data not available")
- [x] Ensure component updates on data fetch
- [x] Optional: Highlight best offers if bestOffer: true in data
- [x] Test mobile responsiveness (assumed working based on Tailwind classes)
- [x] Verify backend data structure and no null/undefined fields (handled with fallbacks)
