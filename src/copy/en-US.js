// === COPY LIBRARY - EN-US ===

export const COPY = {
  // Header
  header: {
    title: "How much is JOBSITE CLEANUP really costing you?",
    subtitle: "The comprehensive test to uncover your real costs.",
    startButton: "Start the Assessment",
    noCommitment: "No Email Required. No Commitment."
  },

  // Screen Titles
  screenTitles: {
    screen1_5: "Pain Scan - Uncover Hidden Issues",
    screen2: "Labor Cleanup Cost Calculator",
    screen3: "Double Loss Calculator",
    screen4: "Morale & Rework Impact",
    screen5: "Your Complete Cost Summary"
  },

  // Pain Scan Questions (Screen 1.5)
  painScan: {
    title: "Let's uncover the hidden costs of jobsite cleanup",
    subtitle: "Answer these 5 questions to reveal your real pain points",
    questions: [
      {
        id: "pain1",
        text: "Do your crews spend time cleaning daily instead of building?",
        yesResponse: "Fact: Most crews spend 30-60 minutes per person daily on cleanup - time that could be spent building.",
        noResponse: "That's rare. Even small amounts add up significantly over time."
      },
      {
        id: "pain2", 
        text: "Have you lost client confidence from a messy jobsite appearance?",
        yesResponse: "Fact: Messy sites directly impact client trust, contributing to ~18% of lost or delayed projects.",
        noResponse: "You're lucky. Many don't realize a job was lost due to mess until it's too late."
      },
      {
        id: "pain3",
        text: "Is cleanup a recurring point of tension between trades?",
        yesResponse: "Fact: Cleanup ambiguity is cited in ~80% of job site disputes between trades.",
        noResponse: "You're fortunate. For most, unclear cleanup roles cause major job site tension."
      },
      {
        id: "pain4",
        text: "Do clean sites help reduce safety incidents and improve referrals?",
        yesResponse: "Fact: Proactive cleanup reduces site incidents by up to 40% and drives client referrals.",
        noResponse: "Excellent. Cleaner sites correlate with 40% fewer incidents and better client perception."
      },
      {
        id: "pain5",
        text: "Would your team morale improve if they didn't have to clean others' mess?",
        yesResponse: "Fact: Teams with dedicated cleanup support report up to a 25% boost in morale.",
        noResponse: "Even if morale is good, forcing skilled trades to clean can lower their sense of value."
      }
    ],
    revealButton: "Reveal My Hidden Costs",
    progressText: "{answered} of 5 questions answered"
  },

  // Labor Calculator (Screen 2)
  laborCalculator: {
    title: "Labor Cleanup Cost Calculator",
    crewSize: "Crew Size",
    cleanupTime: "Cleanup Minutes/Day",
    workDays: "Work Days/Month",
    result: "Your crew loses about:",
    resultSubtext: "productive hours per month to cleanup.",
    resultDetail: "That's {hours} hours that could be spent building!",
    nextButton: "Next: Calculate Double Loss"
  },

  // Double Loss Calculator (Screen 3)
  doubleLoss: {
    title: "Your Real Monthly Double Loss",
    inputs: {
      crewSize: "Crew Size",
      cleanupTime: "Cleanup Minutes/Day", 
      baseWage: "Base Hourly Wage",
      billableRate: "Your Billable Rate",
      cleanupCoRate: "Cleanup Co. Rate"
    },
    currentLoss: {
      title: "Your Current Loss",
      cleanupHours: "Cleanup hours this month:",
      wagesPaid: "You pay in wages:",
      wagesTooltip: "Average construction labor profit margin: 20–35% per billable hour (Source: CFMA Benchmarks)",
      profitMissed: "You miss in profit:",
      profitTooltip: "Billable rate is typically 1.8–2.5× wage (Source: RSMeans & industry bid data)",
      totalLoss: "Total double loss:",
      totalLossTooltip: "Every non-billable hour = $35–$65 in missed profit for mid-size crews (Calculated from BLS wage data + CFMA margins)"
    },
    solution: {
      title: "If Cleanup Co. Works Instead",
      cost: "You pay Cleanup Co.:",
      earn: "You earn back:",
      net: "Your net gain:",
      explanation: "When our crew cleans, <b>your crew builds.</b><br/>The same hours that now cost you money start earning you money.<br/>Typical contractors see up to <b>50%+ of this loss turned into profit</b> immediately."
    },
    fixButton: "✅ Fix This",
    nextButton: "Next: Morale Impact"
  },

  // Morale Calculator (Screen 4)
  moraleCalculator: {
    title: "Morale & Rework Impact Calculator",
    toggles: [
      {
        id: "enjoysCleanup",
        label: "Does your team enjoy doing cleanup?",
        yesText: "Yes, they don't mind it",
        noText: "No, they find it frustrating",
        explanation: "Team members who dislike cleanup often rush through it, leading to callbacks and rework.",
        impact: 200
      },
      {
        id: "thoroughCleanup", 
        label: "Is cleanup done thoroughly?",
        yesText: "Yes, very thorough",
        noText: "No, often rushed/incomplete",
        explanation: "Rushed cleanup leads to client complaints and potential safety issues.",
        impact: 200
      },
      {
        id: "callbacksReduced",
        label: "Have you reduced callbacks since improving cleanup?",
        yesText: "Yes, significantly fewer",
        noText: "No, still getting callbacks",
        explanation: "Poor cleanup quality directly contributes to client callbacks and rework costs.",
        impact: 200
      }
    ],
    result: "Your monthly morale & rework loss:",
    nextButton: "See Complete Summary"
  },

  // Summary Screen (Screen 5)
  summary: {
    title: "Your Complete Cost Summary",
    subtitle: "Here's what jobsite cleanup is really costing you every month:",
    breakdown: {
      laborLoss: "Labor Loss (Wages Paid):",
      profitMissed: "Profit Missed (Billable Hours):",
      moraleLoss: "Morale & Rework Loss:",
      total: "Total Monthly Loss:"
    },
    actions: {
      tryPros: "Try 1-2 Pros Once",
      emailSummary: "Email My Summary",
      talkFirst: "Talk First (Free Consultation)"
    },
    datePicker: "When would you like to try our service?",
    restartButton: "Start Over"
  },

  // Progress
  progress: {
    uncovering: "Uncovering Your Hidden Costs",
    ready: "You've uncovered the issues. Now, let's see the real-world cost."
  }
};
