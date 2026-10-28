/**
 * Home page copy. Every fact here comes from the current aetoscare.com site;
 * sections render this data so copy edits never touch layout code.
 */

export const hero = {
  eyebrow: "Remote patient monitoring · Chronic care management",
  titleLead: "Remote patient monitoring,",
  titleAccent: "with a nurse’s touch.",
  description:
    "Cellular devices your patients can use from day one, an EHR-integrated platform, and a bilingual team of nurses who watch over every reading, day and night. Launch Remote Patient Monitoring and Chronic Care Management without adding staff or risk.",
  primaryCta: { label: "Request a demo" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  proofPoints: [
    "First device free",
    "24/7/365 RN coverage",
    "HIPAA-compliant",
    "English & Spanish",
  ],
} as const;

export const integrations = {
  title: "Plugs into the EHR your practice already runs",
  names: [
    "Epic",
    "athenahealth",
    "eClinicalWorks",
    "NextGen",
    "AdvancedMD",
    "Kareo",
    "Greenway Health",
    "Practice Fusion",
    "DrChrono",
    "WRS Health",
    "eMDs",
    "IPS",
    "EHI",
  ],
} as const;

export const valueProps = {
  id: "why-aetos",
  eyebrow: "Why AETOS",
  titleLead: "Everything your remote care program needs.",
  titleAccent: "Nothing it doesn’t.",
  description:
    "One partner for devices, software, clinical staffing and billing documentation, built to run as a true extension of your practice.",
  items: [
    {
      key: "devices",
      title: "Devices provided",
      description:
        "The first device for every patient is included in our service. We handle shipping, returns and repairs for you.",
      highlight: "$0",
      highlightLabel: "device cost for your first device",
    },
    {
      key: "time",
      title: "Automatic time tracking",
      description:
        "Every work task and patient call is automatically recorded and time-stamped, creating a complete audit trail for your practice.",
      highlight: "Audit-ready",
      highlightLabel: "documentation for every interaction",
    },
    {
      key: "monitoring",
      title: "Continuous observation",
      description:
        "Our 24/7 clinical center watches your patients, evaluating readings and escalating pertinent cases directly to you.",
      highlight: "24/7/365",
      highlightLabel: "clinical coverage",
    },
    {
      key: "risk",
      title: "Risk-free partnership",
      description:
        "Our RPM and CCM programs run on a performance-based payment model, so partnering with us keeps your practice profitable.",
      highlight: "Performance-based",
      highlightLabel: "payment model",
    },
  ],
} as const;

export const programs = {
  id: "programs",
  eyebrow: "Programs",
  titleLead: "Two programs.",
  titleAccent: "One seamless workflow.",
  description:
    "Remote Patient Monitoring and Chronic Care Management share one platform, one clinical team and one monthly billing report.",
  items: [
    {
      key: "rpm",
      abbr: "RPM",
      name: "Remote Patient Monitoring",
      question: "What is Remote Patient Monitoring?",
      summary: "Real-time vitals from home, triaged by clinicians and billed with confidence.",
      href: "/services/remote-patient-monitoring",
      steps: [
        {
          title: "Ship patients a device",
          description:
            "We send 4G-enabled devices that capture blood pressure, glucose, pulse oximetry and/or weight. Data flows to our platform automatically.",
        },
        {
          title: "Respond to abnormal readings",
          description:
            "When a reading is out of range, our 24/7 clinical team contacts the patient, evaluates the situation and escalates pertinent cases to the right provider.",
        },
        {
          title: "Bill the payer for RPM",
          description:
            "Every clinical interaction accrues time toward monthly RPM codes. We deliver a billing report to your billing team each month.",
        },
      ],
    },
    {
      key: "ccm",
      abbr: "CCM",
      name: "Chronic Care Management",
      question: "What is Chronic Care Management?",
      summary: "Monthly nurse-led care that keeps chronic patients on track between visits.",
      href: "/services/chronic-care-management",
      steps: [
        {
          title: "First consultation & risk evaluation",
          description:
            "A registered nurse leads a monthly call. We start with a comprehensive questionnaire to determine risk level, then set health goals from that assessment.",
        },
        {
          title: "Continuous 24/7/365 support",
          description:
            "Round-the-clock text and call support, plus RN help with scheduling appointments, education, medication adherence and accountability.",
        },
        {
          title: "Bill the payer for CCM",
          description:
            "Clinical engagement time accrues toward monthly CCM codes for Medicare and other payers. We help with billing details for seamless claims.",
        },
      ],
    },
  ],
  moreServicesLabel: "Also available",
} as const;

export const devices = {
  id: "devices",
  eyebrow: "Connected devices",
  titleLead: "Cellular RPM devices that work",
  titleAccent: "right out of the box.",
  description:
    "Patients open the box and take a reading. No Wi-Fi, Bluetooth, tablets or smartphones required.",
  features: [
    "Seamless integration with cloud-based EHR systems",
    "First device for each patient included in our service",
    "Consumables included: lancets, test strips and batteries",
    "HIPAA-compliant, secure data transmission",
    "No Wi-Fi, Bluetooth, tablet or smartphone needed",
  ],
  items: [
    {
      key: "blood-pressure-monitor",
      name: "Blood Pressure Monitor",
      metric: "Systolic · Diastolic · Pulse",
      unit: "mmHg",
      sample: "124/79",
      description: "Upper-arm cuff that transmits systolic, diastolic and pulse readings automatically.",
      href: "/devices/blood-pressure-monitor",
    },
    {
      key: "glucometer",
      name: "Glucometer",
      metric: "Blood glucose",
      unit: "mg/dL",
      sample: "108",
      description: "Cellular glucose meter for diabetes management, with readings that sync instantly.",
      href: "/devices/glucometer",
    },
    {
      key: "pulse-oximeter",
      name: "Pulse Oximeter",
      metric: "SpO₂ · Pulse rate",
      unit: "%",
      sample: "98",
      description: "Fingertip oxygen saturation and pulse monitoring for respiratory and cardiac care.",
      href: "/devices/pulse-oximeter",
    },
    {
      key: "spirometer",
      name: "Spirometer",
      metric: "Lung function",
      unit: "L",
      sample: "3.2",
      description: "Tracks lung function at home for patients living with asthma or COPD.",
      href: "/devices/spirometer",
    },
    {
      key: "weight-scale",
      name: "Weight Scale",
      metric: "Body weight",
      unit: "lb",
      sample: "176",
      description: "Daily weight trends that support weight management and flag sudden changes.",
      href: "/devices/weight-scale",
    },
  ],
  allDevicesCta: { label: "Explore all devices", href: "/devices" },
} as const;

export const careTeam = {
  id: "care-team",
  eyebrow: "Who oversees the data",
  titleLead: "A 24/7 clinical team that works",
  titleAccent: "like your own.",
  description:
    "Our nurses and medical assistants monitor your patients 24/7, responding to readings, calling patients, assessing and escalating cases to you when necessary.",
  team: {
    title: "Our clinicians",
    points: [
      "Round-the-clock, year-round coverage nationwide",
      "Fluent in English and Spanish",
      "Follow your clinic-guided escalation protocols",
      "Scale RPM and CCM without hiring additional staff",
      "Operate as a seamless extension of your practice",
    ],
  },
  platform: {
    title: "Our platform",
    description:
      "Your team gets access to our web-based, HIPAA-compliant RPM/CCM platform, the central hub for both programs.",
    points: [
      "Compatible with cloud-based EHR systems",
      "Time-stamps and documents every patient engagement",
      "Generates billing documentation",
      "Collects patient vital signs",
      "Records clinical staff observations",
    ],
  },
  escalation: [
    { title: "Reading received", detail: "Vitals arrive over 4G in real time" },
    { title: "Out-of-range flagged", detail: "Abnormal values surface instantly" },
    { title: "RN contacts patient", detail: "Assessment by phone or text" },
    { title: "Provider escalation", detail: "Per your clinic’s protocol" },
    { title: "Time logged", detail: "Documented for monthly billing" },
  ],
} as const;

export type ReimbursementLine = {
  code: string;
  label: string;
  amount: number;
  /** Running monthly total after this line is billed. */
  cumulative: number;
  increment?: string;
};

export const reimbursement = {
  id: "reimbursement",
  eyebrow: "Reimbursement",
  titleLead: "Turn RPM and CCM into",
  titleAccent: "predictable revenue.",
  description:
    "Average national reimbursement for the services AETOS delivers, per patient, per month.",
  rpm: {
    key: "rpm",
    name: "Remote Patient Monitoring",
    abbr: "RPM",
    max: 193,
    onboarding: {
      code: "99453",
      label: "Initial setup & patient enrollment",
      amount: 20,
      note: "One-time, first month",
    },
    lines: [
      { code: "99454", label: "Device supply & data monitoring", amount: 55, cumulative: 55 },
      { code: "99457", label: "First 20 min of clinical interaction", amount: 50, cumulative: 105, increment: "20 min" },
      { code: "99458", label: "Additional 20 min of interaction", amount: 44, cumulative: 149, increment: "+20 min" },
      { code: "99458", label: "Additional 20 min of interaction", amount: 44, cumulative: 193, increment: "+20 min" },
    ] satisfies ReimbursementLine[],
  },
  ccm: {
    key: "ccm",
    name: "Chronic Care Management",
    abbr: "CCM",
    max: 160,
    lines: [
      { code: "99490", label: "First 20 min of clinical staff time", amount: 64, cumulative: 64, increment: "20 min" },
      { code: "99439", label: "Next 20 min of clinical staff time", amount: 48, cumulative: 112, increment: "+20 min" },
      { code: "99439", label: "Following 20 min of clinical staff time", amount: 48, cumulative: 160, increment: "+20 min" },
    ] satisfies ReimbursementLine[],
  },
  disclaimer:
    "Figures are average national rates shown for illustration. Actual reimbursement varies by payer, locality and documentation. CPT® is a registered trademark of the American Medical Association.",
} as const;

export const outcomes = {
  id: "outcomes",
  eyebrow: "Patient outcomes",
  titleLead: "Results patients can",
  titleAccent: "feel.",
  description: "Average improvements observed over time in patients enrolled in our programs.",
  stats: [
    { key: "glucose", value: "16", sign: "minus", unit: "mg/dL", label: "Blood glucose", detail: "Average improvement in blood glucose levels" },
    { key: "systolic", value: "11", sign: "minus", unit: "mmHg", label: "Systolic pressure", detail: "Average systolic blood pressure improvement" },
    { key: "diastolic", value: "9", sign: "minus", unit: "mmHg", label: "Diastolic pressure", detail: "Average diastolic blood pressure improvement" },
    { key: "heart-rate", value: "4", sign: "minus", unit: "bpm", label: "Resting heart rate", detail: "Average improvement in resting heart rate" },
    { key: "weight", value: "17", sign: "minus", unit: "lbs", label: "Weight", detail: "Average weight loss over time" },
    { key: "adherence", value: "22", sign: "plus", unit: "%", label: "Medication adherence", detail: "Improvement in medication adherence" },
  ],
} as const;

export const engagement = {
  id: "engagement",
  eyebrow: "Patient engagement",
  titleLead: "Built to keep patients",
  titleAccent: "engaged.",
  description:
    "Programs only work when patients stay involved. Every touchpoint is designed to make participation effortless.",
  items: [
    {
      key: "reminders",
      title: "Automated reminders",
      description:
        "Timely prompts remind patients to take their readings, keeping data consistent and every program on track.",
    },
    {
      key: "consumables",
      title: "Consumables included",
      description:
        "Test strips, lancets and batteries are provided as part of the service, so patients never have a reason to stop measuring.",
    },
    {
      key: "coordinators",
      title: "Care coordinators",
      description:
        "Our team helps schedule doctor appointments, delivers ongoing education and keeps patients accountable to their goals.",
    },
  ],
  cta: { label: "Request a demo" },
} as const;

export const process = {
  id: "how-it-works",
  eyebrow: "Getting started",
  titleLead: "Launch RPM and CCM in five",
  titleAccent: "simple steps.",
  description: "We handle the heavy lifting, from the first patient call to the monthly billing report.",
  steps: [
    { title: "Inform", description: "Upon provider order, our team contacts patients to educate them on RPM and CCM." },
    { title: "Obtain consent", description: "We walk each patient through the program and secure their consent." },
    { title: "Dispatch devices", description: "Once consent is confirmed, we ship devices and consumables to patients’ homes." },
    { title: "Monitor", description: "Our RNs contact patients on abnormal readings and escalate relevant cases to you." },
    { title: "Secure reimbursement", description: "You receive a monthly billing report for seamless RPM and CCM claims by your biller." },
  ],
} as const;

export const faq = {
  id: "faq",
  eyebrow: "FAQ",
  titleLead: "RPM and CCM questions practices",
  titleAccent: "ask us.",
  description: "Straight answers about launching remote care with AETOS.",
  items: [
    {
      question: "What is Remote Patient Monitoring (RPM)?",
      answer:
        "Remote Patient Monitoring uses connected medical devices to capture vital signs such as blood pressure, glucose, oxygen saturation and weight while patients are at home. AETOS ships 4G-enabled devices, our 24/7 clinical team reviews readings and escalates abnormal results, and that clinical time accrues toward monthly RPM billing codes.",
    },
    {
      question: "What is Chronic Care Management (CCM)?",
      answer:
        "Chronic Care Management is a Medicare-covered program for patients living with two or more chronic conditions. With AETOS, a registered nurse holds monthly calls, completes a risk assessment, sets health goals and supports patients with education, appointment scheduling and medication adherence.",
    },
    {
      question: "How much can my practice be reimbursed?",
      answer:
        "Based on average national rates, RPM reimburses up to $193 per patient per month plus a one-time $20 setup, and CCM reimburses up to $160 per patient per month. Actual amounts vary by payer, locality and documentation.",
    },
    {
      question: "Do patients need Wi-Fi or a smartphone?",
      answer:
        "No. Our devices use built-in 4G cellular connectivity, so patients don’t need Wi-Fi, Bluetooth, a tablet or a smartphone. Consumables such as lancets, test strips and batteries are included.",
    },
    {
      question: "Who monitors our patients’ data?",
      answer:
        "Our clinical team of nurses and medical assistants monitors readings 24/7/365 in English and Spanish. They follow your clinic’s escalation protocols and bring relevant cases to your attention when necessary.",
    },
    {
      question: "Does AETOS integrate with our EHR?",
      answer:
        "Yes. Our web-based, HIPAA-compliant platform is compatible with cloud-based EHR systems, including Epic, athenahealth, eClinicalWorks, NextGen, AdvancedMD and many more.",
    },
    {
      question: "Is there financial risk for our practice?",
      answer:
        "Our RPM and CCM programs operate on a performance-based payment model, and the first device for each patient is included in the service, so your practice stays profitable when partnering with us.",
    },
  ],
} as const;

export const finalCta = {
  id: "get-started",
  titleLead: "Ready to grow your",
  titleAccent: "remote care program?",
  description:
    "Book a 30-minute demo and see how AETOS can launch RPM and CCM for your practice, without adding staff.",
  primaryCta: { label: "Request a demo" },
} as const;
