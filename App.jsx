import React, { useState, useEffect } from 'react';

// --- Thematic SVG Icon Components ---

const StopwatchIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const HandshakeFailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 18H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.14a2 2 0 0 0 1.79-1.11l1.28-2.2a2 2 0 0 1 1.79-1.11h3.58a2 2 0 0 1 1.79 1.11l1.28 2.2a2 2 0 0 0 1.79 1.11H21a2 2 0 0 1 2 2v1.5"/><path d="m2 14 3-3"/><path d="m13 18 4-4"/><path d="m10.5 15.5.19-1.89L8.8 12.19l-1.6.3L5.4 14"/><line x1="2" y1="22" x2="22" y2="2" />
    </svg>
);

const SpeechConflictIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.5 10.5c.3-1 .3-2.2-.2-3.2A4.33 4.33 0 0 0 8.8 4.8a5.39 5.39 0 0 0-4.3 2.2c-.8 1.4-1 3.2-.5 5.2"/><path d="M11.5 13.5c-.3 1-.3 2.2.2 3.2A4.33 4.33 0 0 0 15.2 20a5.39 5.39 0 0 0 4.3-2.2c.8-1.4 1-3.2.5-5.2"/><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const MoraleUpIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 20a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4"/><circle cx="12" cy="7" r="4"/><path d="M12 11v-1"/><path d="m15 12 1 4"/><path d="m9 12-1 4"/><path d="m12 19 3-3"/><path d="m12 19-3-3"/>
    </svg>
);

const HardHatIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
    </svg>
);

const InfoIcon = ({ tooltip }) => (
    <span className="ml-1 text-gray-400 hover:text-indigo-600 cursor-pointer inline-flex" title={tooltip}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    </span>
);

// --- Reusable Components ---

const ResponseBox = ({ icon: Icon, text, source, type }) => {
    const isYes = type === 'Yes';
    const bgColor = isYes ? 'bg-green-50' : 'bg-amber-50';
    const borderColor = isYes ? 'border-green-200' : 'border-amber-200';
    const iconColor = isYes ? 'text-green-600' : 'text-amber-600';

    return (
        <div className={`mt-4 p-4 ${bgColor} ${borderColor} border rounded-lg flex items-start gap-4 animate-fade-in relative max-w-lg`}>
            <Icon className={`${iconColor} flex-shrink-0 w-7 h-7 mt-1`} />
            <div className="flex-grow">
                <p className="text-gray-800 text-sm md:text-base pr-4 pb-4" dangerouslySetInnerHTML={{ __html: text }}></p>
                <p className="absolute bottom-2 right-3 text-xs text-gray-500 italic">{source}</p>
            </div>
        </div>
    );
};

