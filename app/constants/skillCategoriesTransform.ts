export enum SkillCategory {
  // ─────────────────────────────────────────────────────────────
  // SOFTWARE DEVELOPMENT & TECHNOLOGY
  // ─────────────────────────────────────────────────────────────

  // Frontend Development
  FRONTEND_DEVELOPMENT = "Frontend Development",
  REACT_NEXTJS_DEVELOPMENT = "React / Next.js Development",
  VUE_NUXT_DEVELOPMENT = "Vue / Nuxt Development",
  ANGULAR_DEVELOPMENT = "Angular Development",
  WEB_PERFORMANCE_OPTIMIZATION = "Web Performance Optimization",
  ACCESSIBILITY_A11Y_DEVELOPMENT = "Accessibility (a11y) Development",
  WEB3_FRONTEND_DAPP_DEVELOPMENT = "Web3 Frontend & DApp Development",

  // Backend Development
  BACKEND_DEVELOPMENT = "Backend Development",
  API_DESIGN_REST_GRAPHQL = "API Design (REST / GraphQL)",
  MICROSERVICES_ARCHITECTURE = "Microservices Architecture",
  SERVERLESS_EDGE_COMPUTING = "Serverless & Edge Computing",
  NODE_TYPESCRIPT_DEVELOPMENT = "Node.js / TypeScript Development",
  PYTHON_BACKEND_DEVELOPMENT = "Python Backend Development",
  GO_RUST_SYSTEMS_DEVELOPMENT = "Go / Rust Systems Development",
  JAVA_JVM_DEVELOPMENT = "Java / JVM Development",
  DOTNET_CSHARP_DEVELOPMENT = ".NET / C# Development",

  // Mobile
  MOBILE_APP_DEVELOPMENT = "Mobile App Development",
  IOS_SWIFT_DEVELOPMENT = "iOS / Swift Development",
  ANDROID_KOTLIN_DEVELOPMENT = "Android / Kotlin Development",
  REACT_NATIVE_DEVELOPMENT = "React Native Development",
  FLUTTER_DART_DEVELOPMENT = "Flutter / Dart Development",

  // DevOps & Cloud
  DEVOPS_CLOUD_INFRASTRUCTURE = "DevOps & Cloud Infrastructure",
  CI_CD_PIPELINE_ENGINEERING = "CI/CD Pipeline Engineering",
  INFRASTRUCTURE_AS_CODE = "Infrastructure as Code",
  KUBERNETES_CONTAINER_ORCHESTRATION = "Kubernetes & Container Orchestration",
  AWS_CLOUD_ENGINEERING = "AWS Cloud Engineering",
  GCP_CLOUD_ENGINEERING = "GCP Cloud Engineering",
  AZURE_CLOUD_ENGINEERING = "Azure Cloud Engineering",
  SITE_RELIABILITY_ENGINEERING = "Site Reliability Engineering",
  PLATFORM_ENGINEERING = "Platform Engineering",
  FINOPS_CLOUD_COST_OPTIMIZATION = "FinOps & Cloud Cost Optimization",

  // Database
  DATABASE_MANAGEMENT = "Database Management",
  SQL_RELATIONAL_DATABASES = "SQL & Relational Databases",
  NOSQL_DOCUMENT_DATABASES = "NoSQL & Document Databases",
  VECTOR_DATABASES_SEARCH = "Vector Databases & Search",
  DATA_WAREHOUSING_LAKE_ARCHITECTURE = "Data Warehousing & Lake Architecture",
  REAL_TIME_STREAMING_DATABASES = "Real-Time & Streaming Databases",

  // Cybersecurity
  CYBERSECURITY_INFORMATION_SECURITY = "Cybersecurity & Information Security",
  APPLICATION_SECURITY_APPSEC = "Application Security (AppSec)",
  PENETRATION_TESTING_RED_TEAMING = "Penetration Testing & Red Teaming",
  SECURITY_OPERATIONS_SOC = "Security Operations (SOC)",
  CLOUD_SECURITY_ARCHITECTURE = "Cloud Security Architecture",
  DEVSECOPS = "DevSecOps",
  THREAT_INTELLIGENCE_ANALYSIS = "Threat Intelligence Analysis",
  IDENTITY_ACCESS_MANAGEMENT = "Identity & Access Management",
  DIGITAL_FORENSICS_INCIDENT_RESPONSE = "Digital Forensics & Incident Response",

  // Data Science & Analytics
  DATA_SCIENCE_ANALYTICS = "Data Science & Analytics",
  DATA_ENGINEERING_PIPELINES = "Data Engineering & Pipelines",
  BUSINESS_INTELLIGENCE_REPORTING = "Business Intelligence & Reporting",
  STATISTICAL_MODELING_ANALYSIS = "Statistical Modeling & Analysis",
  DATA_VISUALIZATION = "Data Visualization",

  // AI & Machine Learning
  ARTIFICIAL_INTELLIGENCE_MACHINE_LEARNING = "Artificial Intelligence & Machine Learning",
  DEEP_LEARNING_NEURAL_NETWORKS = "Deep Learning & Neural Networks",
  NATURAL_LANGUAGE_PROCESSING = "Natural Language Processing",
  COMPUTER_VISION = "Computer Vision",
  REINFORCEMENT_LEARNING = "Reinforcement Learning",
  MLOPS_AI_INFRASTRUCTURE = "MLOps & AI Infrastructure",
  AI_SAFETY_ALIGNMENT_RESEARCH = "AI Safety & Alignment Research",
  GENERATIVE_AI_LLM_ENGINEERING = "Generative AI & LLM Engineering",
  PROMPT_ENGINEERING = "Prompt Engineering",

  // Game Development
  GAME_DEVELOPMENT = "Game Development",
  UNITY_DEVELOPMENT = "Unity Development",
  UNREAL_ENGINE_DEVELOPMENT = "Unreal Engine Development",
  GAME_DESIGN_SYSTEMS = "Game Design & Systems",
  XR_AR_VR_DEVELOPMENT = "XR / AR / VR Development",
  REAL_TIME_GRAPHICS_SHADERS = "Real-Time Graphics & Shaders",

  // Embedded & IoT
  EMBEDDED_SYSTEMS_IOT = "Embedded Systems & IoT",
  FIRMWARE_DEVELOPMENT = "Firmware Development",
  RTOS_BARE_METAL_PROGRAMMING = "RTOS & Bare-Metal Programming",
  IOT_PLATFORM_CONNECTIVITY = "IoT Platform & Connectivity",
  ROBOTICS_CONTROL_SYSTEMS = "Robotics & Control Systems",

  // QA & Testing
  QA_SOFTWARE_TESTING = "QA & Software Testing",
  TEST_AUTOMATION_ENGINEERING = "Test Automation Engineering",
  PERFORMANCE_LOAD_TESTING = "Performance & Load Testing",
  MANUAL_EXPLORATORY_TESTING = "Manual & Exploratory Testing",
  CHAOS_ENGINEERING_RESILIENCE = "Chaos Engineering & Resilience",

  // Blockchain & Web3
  BLOCKCHAIN_WEB3 = "Blockchain & Web3",
  SMART_CONTRACT_DEVELOPMENT = "Smart Contract Development",
  DEFI_PROTOCOL_ENGINEERING = "DeFi Protocol Engineering",
  NFT_TOKENIZATION_PLATFORMS = "NFT & Tokenization Platforms",
  CRYPTO_PROTOCOL_DESIGN = "Crypto Protocol Design",
  ZERO_KNOWLEDGE_PROOF_ENGINEERING = "Zero-Knowledge Proof Engineering",

  // Developer Experience
  DEVELOPER_EXPERIENCE_DEVTOOLS = "Developer Experience & DevTools",
  OPEN_SOURCE_LIBRARY_DEVELOPMENT = "Open Source Library Development",
  TECHNICAL_DOCUMENTATION_WRITING = "Technical Documentation Writing",
  SDK_CLI_TOOLING = "SDK & CLI Tooling",

  // ─────────────────────────────────────────────────────────────
  // DESIGN & CREATIVE MEDIA
  // ─────────────────────────────────────────────────────────────

  // UI/UX & Product Design
  UI_UX_PRODUCT_DESIGN = "UI/UX & Product Design",
  DESIGN_SYSTEMS_COMPONENT_LIBRARIES = "Design Systems & Component Libraries",
  USER_RESEARCH_USABILITY_TESTING = "User Research & Usability Testing",
  INTERACTION_DESIGN_PROTOTYPING = "Interaction Design & Prototyping",
  INFORMATION_ARCHITECTURE = "Information Architecture",
  SERVICE_DESIGN = "Service Design",

  // Graphic Design & Branding
  GRAPHIC_DESIGN_BRANDING = "Graphic Design & Branding",
  VISUAL_IDENTITY_BRAND_STRATEGY = "Visual Identity & Brand Strategy",
  TYPOGRAPHY_LETTERING = "Typography & Lettering",
  ILLUSTRATION_DIGITAL_ART = "Illustration & Digital Art",
  PACKAGING_PRINT_DESIGN = "Packaging & Print Design",
  EDITORIAL_PUBLICATION_DESIGN = "Editorial & Publication Design",

  // Motion & Animation
  MOTION_GRAPHICS_ANIMATION = "Motion Graphics & Animation",
  CHARACTER_ANIMATION = "Character Animation",
  VFX_COMPOSITING = "VFX & Compositing",
  INTERACTIVE_CREATIVE_CODING = "Interactive & Creative Coding",

  // Video Production
  VIDEO_PRODUCTION_EDITING = "Video Production & Editing",
  DOCUMENTARY_NARRATIVE_FILMMAKING = "Documentary & Narrative Filmmaking",
  LIVE_STREAMING_BROADCAST = "Live Streaming & Broadcast",
  COLOR_GRADING_FINISHING = "Color Grading & Finishing",
  SCRIPTWRITING_STORYBOARDING = "Scriptwriting & Storyboarding",

  // Audio Production
  AUDIO_PRODUCTION_SOUND_DESIGN = "Audio Production & Sound Design",
  MUSIC_PRODUCTION_COMPOSITION = "Music Production & Composition",
  PODCAST_PRODUCTION = "Podcast Production",
  VOICEOVER_NARRATION = "Voiceover & Narration",
  SPATIAL_AUDIO_IMMERSIVE_SOUND = "Spatial Audio & Immersive Sound",

  // 3D & Rendering
  THREE_D_MODELING_RENDERING = "3D Modeling & Rendering",
  PRODUCT_VISUALIZATION = "Product Visualization",
  ARCHITECTURAL_VISUALIZATION = "Architectural Visualization",
  GENERATIVE_AI_ART_DIRECTION = "Generative AI Art Direction",
  SCULPTING_DIGITAL_FABRICATION = "Sculpting & Digital Fabrication",

  // Photography
  PHOTOGRAPHY_IMAGING = "Photography & Imaging",
  PHOTO_RETOUCHING_POST_PROCESSING = "Photo Retouching & Post-Processing",
  COMMERCIAL_STUDIO_PHOTOGRAPHY = "Commercial & Studio Photography",
  DRONE_AERIAL_PHOTOGRAPHY = "Drone & Aerial Photography",

  // Architecture & Interior Design
  INTERIOR_ARCHITECTURAL_DESIGN = "Interior & Architectural Design",
  URBAN_LANDSCAPE_DESIGN = "Urban & Landscape Design",
  SPACE_PLANNING_FF_AND_E = "Space Planning & FF&E",
  SUSTAINABLE_GREEN_DESIGN = "Sustainable & Green Design",

  // Fashion & Textile
  FASHION_APPAREL_DESIGN = "Fashion & Apparel Design",
  TEXTILE_MATERIAL_DESIGN = "Textile & Material Design",
  COSTUME_PROP_DESIGN = "Costume & Prop Design",

  // ─────────────────────────────────────────────────────────────
  // PRODUCT, PROJECT, & OPERATIONS MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  PRODUCT_MANAGEMENT = "Product Management",
  TECHNICAL_PRODUCT_MANAGEMENT = "Technical Product Management",
  PLATFORM_ECOSYSTEM_STRATEGY = "Platform & Ecosystem Strategy",
  PRODUCT_ANALYTICS_EXPERIMENTATION = "Product Analytics & Experimentation",

  PROJECT_MANAGEMENT_AGILE = "Project Management & Agile",
  SCRUM_MASTER_AGILE_COACHING = "Scrum Master & Agile Coaching",
  PROGRAM_MANAGEMENT = "Program Management",
  TECHNICAL_PROJECT_MANAGEMENT = "Technical Project Management",
  PMO_PORTFOLIO_MANAGEMENT = "PMO & Portfolio Management",

  BUSINESS_OPERATIONS_STRATEGY = "Business Operations & Strategy",
  ORGANIZATIONAL_DESIGN = "Organizational Design",
  PROCESS_IMPROVEMENT_LEAN = "Process Improvement & Lean",
  VENDOR_PROCUREMENT_MANAGEMENT = "Vendor & Procurement Management",
  WORKPLACE_FACILITIES_MANAGEMENT = "Workplace & Facilities Management",

  SUPPLY_CHAIN_LOGISTICS = "Supply Chain & Logistics",
  INVENTORY_WAREHOUSE_MANAGEMENT = "Inventory & Warehouse Management",
  IMPORT_EXPORT_TRADE_COMPLIANCE = "Import / Export & Trade Compliance",
  LAST_MILE_DELIVERY_OPERATIONS = "Last-Mile Delivery Operations",

  CUSTOMER_SUCCESS_SUPPORT = "Customer Success & Support",
  ENTERPRISE_CUSTOMER_SUCCESS = "Enterprise Customer Success",
  TECHNICAL_SUPPORT_ENGINEERING = "Technical Support Engineering",
  COMMUNITY_DEVELOPER_RELATIONS = "Community & Developer Relations",
  CUSTOMER_EXPERIENCE_CX = "Customer Experience (CX)",

  HUMAN_RESOURCES_TALENT_ACQUISITION = "Human Resources & Talent Acquisition",
  TECHNICAL_RECRUITING = "Technical Recruiting",
  COMPENSATION_BENEFITS_DESIGN = "Compensation & Benefits Design",
  LEARNING_DEVELOPMENT = "Learning & Development",
  PEOPLE_OPERATIONS_HRBP = "People Operations & HRBP",
  DIVERSITY_EQUITY_INCLUSION = "Diversity, Equity & Inclusion",

  LEGAL_COMPLIANCE_GOVERNANCE = "Legal, Compliance & Governance",
  CORPORATE_COMMERCIAL_LAW = "Corporate & Commercial Law",
  INTELLECTUAL_PROPERTY_LAW = "Intellectual Property Law",
  DATA_PRIVACY_REGULATORY_COMPLIANCE = "Data Privacy & Regulatory Compliance",
  EMPLOYMENT_LABOUR_LAW = "Employment & Labour Law",
  CONTRACT_MANAGEMENT = "Contract Management",

  // ─────────────────────────────────────────────────────────────
  // MARKETING & GROWTH
  // ─────────────────────────────────────────────────────────────

  DIGITAL_MARKETING_SEO = "Digital Marketing & SEO",
  SEARCH_ENGINE_OPTIMIZATION = "Search Engine Optimization",
  PAID_SEARCH_SEM = "Paid Search & SEM",
  PROGRAMMATIC_DISPLAY_ADVERTISING = "Programmatic & Display Advertising",
  EMAIL_LIFECYCLE_MARKETING = "Email & Lifecycle Marketing",
  AFFILIATE_INFLUENCER_MARKETING = "Affiliate & Influencer Marketing",

  CONTENT_STRATEGY_COPYWRITING = "Content Strategy & Copywriting",
  LONG_FORM_CONTENT_BLOG_WRITING = "Long-Form Content & Blog Writing",
  UX_CONVERSION_COPYWRITING = "UX & Conversion Copywriting",
  VIDEO_PODCAST_CONTENT_CREATION = "Video & Podcast Content Creation",
  AI_ASSISTED_CONTENT_OPERATIONS = "AI-Assisted Content Operations",

  SOCIAL_MEDIA_MANAGEMENT = "Social Media Management",
  COMMUNITY_BUILDING_MANAGEMENT = "Community Building & Management",
  CREATOR_INFLUENCER_PARTNERSHIPS = "Creator & Influencer Partnerships",
  SOCIAL_COMMERCE = "Social Commerce",

  GROWTH_HACKING_CONVERSION_OPTIMIZATION = "Growth Hacking & Conversion Optimization",
  A_B_TESTING_EXPERIMENTATION = "A/B Testing & Experimentation",
  MARKETING_ANALYTICS_ATTRIBUTION = "Marketing Analytics & Attribution",
  PRODUCT_LED_GROWTH = "Product-Led Growth",

  PUBLIC_RELATIONS_BRAND_COMMUNICATIONS = "Public Relations & Brand Communications",
  CRISIS_COMMUNICATIONS = "Crisis Communications",
  EXECUTIVE_THOUGHT_LEADERSHIP = "Executive Thought Leadership",
  MEDIA_PRESS_RELATIONS = "Media & Press Relations",
  EVENT_CONFERENCE_MARKETING = "Event & Conference Marketing",

  BRAND_STRATEGY_POSITIONING = "Brand Strategy & Positioning",
  MARKET_RESEARCH_COMPETITIVE_INTELLIGENCE = "Market Research & Competitive Intelligence",
  PRODUCT_MARKETING = "Product Marketing",
  DEVELOPER_MARKETING = "Developer Marketing",

  // ─────────────────────────────────────────────────────────────
  // SALES & BUSINESS DEVELOPMENT
  // ─────────────────────────────────────────────────────────────

  ENTERPRISE_SALES_ACCOUNT_MANAGEMENT = "Enterprise Sales & Account Management",
  SMB_SALES = "SMB Sales",
  TECHNICAL_SOLUTIONS_SALES_ENGINEERING = "Technical Solutions & Sales Engineering",
  SAAS_SALES = "SaaS Sales",
  CHANNEL_PARTNER_SALES = "Channel & Partner Sales",

  BUSINESS_DEVELOPMENT_PARTNERSHIPS = "Business Development & Partnerships",
  STRATEGIC_ALLIANCES = "Strategic Alliances",
  ECOSYSTEM_PARTNER_MANAGEMENT = "Ecosystem & Partner Management",
  MARKET_EXPANSION_STRATEGY = "Market Expansion Strategy",

  CUSTOMER_ACQUISITION_REVENUE_OPERATIONS = "Customer Acquisition & Revenue Operations",
  SALES_ENABLEMENT = "Sales Enablement",
  CRM_ADMINISTRATION_STRATEGY = "CRM Administration & Strategy",
  DEMAND_GENERATION = "Demand Generation",
  PRICING_STRATEGY_MONETIZATION = "Pricing Strategy & Monetization",

  // ─────────────────────────────────────────────────────────────
  // FINANCE, ECONOMICS, & ANALYSIS
  // ─────────────────────────────────────────────────────────────

  FINANCIAL_ANALYSIS_ACCOUNTING = "Financial Analysis & Accounting",
  FINANCIAL_PLANNING_ANALYSIS_FPA = "Financial Planning & Analysis (FP&A)",
  CORPORATE_ACCOUNTING = "Corporate Accounting",
  TAX_STRATEGY_COMPLIANCE = "Tax Strategy & Compliance",
  TREASURY_CASH_MANAGEMENT = "Treasury & Cash Management",

  INVESTMENT_BANKING_ASSET_MANAGEMENT = "Investment Banking & Asset Management",
  VENTURE_CAPITAL_PRIVATE_EQUITY = "Venture Capital & Private Equity",
  EQUITY_CREDIT_RESEARCH = "Equity & Credit Research",
  WEALTH_MANAGEMENT_FINANCIAL_ADVISORY = "Wealth Management & Financial Advisory",
  MERGERS_ACQUISITIONS = "Mergers & Acquisitions",

  QUANTITATIVE_ANALYSIS_FINTECH = "Quantitative Analysis & FinTech",
  ALGORITHMIC_TRADING_STRATEGY = "Algorithmic Trading Strategy",
  CRYPTO_DIGITAL_ASSET_FINANCE = "Crypto & Digital Asset Finance",
  FINANCIAL_MODELING = "Financial Modeling",
  ACTUARIAL_SCIENCE = "Actuarial Science",

  RISK_MANAGEMENT_AUDITING = "Risk Management & Auditing",
  ENTERPRISE_RISK_MANAGEMENT = "Enterprise Risk Management",
  INTERNAL_AUDIT_CONTROLS = "Internal Audit & Controls",
  CREDIT_COUNTERPARTY_RISK = "Credit & Counterparty Risk",
  ESG_REPORTING_COMPLIANCE = "ESG Reporting & Compliance",

  ECONOMIC_POLICY_RESEARCH = "Economic Policy Research",
  REAL_ESTATE_FINANCE = "Real Estate Finance",
  INSURANCE_UNDERWRITING = "Insurance & Underwriting",

  // ─────────────────────────────────────────────────────────────
  // ENGINEERING (NON-SOFTWARE)
  // ─────────────────────────────────────────────────────────────

  MECHANICAL_ENGINEERING = "Mechanical Engineering",
  CAD_CAM_DESIGN = "CAD / CAM Design",
  THERMAL_FLUID_SYSTEMS_ENGINEERING = "Thermal & Fluid Systems Engineering",
  MANUFACTURING_PROCESS_ENGINEERING = "Manufacturing & Process Engineering",
  PRODUCT_DESIGN_ENGINEERING = "Product Design Engineering",

  ELECTRICAL_ELECTRONICS_ENGINEERING = "Electrical & Electronics Engineering",
  POWER_SYSTEMS_ENERGY_ENGINEERING = "Power Systems & Energy Engineering",
  RF_COMMUNICATIONS_ENGINEERING = "RF & Communications Engineering",
  PCB_HARDWARE_DESIGN = "PCB & Hardware Design",
  SIGNAL_IMAGE_PROCESSING = "Signal & Image Processing",
  FPGA_ASIC_DESIGN = "FPGA & ASIC Design",

  CIVIL_STRUCTURAL_ENGINEERING = "Civil & Structural Engineering",
  GEOTECHNICAL_ENGINEERING = "Geotechnical Engineering",
  TRANSPORTATION_INFRASTRUCTURE = "Transportation & Infrastructure",
  WATER_RESOURCES_ENGINEERING = "Water Resources Engineering",
  CONSTRUCTION_MANAGEMENT = "Construction Management",

  CHEMICAL_MATERIALS_ENGINEERING = "Chemical & Materials Engineering",
  PROCESS_PLANT_ENGINEERING = "Process & Plant Engineering",
  MATERIALS_SCIENCE_METALLURGY = "Materials Science & Metallurgy",
  POLYMER_COMPOSITE_ENGINEERING = "Polymer & Composite Engineering",

  AEROSPACE_HARDWARE_ENGINEERING = "Aerospace & Hardware Engineering",
  AVIONICS_FLIGHT_SYSTEMS = "Avionics & Flight Systems",
  PROPULSION_SYSTEMS = "Propulsion Systems",
  SYSTEMS_INTEGRATION_TESTING = "Systems Integration & Testing",

  NUCLEAR_ENERGY_ENGINEERING = "Nuclear Energy Engineering",
  RENEWABLE_ENERGY_ENGINEERING = "Renewable Energy Engineering",
  INDUSTRIAL_AUTOMATION_SCADA = "Industrial Automation & SCADA",

  // ─────────────────────────────────────────────────────────────
  // HEALTHCARE, LIFE SCIENCES, & RESEARCH
  // ─────────────────────────────────────────────────────────────

  MEDICINE_CLINICAL_HEALTHCARE = "Medicine & Clinical Healthcare",
  INTERNAL_MEDICINE_PRIMARY_CARE = "Internal Medicine & Primary Care",
  SURGERY_INTERVENTIONAL_MEDICINE = "Surgery & Interventional Medicine",
  NURSING_ALLIED_HEALTH = "Nursing & Allied Health",
  TELEMEDICINE_DIGITAL_HEALTH = "Telemedicine & Digital Health",
  MEDICAL_DEVICE_DEVELOPMENT = "Medical Device Development",
  HEALTH_INFORMATICS_EMR = "Health Informatics & EMR",
  HEALTHCARE_OPERATIONS_MANAGEMENT = "Healthcare Operations Management",
  PUBLIC_HEALTH_EPIDEMIOLOGY = "Public Health & Epidemiology",

  BIOTECHNOLOGY_LAB_RESEARCH = "Biotechnology & Lab Research",
  MOLECULAR_BIOLOGY_GENOMICS = "Molecular Biology & Genomics",
  SYNTHETIC_BIOLOGY = "Synthetic Biology",
  CELL_TISSUE_ENGINEERING = "Cell & Tissue Engineering",
  BIOINFORMATICS_COMPUTATIONAL_BIOLOGY = "Bioinformatics & Computational Biology",

  PHARMACEUTICALS = "Pharmaceuticals",
  DRUG_DISCOVERY_DEVELOPMENT = "Drug Discovery & Development",
  CLINICAL_TRIALS_REGULATORY_AFFAIRS = "Clinical Trials & Regulatory Affairs",
  PHARMACOLOGY_TOXICOLOGY = "Pharmacology & Toxicology",
  MEDICAL_AFFAIRS = "Medical Affairs",

  PSYCHOLOGY_MENTAL_HEALTH = "Psychology & Mental Health",
  CLINICAL_COUNSELING_PSYCHOLOGY = "Clinical & Counseling Psychology",
  BEHAVIORAL_COGNITIVE_SCIENCE = "Behavioral & Cognitive Science",
  NEUROSCIENCE_RESEARCH = "Neuroscience Research",
  ORGANIZATIONAL_INDUSTRIAL_PSYCHOLOGY = "Organizational & Industrial Psychology",

  ENVIRONMENTAL_SCIENCE_SUSTAINABILITY = "Environmental Science & Sustainability",
  CLIMATE_SCIENCE_POLICY = "Climate Science & Policy",
  ECOLOGICAL_CONSERVATION_BIOLOGY = "Ecological & Conservation Biology",
  ENVIRONMENTAL_IMPACT_ASSESSMENT = "Environmental Impact Assessment",
  CIRCULAR_ECONOMY_SUSTAINABILITY = "Circular Economy & Sustainability",

  NUTRITION_DIETETICS = "Nutrition & Dietetics",
  PHYSICAL_THERAPY_REHABILITATION = "Physical Therapy & Rehabilitation",
  VETERINARY_ANIMAL_SCIENCE = "Veterinary & Animal Science",

  // ─────────────────────────────────────────────────────────────
  // EDUCATION, WRITING, & HUMANITIES
  // ─────────────────────────────────────────────────────────────

  TEACHING_INSTRUCTIONAL_DESIGN = "Teaching & Instructional Design",
  CURRICULUM_DEVELOPMENT = "Curriculum Development",
  ELEARNING_PLATFORM_DEVELOPMENT = "eLearning Platform Development",
  HIGHER_EDUCATION_ACADEMIA = "Higher Education & Academia",
  CORPORATE_TRAINING_FACILITATION = "Corporate Training & Facilitation",
  STEM_EDUCATION = "STEM Education",
  EDTECH_PRODUCT_DEVELOPMENT = "EdTech Product Development",

  ACADEMIC_RESEARCH_WRITING = "Academic Research Writing",
  SCIENTIFIC_GRANT_WRITING = "Scientific & Grant Writing",
  PUBLISHING_EDITORIAL = "Publishing & Editorial",
  JOURNALISM_INVESTIGATIVE_REPORTING = "Journalism & Investigative Reporting",
  GHOSTWRITING_NARRATIVE_NONFICTION = "Ghostwriting & Narrative Nonfiction",
  CREATIVE_FICTION_WRITING = "Creative Fiction Writing",
  SPEECHWRITING = "Speechwriting",

  TRANSLATION_LINGUISTICS = "Translation & Linguistics",
  LOCALIZATION_INTERNATIONALIZATION = "Localization & Internationalization",
  COMPUTATIONAL_LINGUISTICS = "Computational Linguistics",
  SIGN_LANGUAGE_ACCESSIBILITY = "Sign Language & Accessibility",
  LANGUAGE_INSTRUCTION = "Language Instruction",

  PHILOSOPHY_ETHICS = "Philosophy & Ethics",
  HISTORY_ARCHIVAL_RESEARCH = "History & Archival Research",
  POLITICAL_SCIENCE_POLICY_ANALYSIS = "Political Science & Policy Analysis",
  SOCIOLOGY_ANTHROPOLOGY = "Sociology & Anthropology",

  // ─────────────────────────────────────────────────────────────
  // INTERPERSONAL & LEADERSHIP (SOFT SKILLS)
  // ─────────────────────────────────────────────────────────────

  EXECUTIVE_LEADERSHIP_MENTORSHIP = "Executive Leadership & Mentorship",
  GENERAL_MANAGEMENT = "General Management",
  BOARD_GOVERNANCE_ADVISORY = "Board Governance & Advisory",
  CHANGE_MANAGEMENT = "Change Management",
  STARTUP_FOUNDING_ENTREPRENEURSHIP = "Startup Founding & Entrepreneurship",

  CROSS_FUNCTIONAL_COLLABORATION = "Cross-Functional Collaboration",
  STAKEHOLDER_MANAGEMENT = "Stakeholder Management",
  REMOTE_DISTRIBUTED_TEAM_MANAGEMENT = "Remote & Distributed Team Management",
  MATRIX_ORGANIZATION_INFLUENCE = "Matrix Organization & Influence",

  CRITICAL_THINKING_PROBLEM_SOLVING = "Critical Thinking & Problem Solving",
  SYSTEMS_THINKING = "Systems Thinking",
  DATA_DRIVEN_DECISION_MAKING = "Data-Driven Decision Making",
  DESIGN_THINKING_INNOVATION = "Design Thinking & Innovation",
  FIRST_PRINCIPLES_REASONING = "First Principles Reasoning",

  NEGOTIATION_CONFLICT_RESOLUTION = "Negotiation & Conflict Resolution",
  EXECUTIVE_COMMUNICATION_PRESENTATION = "Executive Communication & Presentation",
  ACTIVE_LISTENING_FACILITATION = "Active Listening & Facilitation",
  COACHING_PERFORMANCE_MANAGEMENT = "Coaching & Performance Management",
  CULTURAL_INTELLIGENCE_GLOBAL_FLUENCY = "Cultural Intelligence & Global Fluency",
  EMOTIONAL_INTELLIGENCE = "Emotional Intelligence",
  WRITING_ASYNCHRONOUS_COMMUNICATION = "Writing & Asynchronous Communication",

  // ─────────────────────────────────────────────────────────────
  // CONSULTING & STRATEGY
  // ─────────────────────────────────────────────────────────────

  MANAGEMENT_CONSULTING = "Management Consulting",
  DIGITAL_TRANSFORMATION_CONSULTING = "Digital Transformation Consulting",
  IT_ENTERPRISE_ARCHITECTURE = "IT & Enterprise Architecture",
  BUSINESS_PROCESS_OUTSOURCING = "Business Process Outsourcing",
  DUE_DILIGENCE_ADVISORY = "Due Diligence & Advisory",
  STRATEGY_CORPORATE_DEVELOPMENT = "Strategy & Corporate Development",

  // ─────────────────────────────────────────────────────────────
  // RESEARCH & EMERGING FIELDS
  // ─────────────────────────────────────────────────────────────

  QUANTUM_COMPUTING_RESEARCH = "Quantum Computing Research",
  SPACE_TECHNOLOGY_RESEARCH = "Space Technology Research",
  NANOTECHNOLOGY_MATERIALS_RESEARCH = "Nanotechnology & Materials Research",
  LONGEVITY_AGING_RESEARCH = "Longevity & Aging Research",
  SYNTHETIC_MEDIA_DEEPFAKE_RESEARCH = "Synthetic Media & Deepfake Research",
  ETHICS_AI_POLICY_RESEARCH = "Ethics & AI Policy Research",
}

/**
 * Converts a SkillCategory enum key (e.g. "FRONTEND_DEVELOPMENT")
 * or enum value (e.g. SkillCategory.FRONTEND_DEVELOPMENT) to its
 * human-readable label (e.g. "Frontend Development").
 *
 * Accepts both the raw string key and the enum member itself,
 * since after the remodel the enum value IS the label.
 */
export function toSkillLabel(
  skill: SkillCategory | keyof typeof SkillCategory,
): string {
  // If passed a key string like "FRONTEND_DEVELOPMENT", look it up.
  if (typeof skill === "string" && skill in SkillCategory) {
    return SkillCategory[skill as keyof typeof SkillCategory];
  }
  // If passed the enum value directly (which is already the label), return it.
  return skill as string;
}
