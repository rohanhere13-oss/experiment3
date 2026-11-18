from .models import KnowledgeEntry

SEEDS = [
    # GENERAL
    {
        "category": "general",
        "title": "About Riverview College - Overview & Heritage",
        "tags": "about, history, overview, ranking, established, accreditation, riverview",
        "content": (
            "Riverview College was established in 1968 and has grown into a world-class premier institution "
            "dedicated to academic rigor, innovation, and character development. Located in the picturesque "
            "Riverview Valley on a sprawling 120-acre lush green campus, the college is accredited with NAAC A++ "
            "and its engineering programs are ABET accredited. Riverview is ranked among the Top 20 National Universities "
            "for academic excellence and graduate employability. Motto: 'Learn Today, Lead Tomorrow'."
        )
    },
    {
        "category": "general",
        "title": "Campus Location & Environment",
        "tags": "location, address, campus, valley, map, directions",
        "content": (
            "Riverview College is situated at 100 University Boulevard, Riverview Valley, Riverside Campus - 560098. "
            "The campus features eco-friendly solar-powered buildings, pedestrian walkways, heritage clock tower, "
            "lush gardens, and state-of-the-art academic complexes overlooking the scenic Riverview river."
        )
    },

    # ACADEMICS & DEPARTMENTS
    {
        "category": "academics",
        "title": "Academic Schools & Structure",
        "tags": "schools, faculties, departments, academics, divisions",
        "content": (
            "Riverview College operates four distinguished academic schools:\n"
            "1. School of Computing & Artificial Intelligence (Departments: CSE, AI & Data Science, Cybersecurity)\n"
            "2. School of Engineering & Technology (Departments: ECE, Mechanical & Mechatronics, Civil Engineering)\n"
            "3. School of Business & Analytics (Departments: Global Business, Financial Analytics, Marketing)\n"
            "4. School of Humanities, Media & Design (Departments: Digital Media & Journalism, Design Studies, Psychology)."
        )
    },

    # COURSES
    {
        "category": "courses",
        "title": "B.Tech in Computer Science & Engineering (CSE)",
        "tags": "cse, computer science, btech cse, software, ai, coding, degree, engineering",
        "content": (
            "B.Tech in Computer Science & Engineering (CSE) is a 4-year (8 semesters) flagship undergraduate degree.\n"
            "• Seats: 180 seats\n"
            "• Specializations: Artificial Intelligence & Machine Learning, Cloud Computing, Cybersecurity, Full-Stack Software Engineering.\n"
            "• Curriculum highlights: Data Structures & Algorithms, Operating Systems, Distributed Systems, Deep Learning, Cloud Architecture, and a 6-month capstone industry internship.\n"
            "• Labs: NVIDIA AI Compute Cluster Lab, Google Cloud Innovation Lab, Open-Source Software Studio."
        )
    },
    {
        "category": "courses",
        "title": "B.Tech in Electronics & Communication Engineering (ECE)",
        "tags": "ece, electronics, communication, vlsi, embedded, iot, robotics, engineering",
        "content": (
            "B.Tech in Electronics & Communication Engineering (ECE) is a 4-year undergraduate degree.\n"
            "• Seats: 120 seats\n"
            "• Specializations: VLSI Design & Microelectronics, IoT & Embedded Systems, Robotics & Autonomous Systems, 5G/6G Wireless Networks.\n"
            "• Highlights: Hands-on chip design using Cadence & Synopsys tools, drone fabrication studio, and industry partnership with Texas Instruments."
        )
    },
    {
        "category": "courses",
        "title": "B.Tech in Mechanical & Mechatronics Engineering",
        "tags": "mechanical, mechatronics, robotics, automotive, manufacturing, btech",
        "content": (
            "B.Tech in Mechanical & Mechatronics Engineering is a 4-year program combining classical mechanical principles with modern robotics and automation.\n"
            "• Seats: 90 seats\n"
            "• Specializations: Electric Vehicles & Smart Mobility, Autonomous Robotics, Additive Manufacturing & 3D Printing.\n"
            "• Highlights: Formula Student Racing Team workshop, CNC machining center, and wind-tunnel testing facility."
        )
    },
    {
        "category": "courses",
        "title": "B.Sc in Data Science & Artificial Intelligence",
        "tags": "bsc, data science, ai, statistics, machine learning, analytics, math",
        "content": (
            "B.Sc in Data Science & Artificial Intelligence is a 3-year (with optional 4th year research honors) degree.\n"
            "• Seats: 60 seats\n"
            "• Focus: Statistical modeling, Predictive Analytics, Natural Language Processing, Computer Vision, Big Data Engineering.\n"
            "• Career Pathways: Data Scientist, Machine Learning Engineer, Business Intelligence Analyst, Quantitative Researcher."
        )
    },
    {
        "category": "courses",
        "title": "Bachelor of Business Administration (BBA)",
        "tags": "bba, business, management, finance, marketing, analytics",
        "content": (
            "Bachelor of Business Administration (BBA) is a 3-year management program emphasizing modern digital enterprise and entrepreneurship.\n"
            "• Seats: 120 seats\n"
            "• Specializations: Global Business Management, FinTech & Investment Analysis, Digital Marketing & E-Commerce, Entrepreneurship & Innovation.\n"
            "• Features: Mandatory summer corporate internships, Riverview Startup Incubator immersion, Harvard Business School case-study method."
        )
    },
    {
        "category": "courses",
        "title": "Master of Business Administration (MBA)",
        "tags": "mba, post graduate, pg, management, business school, master",
        "content": (
            "MBA at Riverview College is a 2-year premier postgraduate program accredited by international business education councils.\n"
            "• Seats: 90 seats\n"
            "• Concentrations: Technology Management, Strategic Finance & Venture Capital, Supply Chain & AI Analytics, Product Management.\n"
            "• Placement highlights: 100% placement rate for MBA graduates with an average salary of $16,500 (₹14.5 LPA)."
        )
    },
    {
        "category": "courses",
        "title": "M.Tech in Artificial Intelligence & Robotics",
        "tags": "mtech, masters, pg, artificial intelligence, robotics, deep learning",
        "content": (
            "M.Tech in AI & Robotics is a 2-year advanced postgraduate degree focusing on cutting-edge research, autonomous mobile robots, reinforcement learning, and humanoid control."
        )
    },

    # ELIGIBILITY & ADMISSIONS
    {
        "category": "eligibility",
        "title": "Undergraduate Eligibility Criteria",
        "tags": "eligibility, criteria, requirements, percentage, marks, 10+2, entrance exam",
        "content": (
            "Undergraduate Admission Eligibility Requirements:\n"
            "1. B.Tech (CSE, ECE, Mechanical):\n"
            "   • Completion of 10+2 or equivalent with Physics, Mathematics, and Chemistry/Computer Science.\n"
            "   • Minimum aggregate score of 60% (55% for SC/ST/PwD categories).\n"
            "   • Valid score in Riverview Scholastic Aptitude Test (RSAT) OR JEE Main (Percentile > 80 preferred).\n\n"
            "2. B.Sc Data Science & AI:\n"
            "   • 10+2 with Mathematics/Statistics with minimum 55% aggregate.\n\n"
            "3. BBA Program:\n"
            "   • 10+2 from any recognized board in any stream (Science, Commerce, Arts) with minimum 55% marks + Personal Interview."
        )
    },
    {
        "category": "admissions",
        "title": "Admission Process & Important Deadlines (2025-2026)",
        "tags": "admissions, apply, process, deadlines, dates, application form, fees",
        "content": (
            "Riverview College Admission Steps:\n"
            "1. Online Application: Fill out the application form on the official portal (riverview.edu/apply).\n"
            "2. Document Submission: Upload 10th and 12th grade mark sheets, entrance scorecard, and ID proof.\n"
            "3. Entrance Exam / Interview: Appear for RSAT (conducted online) or submit JEE/SAT/CAT scores.\n"
            "4. Provisional Offer: Merit lists published online; provisional admission letter sent via email.\n"
            "5. Fee Payment & Seat Confirmation: Pay the initial registration deposit to confirm your admission.\n\n"
            "Key Deadlines:\n"
            "• Fall 2025 Priority Deadline: May 31, 2025\n"
            "• Fall 2025 Regular Admissions Deadline: June 30, 2025\n"
            "• Orientation & Commencement: August 18, 2025\n"
            "• Application Fee: $65 (INR 1,200), non-refundable."
        )
    },

    # FEES
    {
        "category": "fees",
        "title": "Annual Fee Structure (Academic Year 2025-2026)",
        "tags": "fees, tuition, cost, fee structure, expenses, installment",
        "content": (
            "Annual Tuition Fee Structure:\n"
            "• B.Tech in CSE / AI: $4,500 / ₹2,40,000 per year\n"
            "• B.Tech in ECE / Mechatronics: $4,000 / ₹2,10,000 per year\n"
            "• B.Sc in Data Science & AI: $3,200 / ₹1,60,000 per year\n"
            "• BBA (Global Business & Analytics): $3,500 / ₹1,80,000 per year\n"
            "• MBA: $5,200 / ₹2,80,000 per year\n"
            "• M.Tech (AI & Robotics / VLSI): $4,200 / ₹2,20,000 per year\n\n"
            "Payment Options: Fees can be paid in two equal semester installments. Zero-interest education loan assistance is available through our banking partners."
        )
    },
    {
        "category": "fees",
        "title": "Hostel and Accommodation Fees",
        "tags": "hostel fees, accommodation, mess, room rent, food charges, living cost",
        "content": (
            "Hostel and Dining Fee Structure (Per Academic Year):\n"
            "• Double Sharing AC Room: $1,400 / ₹95,000 per year\n"
            "• Double Sharing Non-AC Room: $1,100 / ₹75,000 per year\n"
            "• Single AC Room (Final Year & PG students only): $1,800 / ₹1,20,000 per year\n\n"
            "All hostel packages include 4 nutritious meals/day (breakfast, lunch, evening snacks, dinner), 24/7 high-speed Wi-Fi, laundry facilities, housekeeping, and access to campus fitness centers."
        )
    },

    # SCHOLARSHIPS
    {
        "category": "scholarships",
        "title": "Scholarships & Financial Aid Programs",
        "tags": "scholarship, financial aid, concession, merit, waiver, grant",
        "content": (
            "Riverview College believes financial constraints should never hinder talent. We award over $1.5M in scholarships annually:\n"
            "1. Chancellor's 100% Merit Scholarship: Full tuition fee waiver for students ranking in top 1% of the Riverview Scholastic Aptitude Test (RSAT) or JEE Main AIR < 10,000.\n"
            "2. Dean's 50% Excellence Award: 50% tuition waiver for students securing >92% in 10+2 examinations.\n"
            "3. Women in STEM Fellowship: 35% tuition grant for female students enrolling in engineering and computing programs.\n"
            "4. Sports & Cultural Talent Grant: Up to 50% fee concession for state and national medalists.\n"
            "5. Need-Based Economic Aid: Up to 75% fee support for students with annual household income under $5,000 (INR 4 LPA)."
        )
    },

    # PLACEMENTS
    {
        "category": "placements",
        "title": "Placements & Career Success Statistics",
        "tags": "placements, jobs, salary, package, recruiters, companies, highest package, career",
        "content": (
            "Riverview College maintains an outstanding 96.8% campus placement rate.\n"
            "• Highest International Package: $68,000 (INR 54 LPA) offered by a leading multinational tech giant.\n"
            "• Average CSE & ECE Package: $12,500 (INR 11.2 LPA).\n"
            "• Overall College Average Package: $9,800 (INR 8.6 LPA).\n"
            "• Top Recruiters: Google, Microsoft, Amazon, Cisco, Infosys, Deloitte, JP Morgan Chase, Texas Instruments, Cognizant, Tata Consultancy Services, Qualcomm, and Accenture.\n"
            "• Career Support: The Department of Career Advancement provides mock technical interviews, algorithmic coding training, resume clinics, and campus internship fairs starting from Year 2."
        )
    },

    # FACILITIES
    {
        "category": "facilities",
        "title": "Campus Facilities, Labs & Infrastructure",
        "tags": "facilities, library, labs, sports, gym, swimming pool, infrastructure, internet, wifi",
        "content": (
            "Riverview College boasts world-class infrastructure:\n"
            "• Central Library: 5-storey modern facility housing 120,000+ volumes, 500+ print journals, 24/7 quiet study zones, multimedia rooms, and access to IEEE, ACM, Springer, and JSTOR.\n"
            "• Research Centers: 8 cutting-edge labs including the NVIDIA GPU Supercomputing Center, IoT & Smart Grid Lab, Autonomous Robotics Arena, and Bio-Tech Innovation Center.\n"
            "• Sports & Fitness: Olympic-sized swimming pool, indoor wooden badminton courts, basketball and tennis courts, full-size football turf, athletic running track, and modern fitness center.\n"
            "• Dining: 4 multi-cuisine cafeterias providing organic, hygienic, and nutritious meals with dietary options.\n"
            "• Healthcare: 24/7 on-campus health clinic with resident physicians, emergency nurses, and dedicated ambulance service."
        )
    },
    {
        "category": "facilities",
        "title": "Hostel Life & Student Residences",
        "tags": "hostel, dorms, rooms, residence, campus living, curfew, safety",
        "content": (
            "Riverview has 6 residential halls (3 for men, 3 for women) located within walking distance of academic blocks.\n"
            "Features include:\n"
            "• Comfortable furnished rooms with study desks, ergonomic chairs, wardrobes, and high-speed Wi-Fi.\n"
            "• Recreation lounges equipped with table tennis, chess, television, and collaborative project rooms.\n"
            "• 24/7 CCTV surveillance, biometric access, and resident wardens ensuring absolute student safety.\n"
            "• Campus curfew for residential students is 10:00 PM."
        )
    },

    # EVENTS & NEWS
    {
        "category": "events",
        "title": "Riverview College Commencement 2025",
        "tags": "news, commencement, graduation, ceremony, event, 2025",
        "content": (
            "Riverview College Commencement 2025 will be held on May 20, 2025 at the Grand Auditorium. "
            "Over 1,200 graduating seniors from the Class of 2025 will receive their degrees. "
            "The keynote address will be delivered by acclaimed technologist and Riverview alumnus Dr. Elena Vance."
        )
    },
    {
        "category": "events",
        "title": "New Research Center Launches on Campus",
        "tags": "news, research center, launch, innovation, grant, lab",
        "content": (
            "On May 15, 2025, Riverview College officially inaugurated its state-of-the-art $5 Million Advanced Computing "
            "and Clean Energy Research Center. The facility will spearhead collaborative industry-sponsored research in "
            "next-generation AI architectures and renewable energy storage."
        )
    },
    {
        "category": "events",
        "title": "Spring Festival Brings Campus Together",
        "tags": "news, festival, spring fest, cultural, music, dance, campus life",
        "content": (
            "Held from May 10, 2025, Riverview College's annual cultural celebration 'Riverview Fest 2025' brought "
            "together over 5,000 students from 40 colleges across the country. The 3-day extravaganza featured music battles, "
            "theatre showcases, dance performances, hackathons, and food festivals."
        )
    },

    # RULES & POLICIES
    {
        "category": "rules",
        "title": "Campus Policies, Code of Conduct & Anti-Ragging",
        "tags": "rules, code of conduct, attendance, policy, ragging, discipline",
        "content": (
            "Riverview College enforces strict standards for academic honesty and student welfare:\n"
            "• Attendance Policy: Minimum 75% attendance in lectures and practical sessions is mandatory to appear for semester end examinations.\n"
            "• Anti-Ragging Policy: Zero-tolerance policy towards ragging or harassment of any form. Violations result in immediate expulsion and legal reporting under National Anti-Ragging regulations.\n"
            "• Green Campus Initiative: Single-use plastics are banned across campus. Electric shuttles and bicycles are available for student commuting.\n"
            "• Hostel Curfew: 10:00 PM for all residential students."
        )
    },

    # CONTACT
    {
        "category": "contact",
        "title": "Contact Details & Office Directory",
        "tags": "contact, phone, email, office, admissions office, helpline, address",
        "content": (
            "Riverview College Contact Directory:\n"
            "• Admissions Helpline: +1 (800) 555-RIVER / +91 (80) 2856-7890\n"
            "• Admissions Email: admissions@riverview.edu\n"
            "• General Inquiries: info@riverview.edu\n"
            "• Campus Address: 100 University Boulevard, Riverview Valley, Riverside Campus - 560098\n"
            "• Office Working Hours: Monday - Friday: 9:00 AM – 5:00 PM; Saturday: 9:00 AM – 1:00 PM; Sunday: Closed."
        )
    },

    # FAQS
    {
        "category": "faqs",
        "title": "Frequently Asked Questions (Admissions & Campus)",
        "tags": "faq, questions, help, campus tour, transfer, hostel booking",
        "content": (
            "Frequently Asked Questions:\n"
            "1. Can I schedule an in-person campus tour?\n"
            "   Yes! Campus tours are conducted every Monday, Wednesday, and Friday at 10:30 AM and 2:30 PM. Register on riverview.edu/visit-campus.\n\n"
            "2. Is hostel accommodation guaranteed for incoming first-year students?\n"
            "   Yes, guaranteed hostel accommodation is reserved for all out-of-town first-year undergraduate and graduate students who apply by the priority deadline.\n\n"
            "3. Are scholarships renewable every year?\n"
            "   Yes, merit scholarships are renewed annually provided the student maintains a minimum Cumulative GPA (CGPA) of 8.0/10 with no backlogs.\n\n"
            "4. What student clubs exist at Riverview?\n"
            "   Over 30 student-led clubs operate actively, including Google Developer Student Club (GDSC), Riverview Robotics Guild, Thespians Drama Society, Eco-Warriors, FinTech & Trading Club, and Photography Circle."
        )
    }
]

def run_seed():
    """Populates the database with Riverview College knowledge entries."""
    created_count = 0
    updated_count = 0

    for item in SEEDS:
        obj, created = KnowledgeEntry.objects.update_or_create(
            title=item["title"],
            defaults={
                "category": item["category"],
                "tags": item["tags"],
                "content": item["content"],
                "status": "published",
            }
        )
        if created:
            created_count += 1
        else:
            updated_count += 1

    return created_count, updated_count