// --- Screen-Specific Question Data ---
const SCREEN_QUESTIONS = {
    screen1: [
        { id: 'q1_time', text: 'Do crews spend time cleaning daily?', icon: StopwatchIcon, stat: { text: "Fact: Crews can spend <b>30-60 minutes per person daily on cleanup</b>, time that could be spent building.", source: "Source: Construction Business Owner" }, noStat: { text: "That's rare. Even a little untracked cleanup adds up. Industry data shows most crews spend <b>at least 30 min/day</b> on it.", source: "Source: CBO Industry Data" } },
        { id: 'q2_time', text: 'How many hours per week do you lose to cleanup?', icon: StopwatchIcon, stat: { text: "That's significant time loss. Most contractors underestimate their cleanup hours by <b>40-60%</b>.", source: "Source: Industry Survey" }, noStat: { text: "Even small amounts add up. Industry data shows most contractors lose <b>15-25 hours per week</b> to cleanup.", source: "Source: Construction Data" } }
    ],
    screen2: [
        { id: 'q1_cost', text: 'Have you lost client confidence from a messy site?', icon: HandshakeFailIcon, stat: { text: "Fact: A messy appearance directly impacts client trust, contributing to <b>~18% of lost or delayed remodeling projects.</b>", source: "Source: NARI Data" }, noStat: { text: "That's great! Still, many owners don't realize a job was lost due to mess until it's too late. NARI reports it's a factor in <b>nearly 1 in 5 projects.</b>", source: "Source: National Association of the Remodeling Industry" } },
        { id: 'q2_cost', text: 'What is your average hourly billable rate?', icon: HandshakeFailIcon, stat: { text: "That's a solid rate. Every hour spent cleaning instead of building costs you that full amount in lost revenue.", source: "Source: Industry Standard" }, noStat: { text: "Consider your true billable rate including overhead and profit margins. Most contractors bill at <b>2-3x their labor cost</b>.", source: "Source: CFMA Data" } }
    ],
    screen3: [
        { id: 'q1_morale', text: 'Is cleanup a recurring point of tension?', icon: SpeechConflictIcon, stat: { text: "Fact: Ambiguity over cleanup is a top source of friction, cited in <b>~80% of job site disputes</b> between trades.", source: "Source: Journal of Construction Engineering" }, noStat: { text: "You're lucky. For most, unclear cleanup roles are a major source of job site tension, causing <b>delays and friction between teams.</b>", source: "Source: JCE Industry Studies" } },
        { id: 'q2_morale', text: 'Would morale improve if they didn\'t clean others\' mess?', icon: MoraleUpIcon, stat: { text: "Fact: Teams with dedicated cleanup support report up to a <b>25% boost in morale</b> and focus on their primary trade.", source: "Source: Contractor Magazine Survey" }, noStat: { text: "Even if morale is good, forcing skilled trades to do cleanup can lower their sense of value. Surveys show a <b>25% morale boost</b> when cleanup is handled for them.", source: "Source: Contractor Magazine" } }
    ],
    screen4: [
        { id: 'q1_safety', text: 'Do clean sites help safety and referrals?', icon: HardHatIcon, stat: { text: "Fact: Proactive cleanup is proven to <b>reduce site incidents by up to 40%</b> and is a key driver for client referrals.", source: "Source: OSHA & Houzz Studies" }, noStat: { text: "Excellent. Remember, OSHA data shows a direct link between site cleanliness and <b>fewer reportable incidents,</b> a major liability risk.", source: "Source: OSHA Data" } },
        { id: 'q2_safety', text: 'How many safety incidents have you had this year?', icon: HardHatIcon, stat: { text: "That's concerning. Cleaner sites typically see <b>30-50% fewer incidents</b> and lower insurance costs.", source: "Source: OSHA Data" }, noStat: { text: "Great safety record! Maintaining clean sites helps keep it that way. Clean sites correlate with <b>40% fewer incidents</b>.", source: "Source: Safety Studies" } }
    ]
};

// --- Question Card Component ---
const QuestionCard = ({ question, answer, onAnswer, questionNumber, totalQuestions }) => {
    const { id, text, icon, stat, noStat } = question;

    const getButtonStyle = (option) => {
        if (answer === option) {
            return option === 'Yes' 
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-700 ring-offset-2' 
                : 'bg-gray-800 text-white ring-2 ring-gray-900 ring-offset-2';
        }
        return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100';
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-500 mb-6">
            <div className="flex justify-between items-start gap-4">
                <p className="text-xl md:text-2xl font-bold text-gray-800 text-left flex-1">
                   <span className="text-indigo-600 font-semibold text-sm block mb-1">Question {questionNumber} / {totalQuestions}</span>
                   {text}
                </p>
                <div className="flex items-center gap-4">
                    <button onClick={() => onAnswer(id, 'Yes')} className={`w-28 font-bold py-2 rounded-xl shadow-lg transition-all duration-200 text-lg ${getButtonStyle('Yes')}`}>Yes</button>
                    <button onClick={() => onAnswer(id, 'No')} className={`w-28 font-bold py-2 rounded-xl shadow-lg transition-all duration-200 text-lg ${getButtonStyle('No')}`}>No</button>
                </div>
            </div>

            {answer && <ResponseBox icon={icon} text={answer === 'Yes' ? stat.text : noStat.text} source={answer === 'Yes' ? stat.source : noStat.source} type={answer} />}
        </div>
    );
};

