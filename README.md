# Cleanup Cost Calculator Funnel

A multi-screen React application that helps construction companies calculate the real cost of jobsite cleanup and discover potential savings.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

## 📱 App Flow

### Screen 1: Start
- Welcome message and start button

### Screen 1.5: Pain Scan
- 5 Yes/No questions about cleanup issues
- Each answer reveals industry facts and insights
- Must answer all to proceed

### Screen 2: Labor Calculator
- Input crew size, cleanup time, work days
- Calculates monthly hours lost to cleanup
- Uses 22 workdays/month, wage * 1.5 all-in

### Screen 3: Double Loss Calculator
- Shows "pain first" - current losses
- Inputs: crew size, cleanup time, base wage, billable rate
- Calculates wages paid + profit missed
- Click "Fix This" to reveal solution with Cleanup Co.

### Screen 4: Morale & Rework
- Three toggle questions about team attitude
- Adds $200/month for each negative answer
- Shows monthly morale & rework loss

### Screen 5: Complete Summary
- Itemized breakdown of all costs
- Total monthly loss calculation
- Date picker for service
- Action buttons: Try Pros, Email Summary, Talk First
- Restart option

## 🏗️ Architecture

- **React 18** with functional components
- **Context API** + useReducer for state management
- **Local Storage** for data persistence
- **Tailwind CSS** for styling
- **Modular structure** for easy customization

## 📁 File Structure

```
src/
├── components/           # React components
│   ├── PainScan.jsx     # Screen 1.5
│   ├── LaborCalculator.jsx    # Screen 2
│   ├── DoubleLossCalculator.jsx # Screen 3
│   ├── MoraleCalculator.jsx    # Screen 4
│   └── Summary.jsx      # Screen 5
├── context/             # State management
│   └── FunnelContext.jsx
├── lib/                 # Business logic
│   ├── calc.js         # All calculations
│   └── format.js       # Formatting functions
├── copy/                # Content
│   └── en-US.js        # All text/copy
├── App.jsx              # Main app component
└── index.js             # Entry point
```

## 🔧 Customization

### Change Industry Content
- Edit `src/copy/en-US.js` to swap out cleanup-specific text
- Update questions, responses, and explanations

### Modify Calculations
- Edit `src/lib/calc.js` to change formulas
- Update constants like work days, wage multipliers

### Update Styling
- Modify `src/styles.css` for custom styles
- Use Tailwind classes in components

## 💾 Data Persistence

- All user inputs are saved to localStorage
- Data persists between browser sessions
- Reset button clears all data

## ♿ Accessibility

- ARIA labels on all form inputs
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme

## 🚀 Production Build

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## 📱 Mobile Responsive

- Mobile-first design
- Touch-friendly sliders and buttons
- Responsive grid layouts
- Optimized for all screen sizes

## 🔍 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is for demonstration purposes. Customize and use as needed for your business.