// --- Screen 1: Time/Effort Calculator ---
const TimeEffortCalculator = ({ onComplete, initialData }) => {
    const [crewSize, setCrewSize] = useState(initialData.crewSize || 6);
    const [cleanupTime, setCleanupTime] = useState(initialData.cleanupTime || 45);
    const [workDays, setWorkDays] = useState(initialData.workDays || 22);

    const totalHoursLost = Math.round((crewSize * cleanupTime * workDays) / 60);
    const productiveHoursGained = Math.round((crewSize * cleanupTime * workDays) / 60);

    return (
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-blue-500">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Time & Effort Calculator</h2>
            
            <div className="space-y-8 my-10">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Crew Size</label>
                        <span className="text-blue-600 font-bold text-lg">{crewSize}</span>
                    </div>
                    <input type="range" min="1" max="20" value={crewSize} onChange={(e) => setCrewSize(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Cleanup Minutes/Day</label>
                        <span className="text-blue-600 font-bold text-lg">{cleanupTime} min</span>
                    </div>
                    <input type="range" min="15" max="90" step="15" value={cleanupTime} onChange={(e) => setCleanupTime(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Work Days/Month</label>
                        <span className="text-blue-600 font-bold text-lg">{workDays}</span>
                    </div>
                    <input type="range" min="15" max="26" value={workDays} onChange={(e) => setWorkDays(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
            </div>

            <div className="text-center bg-blue-50 p-6 rounded-xl border border-blue-200">
                <p className="text-lg text-gray-700">Your crew loses about:</p>
                <p className="text-5xl font-extrabold text-blue-600 my-2">{totalHoursLost}</p>
                <p className="text-lg text-gray-700">productive hours per month to cleanup.</p>
                <p className="text-sm text-gray-600 mt-2">That's {productiveHoursGained} hours that could be spent building!</p>
            </div>

            <div className="text-center mt-10">
                <button 
                    onClick={() => onComplete({ crewSize, cleanupTime, workDays, totalHoursLost, productiveHoursGained })} 
                    className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                >
                    Next: Cost Calculator
                </button>
            </div>
        </div>
    );
};

// --- Screen 2: Cost/Money Calculator ---
const CostMoneyCalculator = ({ onComplete, initialData }) => {
    const [hourlyWage, setHourlyWage] = useState(initialData.hourlyWage || 25);
    const [billableRate, setBillableRate] = useState(initialData.billableRate || 75);
    const [totalHoursLost] = useState(initialData.totalHoursLost || 0);

    const laborCost = Math.round(totalHoursLost * hourlyWage * 1.5);
    const lostRevenue = Math.round(totalHoursLost * billableRate);
    const totalCost = laborCost + lostRevenue;

    return (
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-green-500">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Cost & Money Calculator</h2>
            
            <div className="space-y-8 my-10">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Average Hourly Wage</label>
                        <span className="text-green-600 font-bold text-lg">${hourlyWage}/hr</span>
                    </div>
                    <input type="range" min="15" max="50" value={hourlyWage} onChange={(e) => setHourlyWage(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Your Billable Rate</label>
                        <span className="text-green-600 font-bold text-lg">${billableRate}/hr</span>
                    </div>
                    <input type="range" min="50" max="150" value={billableRate} onChange={(e) => setBillableRate(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
            </div>

            <div className="text-center bg-green-50 p-6 rounded-xl border border-green-200">
                <p className="text-lg text-gray-700">Your cleanup is costing you:</p>
                <p className="text-5xl font-extrabold text-green-600 my-2">${totalCost.toLocaleString()}</p>
                <p className="text-lg text-gray-700">per month in labor + lost revenue.</p>
                <div className="mt-4 text-sm text-gray-600">
                    <p>Labor cost: ${laborCost.toLocaleString()}</p>
                    <p>Lost revenue: ${lostRevenue.toLocaleString()}</p>
                </div>
            </div>

            <div className="text-center mt-10">
                <button 
                    onClick={() => onComplete({ hourlyWage, billableRate, laborCost, lostRevenue, totalCost })} 
                    className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                >
                    Next: Morale Calculator
                </button>
            </div>
        </div>
    );
};

// --- Screen 3: Energy/Morale Calculator ---
const EnergyMoraleCalculator = ({ onComplete, initialData }) => {
    const [teamSize, setTeamSize] = useState(initialData.teamSize || 8);
    const [moraleImpact, setMoraleImpact] = useState(initialData.moraleImpact || 3);
    const [productivityLoss, setProductivityLoss] = useState(initialData.productivityLoss || 15);

    const moraleScore = Math.max(1, 10 - moraleImpact);
    const productivityGain = Math.round((teamSize * productivityLoss * 22) / 100);

    return (
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-purple-500">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Energy & Morale Calculator</h2>
            
            <div className="space-y-8 my-10">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Team Size</label>
                        <span className="text-purple-600 font-bold text-lg">{teamSize}</span>
                    </div>
                    <input type="range" min="3" max="25" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Morale Impact (1-10)</label>
                        <span className="text-purple-600 font-bold text-lg">{moraleImpact}</span>
                    </div>
                    <input type="range" min="1" max="10" value={moraleImpact} onChange={(e) => setMoraleImpact(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Productivity Loss %</label>
                        <span className="text-purple-600 font-bold text-lg">{productivityLoss}%</span>
                    </div>
                    <input type="range" min="5" max="30" value={productivityLoss} onChange={(e) => setProductivityLoss(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
            </div>

            <div className="text-center bg-purple-50 p-6 rounded-xl border border-purple-200">
                <p className="text-lg text-gray-700">Your current morale score:</p>
                <p className="text-5xl font-extrabold text-purple-600 my-2">{moraleScore}/10</p>
                <p className="text-lg text-gray-700">Potential productivity gain:</p>
                <p className="text-3xl font-bold text-purple-600">{productivityGain} hours/month</p>
            </div>

            <div className="text-center mt-10">
                <button 
                    onClick={() => onComplete({ teamSize, moraleImpact, productivityLoss, moraleScore, productivityGain })} 
                    className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                >
                    Next: Safety Calculator
                </button>
            </div>
        </div>
    );
};

// --- Screen 4: Safety/Risk Calculator ---
const SafetyRiskCalculator = ({ onComplete, initialData }) => {
    const [incidentRate, setIncidentRate] = useState(initialData.incidentRate || 2);
    const [insuranceCost, setInsuranceCost] = useState(initialData.insuranceCost || 5000);
    const [liabilityRisk, setLiabilityRisk] = useState(initialData.liabilityRisk || 3);

    const riskScore = Math.max(1, 10 - (incidentRate + liabilityRisk));
    const potentialSavings = Math.round((incidentRate * 5000) + (liabilityRisk * 2000));

    return (
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Safety & Risk Calculator</h2>
            
            <div className="space-y-8 my-10">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Incidents This Year</label>
                        <span className="text-red-600 font-bold text-lg">{incidentRate}</span>
                    </div>
                    <input type="range" min="0" max="10" value={incidentRate} onChange={(e) => setIncidentRate(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Annual Insurance Cost</label>
                        <span className="text-red-600 font-bold text-lg">${insuranceCost.toLocaleString()}</span>
                    </div>
                    <input type="range" min="2000" max="15000" step="500" value={insuranceCost} onChange={(e) => setInsuranceCost(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold text-gray-700">Liability Risk Level (1-10)</label>
                        <span className="text-red-600 font-bold text-lg">{liabilityRisk}</span>
                    </div>
                    <input type="range" min="1" max="10" value={liabilityRisk} onChange={(e) => setLiabilityRisk(Number(e.target.value))} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" />
                </div>
            </div>

            <div className="text-center bg-red-50 p-6 rounded-xl border border-red-200">
                <p className="text-lg text-gray-700">Your safety risk score:</p>
                <p className="text-5xl font-extrabold text-red-600 my-2">{riskScore}/10</p>
                <p className="text-lg text-gray-700">Potential annual savings:</p>
                <p className="text-3xl font-bold text-red-600">${potentialSavings.toLocaleString()}</p>
            </div>

            <div className="text-center mt-10">
                <button 
                    onClick={() => onComplete({ incidentRate, insuranceCost, liabilityRisk, riskScore, potentialSavings })} 
                    className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
                >
                    See Final Results
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [funnelData, setFunnelData] = useState({});

    const handleAnswer = (questionId, answer) => {
        setFunnelData(prev => ({ ...prev, answers: { ...prev.answers, [questionId]: answer }}));
    };

    const handleScreenComplete = (screenData) => {
        setFunnelData(prev => ({ ...prev, ...screenData }));
        console.log(`Screen ${currentScreen} Complete. Data:`, screenData);
        setCurrentScreen(currentScreen + 1);
    };

    const getCurrentScreenQuestions = () => {
        switch(currentScreen) {
            case 1: return SCREEN_QUESTIONS.screen1;
            case 2: return SCREEN_QUESTIONS.screen2;
            case 3: return SCREEN_QUESTIONS.screen3;
            case 4: return SCREEN_QUESTIONS.screen4;
            default: return [];
        }
    };

    const getCurrentScreenCalculator = () => {
        switch(currentScreen) {
            case 1: return <TimeEffortCalculator onComplete={handleScreenComplete} initialData={funnelData} />;
            case 2: return <CostMoneyCalculator onComplete={handleScreenComplete} initialData={funnelData} />;
            case 3: return <EnergyMoraleCalculator onComplete={handleScreenComplete} initialData={funnelData} />;
            case 4: return <SafetyRiskCalculator onComplete={handleScreenComplete} initialData={funnelData} />;
            default: return null;
        }
    };

    const getCurrentScreenTitle = () => {
        switch(currentScreen) {
            case 1: return "Time & Effort Impact";
            case 2: return "Cost & Money Impact";
            case 3: return "Energy & Morale Impact";
            case 4: return "Safety & Risk Impact";
            default: return "";
        }
    };

    return (
        <div className="bg-gray-100 font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
                .font-sans { font-family: 'Inter', sans-serif; }
                .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: #4f46e5;
                    cursor: pointer;
                    border-radius: 50%;
                }
            `}</style>
            
            {/* --- Header --- */}
            <header className="bg-gray-100/80 backdrop-blur-sm shadow-sm">
                 <div className="w-full max-w-4xl mx-auto text-center p-4 md:p-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        How much is <span className="text-indigo-600">JOBSITE CLEANUP</span>
                        <span className="block"><em className="italic">really</em> costing you?</span>
                    </h1>
                     {currentScreen > 1 && (
                         <p className="mt-2 text-md text-gray-600 animate-fade-in">The comprehensive test to uncover your real costs.</p>
                     )}
                </div>
            </header>

            <main className="w-full max-w-4xl mx-auto p-4">
                {/* --- Start Button --- */}
                {currentScreen === 1 && (
                    <div className="text-center mt-4 mb-12 animate-fade-in">
                        <button onClick={() => setCurrentScreen(1.5)} className="bg-indigo-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300">
                            Start the Assessment
                        </button>
                        <p className="text-base font-bold tracking-wider text-gray-600 mt-4">No Email Required. No Commitment.</p>
                    </div>
                )}

                {/* --- Screen Content --- */}
                {currentScreen > 1 && currentScreen <= 4 && (
                    <div className="animate-fade-in">
                        <div className="my-8">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-bold text-gray-800">{getCurrentScreenTitle()}</h2>
                                <p className="text-sm font-semibold text-gray-600">Screen {currentScreen} of 4</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{width: `${(currentScreen - 1) * 25}%`}}></div>
                            </div>
                        </div>
                        
                        {/* Questions for current screen */}
                        {getCurrentScreenQuestions().map((q, index) => (
                            <QuestionCard 
                                key={q.id} 
                                question={q} 
                                answer={funnelData.answers?.[q.id]} 
                                onAnswer={handleAnswer} 
                                questionNumber={index + 1} 
                                totalQuestions={getCurrentScreenQuestions().length}
                            />
                        ))}

                        {/* Calculator for current screen */}
                        {getCurrentScreenCalculator()}
                    </div>
                )}

                {/* --- Final Results Screen --- */}
                {currentScreen === 5 && (
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your Complete Assessment Results</h2>
                        <p className="text-center text-gray-600 mb-8">This is where the final results will be displayed.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
