[Business Requirement Document]

Recovery Management System (Field Agent, Telecaller, Supervisor Modules)


Data Intake & Enrichment Process

Objective
Get account data from the bank website, enrich it with extra info (from the bank’s web portal or manual entry), and produce a final file for upload into the recovery management system.
________________________________________
 Steps Overview

 1. Log into Bank Website (Manual or Bot-Assisted)
●	User visits the Bank portal
●	Authenticates with provided login ID, password, and IP-allowed network
●	Navigates to the file download section
●	Downloads daily file (Excel/CSV with account details)

 2. Enrich the Data with Extra Fields
(using web scraping bot or manual entry until bot is implemented)
●	Open each account in the bank portal:

○	Fetch additional account attributes like: - NOT FINAL … it will decided by admin 

■	Customer address landmarks
■	Office address
■	Latest status or notes
■	Bucket / DPD details
■	Contact numbers
■	Any legal status

○	Fetch any other required columns

●	Append this info to the file:

○	Either manually into an Excel template
○	Or using an automation bot to add columns programmatically

 3. Generate Updated File
●	Take the original file downloaded
●	Merge new columns into it as per standard format
●	Save as Updated Input File for your recovery system

 4. Upload to Recovery Management System
●	Login to your Recovery Management System
●	Navigate to the File Upload section
●	Upload the updated file (with all required columns)
●	Preview the data mapping & verify new columns present
●	Click Merge & Import to assign cases into system

 5. Automating the Steps (Future Roadmap)
When ready to implement the Bot/AI Agent:
●	Develop a web automation bot using RPA tools (e.g. Python Selenium, UiPath)

●	Steps the bot will do:

1.	Login to Bank portal
2.	Download latest file automatically
3.	Iterate each account on the portal to scrape extra info
4.	Generate the final updated file
5.	Post file to recovery system's API or upload interface

●	Schedule bot to run daily at a fixed time







Recovery Management System – Final Module List
________________________________________
🔐 1. User Access & Role Management
·        Multi-role login: Admin, Supervisor, Telecaller, Field Agent (FOS)
·        Password + OTP reset
·        Role-based access permissions
·        Region/Area-based user mapping
📁 2. Bank File Upload & Case Intake
·        Upload Excel file (manual from bank site)
·        File validation & mapping to master schema
·        Bank & billing cycle tagging
·        Log of upload date/time/user/file name
·        Preview, approval, and merge
·         Audit trail
🏦 3. Bank & Billing Cycle Management
·        Add/manage multiple banks & agency contracts
·        Define new billing cycles (e.g., "June 2025")
·        Close/archive old cycles
·        Assign uploaded files to cycle
·        Commission settings per bank/bucket
👤 4. Customer Case Management
·        Master record of all recovery cases (customers)
·        Bucket-based case classification (DPD)
·        Assign case to Telecaller/FOS
·        Reassignment & history tracking
·        View payment status, recovery amount, remarks
·        Tags: New, Old, Encash, CONS/NON-CONS, LM STATUS
☎️ 5. Telecaller Dashboard & Follow-Up
·        View assigned case list
·        Add follow-up remarks (with shortcode tagging)
·        Set next follow-up date
·        Forward to FOS (physical visit request)
·        PTP (Promise to Pay) tracking
·        Follow-up status filter
·        Daily follow-up list & missed alerts
🚶 6. Field Agent (FOS) Mobile App
·        Offline-first capability
·        View today's visits (case list)
·        Map-based navigation
·        Start/end visit (GPS logged)
·        Upload proof of visit (photo, signature, payment)
·        Enter payment collection info
·        Sync data when online
·        Notifications: new case, flagged case
💸 7. Payment & Collection Tracking
·        Log of collected payments per customer
·        Mode: Cash, UPI, Cheque, Bank
·        Upload payment proof
·        Admin/staff verification required
·        Payment status reflected in customer case
🎯 8. Commission Tracking (Admin Only)
·        Case-wise commission % (based on bucket, timing)
·        Actual vs expected recovery
·        Total earned commission per case/cycle
·        “Highest ROI” case sorting
·        Insights for focus bucket strategy
🧾 9. Stabilization Fund Management
·        Internal funding log (RF STAB, DF STAB)
·        Who approved, how much, when
·        Linked to customer case
·        Reversal or reimbursement control
·        Track target achievement via stabilization
📈 10. Reporting & Analytics
·        Daily case summary (assigned, resolved, paid)
·        Agent-wise performance (telecaller + FOS)
·        Collection reports (date/bucket/agent-wise)
·        Follow-up compliance reports
·        Commission earned & due
·        Cycle closure summaries

🔁 11. Short Code & Master Configuration
·        Define/modify shortcodes (status, remarks)
·        Master list for areas, zones, agents
·        Tagging logic: CONS/NON-CONS, ENCASH
·        Map FOS to Area/Region/City

🔔 12. Notifications & Alerts
·        Case assignment alerts (Telecaller, FOS)
·        Follow-up reminders
·        Escalation alerts (missed, nearing deadline)
·        Admin-level dashboard notifications

🔒 13. System Logs & Audit Trail
·        Who uploaded what, when
·        Case status change logs
·        Assignment history
·        Manual overrides tracked
·        Download activity & file change trail
 


1. Admin / Manager
🔹 Actions:
1.     Login to Admin panel
2.     Upload Excel file from bank (per bank, per billing cycle)
3.     Preview + validate data (match fields, check duplicates)
4.     Approve to merge — only active cases override existing ones
5.     Assign users:
o   Assign cases to Telecaller
o   Assign FOS to Area/Region
6.     Define:
o   Buckets (DPD ranges)
o   Commission % by bucket
o   Shortcodes & status labels
o   Billing cycle timeframes
7.     View:
o   Case performance (Resolved, PTP, Skip)
o   Staff performance
o   Commission insights
o   Daily reports
✅ Conditions:
·        No auto-merge; manual approval required
·        Can override case only if within deadline
·        Reassignment allowed only manually
 
2. Telecaller
🔹 Actions:
1.	Login to web panel
2.	View assigned case list
3.	Make phone calls to customers
4.	Log follow-up:
○	Use shortcodes for remarks (PTP, Flow, Skip, Dispute)
○	Set next follow-up date
5.	Mark case for FOS visit if physical follow-up is required
6.	View daily follow-up schedule
✅ Conditions:
●	Cannot see bank info unless Admin allows
●	Cannot reassign cases
●	Cannot edit past remarks
●	Can only log remarks and forward to FOS
________________________________________
🚶 3. Field Agent (FOS)
🔹 Actions (via mobile app):
1.	Login to app (offline enabled)
2.	View today’s visit list
3.	Navigate to customer using map
4.	Tap “Start Visit” → GPS logged
5.	At customer site:
○	Add remarks
○	Mark status (Paid / PTP / Not Available)
○	Collect payment (Cash/UPI/Cheque)
○	Upload proof (photo or receipt)
6.	Tap “End Visit” → GPS logged
7.	Sync data when online
✅ Conditions:
●	Works offline, syncs later
●	Cannot access unassigned cases
●	Cannot modify Telecaller remarks
●	Visit logs tracked by GPS
________________________________________
🧑‍🏫 4. Supervisor (Optional Role)
🔹 Actions:
1.	View all cases by region/team
2.	Monitor daily follow-up and visit status
3.	Reassign agents manually if needed
4.	Track agent location & performance
5.	Escalate non-responsive cases
6.	View reports: daily, agent-wise, region-wise
________________________________________
💰 5. Commission System
Auto-tracked by system:
●	Commission % per case is based on:
○	Recovery Bucket
○	Recovery Deadline
○	Payment amount
●	Shown only to Admin
●	Sorted by highest earning potential
●	Special logic for Stabilized accounts (RF/DF STAB)
________________________________________
📑 6. Stabilization Funding (Admin Only)
🔹 Actions:
1.	View underperforming case
2.	Add internal fund support (RF STAB or DF STAB)
3.	Enter:
○	Fund amount
○	Date
○	Funded by
4.	Case gets marked in LM STATUS
5.	Recovered money can be reversed manually
✅ Conditions:
●	Only Admin/Manager can fund
●	All stabilization funding must be logged
 
Sub-Agency Management – Feature List
________________________________________
👑 1. Super Admin Features
🔹 Sub-Agency Setup & Control
·        Add/Edit/Delete Sub-Agencies
·        Assign region(s)/area(s) to Sub-Agency
·        Define commission % split (Sub-Agency share vs FOS share)
·        Add Sub-Agency Admin (user)
·        Limit how many FOS a Sub-Agency can have
🔹 Case Management
·        Assign specific cases to a Sub-Agency
·        Or allow Sub-Agency to pull unassigned cases from a pool
·        Transfer cases from Sub-Agency back to internal team
🔹 Monitoring
·        View cases by:
o   Sub-Agency
o   Sub-FOS
o   Region / Zone
·        Recovery reports: amount collected, pending, skipped
·        Performance comparison between Sub-Agencies
·        View payment status (verified/unverified)
🔹 Commission & Payout
·        Define:
o   Commission per bucket
o   Sub-agency share
o   FOS share
·        View earned commission per case, FOS, agency
·        Generate Sub-Agency payout report
·        Approve/reject commission release
________________________________________
🧑‍💼 2. Sub-Agency Admin Features
🔹 Dashboard & Overview
·        View only assigned accounts (given by Super Admin)
·        See assigned recovery target (if set)
·        Track active/inactive Sub-FOS
🔹 FOS Management (Internal)
·        Add/edit/delete Sub-FOS under the agency
·        Assign cases to their own FOS team
·        View daily visit status, GPS logs, follow-up remarks
·        Reset password / manage FOS users
🔹 Case Operations
·        View customer details, status, history
·        Update internal remarks
·        Forward case to their FOS
🔹 Reporting
·        Sub-FOS performance (visit %, collection %)
·        Case-wise payment collection history
·        Commission dashboard (read-only for their share)
·        Monthly recovery log for review
________________________________________
🚶‍♂️ 3. Sub-FOS Features (Mobile App)
(Same as your internal FOS, but data limited to Sub-Agency scope)
·        Login, view assigned cases
·        Daily visit route
·        Start/end visit with GPS
·        Add visit remark / follow-up
·        Upload payment collection proof
·        Offline sync
·        Notification for new cases
________________________________________
📊 4. Reporting & Commission Insights (New Reports)
🔸 Super Admin Panel
·        Sub-Agency-wise recovery chart
·        Commission breakdown:
o   Total earned
o   Sub-FOS share
o   Sub-Agency share
·        Overdue vs active case count
·        Target vs Achieved (by Sub-Agency)
🔸 Export Options
·        CSV, PDF, XLS reports
·        Filters by bucket, deadline, status
________________________________________
🔒 5. Permissions & Controls
Function	Super Admin	Sub-Agency Admin
Case assignment	✅	✅ (within allowed pool)
Add/edit users	✅	✅ (FOS only)
View collections	✅	✅
Edit payment status	✅	❌
Commission setup	✅	❌ (read-only)
Case deletion	✅	❌
________________________________________
⚙️ 6. Settings / Configuration
·        Auto-expiry cases for Sub-Agencies
·        Enable/disable Sub-Agency FOS from adding remarks
·        Restrict region visibility
·        Define per-case bonus (on performance)
 

Recovery Management System – Super Admin Panel: Final Feature List
________________________________________
🔐 1. User Management
·        Add/edit/delete:
o   Internal FOS
o   Telecallers
o   Supervisors
o   Sub-Agency Admins
o   Sub-Agency FOS
·        Assign roles, permissions, access region/zone
·        Reset password, lock/unlock account
·        Activity logs: login, updates, reassignments
________________________________________
📁 2. Bank File Upload & Merge Management
·        Upload Excel files (one per bank/cycle/day)
·        Validate data fields (mandatory columns check)
·        Preview sheet → approve for merge
·        Merge logic:
o   Overwrite only active, deadline-valid cases
o   Maintain upload log with user/date/time
·        File Logs with filters by Bank / Cycle / Date
·        Revert or re-download past uploads
________________________________________
🏦 3. Bank & Billing Cycle Setup
·        Add/edit banks (name, code, contact, terms)
·        Start/close a billing cycle (e.g. “July-2025”)
·        Map uploaded files to billing cycles
·        Lock expired cycles
·        View bank-wise reports
________________________________________
👤 4. Customer Case Management
·        View full list of all customer accounts
·        Search/filter by:
o   Account no, phone, DPD, zone, bucket, agency
·        View all details:
o   Address, deadline, DPD, follow-up, payment, LM STATUS
·        Tags/flags:
o   NEW/OLD
o   CONS/NON CONS
o   ENCASH
o   STABILIZED (RF/DF)
·        View assignment history
·        Assign/reassign cases to:
o   Telecaller
o   Internal FOS
o   Sub-agency
·        Lock/close resolved or expired cases
________________________________________
☎️ 5. Telecaller Oversight
·        Assign batch of accounts
·        View call logs, follow-up notes
·        View/override shortcodes
·        Track missed follow-ups
·        Reassign case if inactivity
·        Telecaller performance report (% resolved, PTP, no response)
________________________________________
🚶 6. FOS (Field Agent) Oversight
·        View FOS assigned region/area
·        Assign cases manually or by zone
·        Reassign or pull cases back
·        Monitor visits:
o   GPS entry/exit
o   Visit status
o   Proof (photo, signature)
·        Collection verification
·        FOS performance dashboard
________________________________________
🧾 7. Collection Management
·        View collection logs:
o   Mode: Cash / UPI / Cheque / Bank
o   Date, time, FOS, case, amount
·        Approve/reject pending collections
·        Track unverified payments
·        Search by bank, region, FOS, Sub-agency
________________________________________
💸 8. Commission Management
·        Define commission slabs per bucket (auto apply)
·        Assign payout split between:
o   FOS
o   Sub-Agency
·        View commission earned:
o   Per case, per user, per agency
·        Generate payout report
·        Approve/hold commissions manually
________________________________________
🧠 9. Stabilization Funding (RF/DF STAB)
·        Manually mark funded cases
·        Log amount, date, funded by
·        View total stabilization value
·        Compare impact on target achievement
·        Reverse if needed
________________________________________
🏢 10. Sub-Agency Management
·        Add/edit/delete sub-agencies
·        Assign region or area
·        Assign cases
·        Add/edit Sub-Agency Admins
·        View:
o   Sub-Agency recovery
o   FOS under each agency
·        Set and track Sub-Agency targets
·        Auto split commissions
________________________________________
📊 11. Reports & Dashboard Analytics
·        Daily Overview:
o   Cases added / resolved / in follow-up
·        Cycle-wise recovery report
·        Payment Report (verified/unverified)
·        FOS Performance Leaderboard
·        Telecaller Follow-up Effectiveness
·        Sub-Agency Comparison Report
·        Commission Outstanding Report
·        Bucket-wise resolution trends
________________________________________
🔁 12. Short Code / Status Management
·        Add/edit/delete:
o   Follow-up shortcodes
o   LM STATUS codes
o   Payment status codes
·        Define what’s visible to:
o   Telecaller
o   FOS
o   Sub-Agency
________________________________________
🗺️ 13. Zone / Region / Area Master
·        Add/edit:
o   Zones
o   Regions
o   Areas
o   Pincode/landmark mapping
·        Map agents to areas
·        Area assignment logic (manual/auto)
________________________________________
🔔 14. Notifications & Alerts
·        Case assignment alerts (to Telecaller/FOS)
·        Follow-up reminders (before deadlines)
·        Missed action alerts (no visit / no follow-up)
·        Daily summary to Admin
·        In-app + email alerts
________________________________________
🧾 15. Audit Trail & Security
·        Log:
o   Login activity
o   Case assignments
o   Upload & merge activity
o   Payments marked
o   Commission approvals
·        IP & device-based access log
·        File download history
________________________________________
⚙️ 16. Global Settings
·        Upload file template mapping
·        Timezone & currency
·        Payment gateway (if collecting online)
·        SMS/email setup (optional)
·        Enable/disable modules:
o   Stabilization
o   Sub-agency
o   Collection modes
________________________________________
✨ BONUS: Optional Features
·        Live case tracking map (FOS plotted on map)
·        Integration with voice/IVR for Telecaller logs
·        Agent attendance
·        WhatsApp follow-up integration
·        Digital receipt generation for customer
 
FOS App – Complete Screen List
#	Screen Name	Description
1	Login	Secure login using mobile/email + password (supports offline cache)
2	Forgot Password / OTP Login (optional)	OTP-based recovery (if enabled by Admin)
3	Home Dashboard	Summary of assigned cases, completed visits, amount collected, pending follow-ups
4	Start Day / End Day (optional)	Mark attendance, log start & end of day with GPS timestamp
5	Today's Assigned Cases	List of cases assigned for the day with key info (Name, Zone, Amount, Bucket)
6	Search Case	Search by account number or customer name
7	Filter Cases	Filter by: Paid, PTP, Skip, Refused, No Show, Bucket, Status
8	Customer Detail View	Detailed case info: Account No, Phone, DPD, Amounts, Address, Status
9	Start Visit (GPS Logging)	Capture GPS and timestamp when visit starts
10	Visit Outcome Form	Select visit result (Paid / PTP / Skip / Refused / Dispute) + remarks
11	Payment Collection Entry	Enter amount collected, payment mode (Cash, UPI, Cheque), optional ref ID
12	Upload Proof	Upload photo of receipt, location photo, signature (optional)
13	Next Follow-Up Date	Set a suggested date for next visit (if unresolved)
14	Case History	Timeline of all previous visits, follow-ups, and payments
15	Offline Queue Viewer	Shows all data not yet synced; manual or auto sync when online
16	Notifications	In-app alerts: New case assigned, admin messages, case updates
17	My Profile	View personal info, assigned area, performance stats
18	Change Password	Reset login credentials (offline if cached)
19	Logout	End session and clear local data (optional sync reminder)











1. Project Overview
The Bank Recovery Management System is a secure and centralized web + mobile-based platform developed to streamline and manage debt recovery operations for financial institutions. The system facilitates better performance tracking, case assignment automation, real-time updates, and field agent monitoring—all organized through role-based access for Admins, Supervisors, Telecallers, and Field Agents.
2. Deliverables & System Users & Roles
Role	Access Type	Platform
Super Admin	Web Panel	Full control of system, users, banks, roles, and reports.
Supervisor	Web + Android  App	Mid-level manager overseeing banks, cases, staff assignments, and follow-ups.
Telecaller	Web Panel	Call-based recovery, update cases, follow-ups, and remarks.
Field Agent	Android App	Ground-level visits, live tracking, update follow-up status, navigation support.


3. Feature List


Super Admin 

1.	Secure Login & Password Recovery
2.	Admin Dashboard
○	Case & amount overview, recovery analytics, FOS performance, graphical stats.
2.	Profile Management
3.	Bank/Vendor Management
4.	Staff Management
○	Add/Remove, assign roles, send credentials.
5.	Roles & Permissions
○	Custom role creation, access control.
6.	Case Management
○	Master file upload, data mapping, history, search, bulk import (Excel).
7.	Case Assignment
○	Auto/manual assignment via rules (Bank + Region).
○	Notification trigger on assignment.
8.	Remarks Management
○	Predefined standard follow-up remarks.
9.	Live Tracking of Field Agents
○	Common Map View, real-time pin tracking.
10.	Secure Logout	
Supervisor

1.	Login & Authentication
2.	Supervisor Dashboard
●	Assigned banks/cases, recovery progress, team performance.
3.	Profile Management
4.	Bank View
●	Assigned Banks, search/filter, access case lists.
5.	Case Management
●	View, assign Telecallers/Agents, update statuses.
6.	Live Tracking of Field Agents
7.	Notification Center
8.	Secure Logout
Telecaller 
1.	Login & Dashboard
2.	Case Management
○	View & update assigned cases, add remarks, follow-up status.
3.	Search & Filter
4.	Profile Management
5.	Notification Module
6.	Secure Logout	Field Agent (Mobile App)
1.	Login & Dashboard
2.	Case Management
○	Access full case detail, follow-up update, GPS navigation.
3.	Live Tracking System
○	Start/stop tracking, map navigation.
4.	Hamburger Menu Navigation
5.	Search & Filter
6.	Notifications
7.	Profile Management
8.	Secure Logout


4. Step-by-Step Process Flow
Step 1: Admin Uploads Master Sheet
●	Admin logs into the web panel.
●	Navigates to “Upload Recovery Data” section.
●	Uploads the Excel/CSV file provided by the bank.
●	System validates:
○	Mandatory fields (Account No., Customer Name, Mobile, Address, DPD, Amount, etc.)
○	Duplicates and formatting.
●	Upon successful validation:
○	Data is parsed and stored in the system as individual recovery cases.
○	Mapped to respective banks and billing cycles.
○	Admin can view all uploaded cases in the master list.
Step 2: Case Allocation (Auto or Manual)
Auto Assignment (if enabled)
●	System checks mapping rules (region and location).
●	Cases are automatically assigned to Telecallers and FOS.
●	Telecallers and FOS receive push notifications about new assignments.
Manual Assignment (optional)
●	Admin or Supervisor opens the unassigned cases list.
●	Filters by region, bank, or billing cycle.
●	Selects cases and assigns to:
○	Telecaller for initial contact.
○	Field Officer (FOS) for field visit.

Step 3: Telecaller Follow-Up & Feedback
●	Telecaller logs into the web panel.
●	Accesses assigned case list.
●	Views customer details (name, contact, due amount etc).
●	Initiates calls (manually).
●	Adds follow-up remarks from a predefined or custom list:
○	Paid, Unreachable, PTP (Promise to Pay), Not Interested, Dispute, etc.
●	Selects follow-up status:
○	Follow-up Required
○	Closed – Paid
○	Escalation Required
●	Updates next follow-up date if applicable.

Step 4: FOS Assignment for On-Field Visit
●	If telecaller updates as "Visit Required" or system flags for field action:
○	Supervisor/Admin or Auto assigns the case to a Field Officer (FOS).
●	FOS receives push notification of the new visit assignment.
●	FOS case list is updated in their mobile app.
Step 5: FOS Map View & Live Tracking
●	FOS opens the app and navigates to the assigned case.
●	Taps “Start Task” – live GPS tracking begins.
●	App shows customer address on map.
●	FOS visits the customer location.
●	Taps “Reached” and logs interaction.

Step 6: FOS Updates Case Visit Details
●	After meeting the customer:
○	Adds visit remarks (Paid, PTP, Dispute, Address Change, etc.).
○	Uploads image/proof if applicable (e.g., payment slip, door photo).
○	Marks case as:
■	Paid – if amount is collected.
■	PTP – if customer promises to pay on a future date.
■	Unsuccessful – if not found or refused.

Step 7: Amount Collection (PMC - Post-Visit)
●	If amount is collected on-site:
○	FOS records amount in the “Payment Collected” section.
○	Enters mode of payment: Cash / Online / Cheque.
○	Uploads receipt or confirmation screenshot.
○	System logs this under collection reports.

Step 8: Billing Cycle Monitoring & Case Closure
●	System monitors cases as per billing cycle.
●	At end of billing cycle:
○	Supervisor/Admin reviews all active cases.
○	Verifies:
■	Paid cases
■	Promises to pay
■	Non-responsive accounts
○	Final status marked as:
■	Closed – Paid
■	Pending – PTP
■	Unpaid – Forward to Legal
●	Closed cases are archived.
●	Reports generated for the bank with:
○	Recovery amount
○	Field officer efficiency
○	Telecaller conversion rate
○	Billing cycle summary

5. Module Descriptions
Admin Panel – Module-wise Description
________________________________________
1. Dashboard
Purpose: To provide a visual overview of operational performance, case health, and collection status.
Key Components:
●	Billing Cycle Overview: Active cycle, start date, and current progress.
●	Case Distribution: Pie/Bar charts showing Paid, PTP (Promise To Pay), Dispute, Unreachable, etc.
●	Region-Wise Collection Graph: Compare performance by location.
●	FOS & Telecaller Activity Summary: Total visits made, calls done, cases updated today.
●	Alerts & Reminders: For pending follow-ups, unvisited assigned cases, and aging cases.

2. Billing Cycle Management
Purpose: Manage the start and tracking of each billing cycle (typically starts on 2nd of every month).
Features:
●	Create/Edit Billing Cycles: Each cycle can be labeled (e.g., “May 2025”).
●	Cycle Status: Active, Closed, Archived.
●	Assign Sheet to Cycle: Every master sheet uploaded gets mapped to a cycle.
●	View Cycle Summary: No. of cases, total collection, resolved vs unresolved.
●	Close Cycle: After reconciliation and reporting.

3. Master Sheet Management
Purpose: Upload, view, and manage master data related to cases for each billing cycle.
Features:
●	Upload Master Sheet: Upload initial full sheet on cycle start; daily updates can also be uploaded.
●	Validate & Preview Data: Check for duplicate case IDs, wrong formats, and mandatory fields.
●	Master File Permissions: Admin controls which columns are visible/editable for Telecallers, FOS, Supervisors.
●	Cycle-Wise File Library: History of all uploads categorized under each billing cycle.
●	Search & Filter: View cases uploaded via specific sheet or file name.

4. Case Management
Purpose: End-to-end tracking and administration of customer cases.
Features:
●	Case List View: Master searchable table with filters by region, amount, status, FOS, cycle, etc.
●	Assignment Options: Assign case to FOS or Telecaller manually or in bulk.
●	Update Case Details: Status, last activity, remarks, collection done, payment proof.
●	Case History Timeline: Auto-generated chronological log of actions taken.
●	Geo-Tag Case: Assign geo-location (used by FOS map tracking).

5. Telecaller Management
Purpose: Manage telecaller workflow based on CD (Cycle Due) allocations.
Features:
●	Allocate CD Accounts: Assign cases to telecallers per billing cycle.
●	Feedback Entry: Telecallers record interaction result: Customer response, dispute, agreement to pay, etc.
●	Set Priority Tags: Mark as High, Medium, Low based on urgency.
●	Follow-up Schedule: Add next call date to appear in telecaller’s task list.
●	History Access: Telecallers can only view history for their allocated cases.

6. FOS Management (Field Officers)
Purpose: Manage field-based team members who visit customers physically for collections.
Types of FOS:
●	Contractual FOS: Paid based on % of collected amount.
●	Inhouse FOS: On fixed salary.
Features:
●	Assign Cases: Based on region or customer location.
●	Live Tracking Integration: View FOS real-time location on map.
●	Visit Logs: Capture time-in, time-out, discussion, payment received.
●	Collection Entry: Manual input or system-recorded, with photo attachment of receipt.
●	Commission Calculation: Auto-based on collection and FOS type.

7. Supervisor Management
Purpose: Manage field and office supervisors for oversight and reporting.
Types of Supervisors:
●	Office Supervisors: Assigned to all CD-based accounts.
●	Field Supervisors: Assigned by location or region.
Features:
●	Assign Supervisors: To FOS teams or Telecaller groups.
●	Track Team Progress: View per user and per region collection and pending cases.
●	Override Actions: Supervisors can reassign or close a case.
●	Daily Task View: Assigned cases, collection summary, exceptions flagged.

8. Region Configuration
Purpose: Organize operations by geography for focused team assignment and analytics.
Features:
●	Create Region: Define and name regions (e.g., North Mumbai).
●	Map Locations to Region: Assign pincodes, cities, or zones under regions.
●	Region-User Mapping: Allocate regions to specific FOS, Telecallers, Supervisors.
●	Use Across Modules: Filtering by region throughout system (dashboard, reports, assignments).

9. User Management
Purpose: Manage access, roles, and permissions of users in the system.
User Types:
●	Admin, Telecaller, Field Supervisor, Office Supervisor, FOS (Contractual/Inhouse)
Features:
●	Add/Edit/Delete Users
●	Role Assignment & Permissions: Control what actions/data each role can access or modify.
●	Master File Access Config: Admin decides who can view which master sheet columns.
●	Region Allocation: Users are tagged to specific regions.
●	User Activity Logs: Track last login, task count, cases handled.

10. Communication Remarks & Priority Management
Purpose: Keep track of every customer conversation and help FOS prioritize visits.
Features:
●	Telecaller Feedback Entry: Discussion summary, next step.
●	Priority Tagging: High/Medium/Low priority; affects FOS task list visibility.
●	Remark History: Maintain remark logs per case.
●	FOS Notification System: Get real-time alerts for high-priority follow-ups.
●	Color Code or Icon Markers: Visual cues for priority or sensitive cases.

11. Collection & Payment Tracking
Purpose: Centralized ledger of all collection efforts and received payments.
Features:
●	Daily Collection Entry
●	Payment Proof Uploads
●	Cycle-wise Payment Report: What was collected per billing cycle.
●	FOS-Wise Collection View: Also breaks down per region.
●	Collection Verification: Supervisor/Admin can verify and approve.

12. Reports & Analytics
Purpose: Business insights based on collection performance, user productivity, and case closures.
Reports Available:
●	Billing Cycle Report: Collection vs. target, number of resolved cases.
●	Monthly Performance: Trends in recovery by months.
●	Region-Wise Reports
●	FOS/Telecaller Reports
●	Dispute vs Recovery Report
Export Options: CSV, Excel, PDF, printable format.

13. Settings
Purpose: Master configurations and control over system defaults.
Features:
●	Master Field Toggle: Enable/disable fields based on role.
●	Feedback/Status Master: Manage status options like Paid, PTP, Dispute, etc.
●	Location Master: Setup location list for assigning to regions.
●	Contractual Commission Setup: Define % slabs for contractual FOS.
●	System Settings: Logo, cycle start date, notification settings.


Supervisor Panel – Module-wise Description
________________________________________
1. Dashboard
a. Assigned Cases Summary
Displays a quick summary of all cases managed under the supervisor:
●	Total Assigned
●	Paid
●	Pending
●	PTP (Promise to Pay)
●	Dispute Cases
b. Team Performance Bar Chart
Visual bar chart comparing staff performance:
●	Number of cases handled per Telecaller & FOS
●	Amount collected
●	Follow-up status per member
c. Region-Wise Collection Summary (Field Supervisors only)
Shows region-based summaries of collections:
●	Total collection by location
●	Collection trends per region
d. Daily Follow-ups & Assign Cases Alerts
Reminders for pending follow-ups and assign cases (no updates for X days)

2. Case Management
a. View All Cases
Access a list of all cases under the supervisor’s management.
 Filters include:
●	Case status
●	Assigned FOS/Telecaller
●	Region
●	Priority
b. Update Case Status & Remarks
Allows supervisors to update:
●	Current status (Pending, Paid, PTP, etc.)
●	Add case-specific remarks

c. View and Add Follow-up Notes
Check previous follow-ups and add new notes for ongoing communication tracking.
d. Assign/Reassign Case
Assign or change case handlers (FOS/Telecaller) via dropdowns or bulk actions.
e. Case History & Communication Log Access
View the full timeline:
●	Uploaded remarks
●	Collection history
●	Communication attempts

3. Team Management
a. View Assigned Telecallers & FOS
List of staff members mapped under the supervisor
●	Includes basic info, role type, and total assigned cases

b. Assign Cases Individually or in Bulk (Auto)
Select and allocate cases to team members via single or multi-select assignment.
c. Monitor Task Progress
Track individual staff activity:
●	Calls made
●	Visits done
●	Pending actions

d. Staff-Wise Case Load
Overview of how many cases each member is managing.
e. Location-Wise FOS Allocation (Field Supervisors only)
Assign or reassign cases based on staff’s operational region/location.

4. Follow-up & Feedback Tracker
a. View Scheduled Follow-ups
Lists follow-ups scheduled by telecallers or FOS
●	Sorted by date, status, or priority

b. Review Telecaller Remarks & Feedback
Displays latest remarks by telecaller during follow-up calls
●	Customer response
●	Promises, disputes, or escalation

c. Set Priority Levels
Allows supervisor to mark cases as High, Medium, or Low priority
●	FOS gets notified accordingly

d. Unassigned Cases View
Displays all cases that have not been assigned to any staff
●	Helps in identifying and assigning pending work quickly

5. Collection Monitoring
a. Case-wise Collection Status Overview
Shows collection updates for each case:
●	Total due vs. amount collected
●	Date of last collection

b. FOS-Wise Daily Collection Report
Breakdown of amount collected by each FOS
●	Date-wise
●	Case count
●	% of recovery
c. View Payment Proofs
Supervisors can view payment screenshots/documents uploaded by FOS for verification.
d. Region-Wise Collection Tracking (Field Supervisors only)
Summarized data of collection done across various locations managed by the supervisor.

6. Region & Map View
a. View Assigned Regions & Locations
Supervisor can check what regions and locations they are responsible for.
b. Location-Wise Case Distribution
Overview of how many cases exist in each location.
c. Live Map View of FOS Locations
Map view showing real-time location of each active FOS.
●	Updated periodically based on FOS app tracking
d. Reallocate Based on Load or Location
Reassign cases to other FOS if area is overloaded or outside the current FOS zone.

7. Reports & Analytics
a. Billing Cycle-Wise Case Reports
Download reports that show cases opened and closed during a billing cycle.
b. Monthly Collection Summary
Month-by-month summary of all collection activity, including amounts and success ratios.
c. Team Productivity Reports
View number of tasks completed by each team member
●	Telecaller: Calls, PTPs, Follow-ups
●	FOS: Visits, Amount Collected
d. Case Status Reports
Cases grouped and analyzed by status
●	Dispute cases
●	PTP follow-ups pending
●	Long pending without update
e. Export Reports
Export all reports to Excel or PDF for offline use or audit.

8. Notifications & Alerts
a. Priority Case Alerts
Notifies supervisors when cases are marked high priority by telecallers.
b. Telecaller Feedback Notification
Alerts when new remarks are added that require FOS follow-up.

9. Profile & Settings
a. Update Profile Info
Basic info like name, phone number, region, etc.
b. Change Password
Secure login update option.
c. View Assigned Role, Region, and Team
View metadata about your responsibilities and staff.


Telecaller Web Panel – Module Descriptions
________________________________________
1. Dashboard
Provides a quick glance at case statistics:
●	Total Assigned Cases: All cases assigned to the telecaller during the active billing cycle.
●	Pending Cases: Cases where no payment has been collected yet.
●	Follow-up Scheduled: Number of cases marked for future follow-up.
●	Paid Cases: Successfully closed cases with confirmed collection.
●	High Priority Cases: Cases marked critical based on internal remarks or customer status.

Today's Follow-up Tasks
Displays a list of cases that are scheduled for follow-up on the current day. Helps telecallers stay organized and plan their daily tasks effectively.

2. Assigned Case Management
View All Assigned Cases
A central view of all customer cases allocated to the telecaller. Users can filter and search by:
●	Customer Name
●	Status (Pending, Paid, No Response, etc.)
●	Priority
●	Region
●	Billing Cycle

Case Detail View
Shows complete case information including:
●	Customer contact details
●	Total due and billing cycle
●	Region and priority status
●	Historical communication or remarks

Update Case Status
Allows the telecaller to mark the progress of a case. Common statuses (managed by Admin):
●	PTP (Promise to Pay)
●	Disconnected
●	Dispute
●	Paid
●	No Response

Add Remarks & Feedback
Used to log internal notes after calling the customer. Telecaller can:
●	Summarize conversation
●	Set call Status 
●	Set priority (High/Medium/Low)
●	Assign FOS
●	Suggest next call date
●	Enter expected payment date

3. Follow-up Management
Scheduled Follow-ups
Shows list of cases tagged for follow-up with due dates. Enables easy access to upcoming tasks.
Missed Follow-up Alerts
Highlights any follow-ups that were missed (i.e., not updated or called on the scheduled date). Helps prevent loss of customer engagement.
Follow-up History
Displays a chronological log of all follow-up actions and interactions per case. 

4. Forward to FOS
Push to FOS for Field Visit
When a telecaller determines that a field visit is needed (e.g., for payment collection or physical confirmation), the case can be marked and sent to the appropriate Field Officer (FOS).
Fields captured:
●	Internal remarks
●	Expected payment date
●	Assigned priority
A notification is sent to the concerned FOS along with case details.

5. Communication Log
Call Summary Notes (Internal Only)
This is a manual note-taking section, not connected to any call recording system. Telecaller records:
●	What was discussed with the customer
●	Any promises made (e.g., date of payment)
●	Observations from the conversation
Mark Case Priority
Based on the call outcome, telecaller can tag the case as:
●	High Priority – Needs immediate action by FOS
●	Medium Priority – Regular follow-up
●	Low Priority – No urgency
Notify FOS
If a case is marked for field action, this feature will notify the respective FOS with:
●	Case summary
●	Location
●	Priority level
●	Telecaller remarks

6. Reporting
Daily Activity Report
Auto-generated or downloadable report showing:
●	Number of calls made
●	Cases updated
●	Cases pushed to FOS
●	New PTPs logged

Billing Cycle-Wise Report
Groups performance and follow-up history by billing cycle to understand how many cases were cleared and how many are still pending.
Monthly Summary Report
Overview of monthly metrics like:
●	Total cases handled
●	Total collections closed
●	Top case statuses
●	Follow-up effectiveness

7. Notifications & Alerts
New Case Assignment Alerts
Sends alerts when new cases are assigned by the supervisor or admin.
Urgent Case Notification
When a case is tagged as “High Priority,” the telecaller gets a notification for immediate action.
FOS Feedback Received
Telecaller gets notified when the FOS provides an update or closes a case forwarded from them.

8. Profile & Settings
Manage Profile Info
Basic user profile management:
●	Name, mobile number, email
Change Password
Secure the account by updating login credentials.

Field Executive (FOS) Mobile App – Module Descriptions
________________________________________
1. Dashboard
Provides a quick overview of the Field Executive’s daily tasks and current case status.
●	Daily Assigned Cases List: Displays a list of customer accounts that need to be visited for the current day, including status indicators (Pending, Completed, Rescheduled).

●	Upcoming Visit Reminders: Highlights upcoming scheduled visits to ensure proper time management.

●	Case Completion Status: Shows visual indicators or counts of how many cases are completed, pending, or rescheduled for better planning.

2. Case Management
Enables FOS to manage all aspects of the customer visit and follow-ups.
●	View Assigned Cases with Full Details: Each case displays customer name, address, phone number, due amount, priority, and visit notes.

●	Search & Filter Cases: Allows filtering by criteria such as date, status, amount, region, or priority to easily manage workloads.

●	Update Collection Status: After visiting, FOS can update the status as "Collected", "Not Available", or "Rescheduled".

●	Add Remarks after Visit: Field Executives can input any customer feedback, visit outcome, or next steps for recordkeeping and tracking.

3. Location & Tracking
This module ensures transparency, route efficiency, and real-time tracking for supervisors and admin.
●	Live Location Sharing: FOS must start and stop their shift to enable real-time location sharing during work hours.

●	Map View of Assigned Cases: Allows executives to view customer addresses on a map with pins color-coded by priority or status.

●	Route Optimization with Google Maps Integration: Tapping the customer location opens Google Maps with the address already pinned, allowing FOS to find the most efficient route.

●	Capture Visit Photo with Timestamp: At the time of visit, the FOS uploads a photo of the customer premises or interaction, and the app automatically records date, time, and geolocation to ensure visit authenticity.

4. Payment Collection
Manages how Field Executives record payment and proof during visits.
●	Mark Collection as Done: Allows FOS to mark whether a payment has been collected.
○	Select Payment Mode: Choose among Cash, UPI, Bank Transfer, etc.

●	Upload Payment Proof: Upload image of receipt, UPI confirmation screenshot, or bank transfer slip.

●	Enter Amount Collected: Manually enter the exact amount received from the customer.

●	Update Follow-up Date: In case full payment isn’t collected, the FOS can set a new follow-up visit date.

5. Notifications
Keeps the FOS informed of any case changes, priority updates, or reminders.
●	New Case Assigned: Push notifications when a new case is assigned.
●	Rescheduled Visits: Alerts the FOS if a case has been reassigned or rescheduled.
●	High-Priority Case Alerts: Notifications when a case is marked as urgent.
●	Upcoming Visits Reminder: Daily or hourly reminders for scheduled appointments.

6. Profile & Settings
Basic user preferences and security controls.
●	View & Edit Profile: FOS can view and update personal details like phone number, photo, and address.
●	Change Password: Option to update login password for security.
●	Logout: Securely sign out of the application.

—------------------------------------
INITIAL REQUIRMENTS 

Development Phases:
1.	Minimum Viable Product (MVP) Phase:
○	Development of core features, including user authentication, customer data management, task assignment, and agent tracking.
○	Initial launch to ensure essential recovery operations function seamlessly.

2.	Continuous Development & Enhancement Phase:
○	Introduction of advanced analytics, reporting and insights for improved recovery efficiency.
○	Performance optimization, security enhancements, and feature expansions based on user feedback.
2. Scope of work
The Bank Recovery Management System is designed to streamline and optimize the debt recovery process with a secure, efficient, and role-based approach. Below are the key features categorized by user roles:
Super Admin - Web Panel
1. Login & Authentication
The system ensures secure access to the Bank Recovery Management System through role-based authentication. Admins, Supervisors, Telecallers, and Field Agents can log in using their assigned credentials. The login process includes validation mechanisms to prevent unauthorised access.
Features:
●	Secure login with email and password.
●	Role-based access control to limit functionalities based on user roles.
●	Password recovery via email OTP verification.
Flow:
1.	The user visits the login page.
2.	Enter their registered email and password.
3.	The system verifies credentials and checks role-based permissions.
4.	If the login is successful, the user is redirected to their respective dashboard.
5.	If lthe ogin fails, an error message is displayed.
6.	If the user forgets their password, they can request an OTP via email to reset it.
7.	After the password is reset, the user logs in with the new password.

2. Admin Dashboard
The dashboard provides an overview of system activities, allowing the Super Admin to monitor performance, view key statistics, and access quick actions. It serves as a central hub for managing recovery cases, tracking staff activities, and overseeing financial progress.
Features:
●	Displays key metrics such as total cases, assigned cases, recovered amounts, and pending cases.
●	Visual representation of case status (Paid, Unpaid, Promise to Pay).
●	Activity logs of staff members (Supervisors, Telecallers, Field Agents).
●	Graphical reports for analysis.
Flow:
1.	The Admin logs in and is redirected to the dashboard.
2.	The system fetches real-time case statistics and staff activity logs.
3.	The Admin can filter data by date, staff, or bank.
4.	The dashboard updates dynamically as new data is entered.

3. Kanban Board
A visual case management system that allows Admins and Supervisors to organize and track the progress of recovery cases.
Features:
●	Drag-and-drop functionality to update case statuses.
●	Columns represent different case stages (Pending, Assigned, In Progress, Completed).
Flow:
1.	The system loads cases into respective columns based on status.
2.	Supervisors/Admins can drag cases to update their status.

4. Admin Profile Management
Admins can manage their personal profiles and security settings.
Features:
●	Update personal information (Name, Email, Contact Number).
●	Change or reset the password.
Flow:
1.	Admin navigates to "Profile Settings".
2.	Updates profile details and submits changes.
3.	If updating the password, an OTP verification is required.
4.	Changes are saved and reflected immediately.

5. Vendor/Bank Management
Admins can register and manage banks or financial institutions associated with recovery operations.
Features:
●	Add new banks/vendors.
●	Manage bank details and registration.
●	Update bank information or deactivate inactive banks.
Flow:
1.	Admin navigates to the "Vendor/Bank Management" section.
2.	Clicks "Add New Bank" and enters bank details.
3.	The system stores the information and links cases to respective banks.
4.	Admin can update or deactivate banks as needed.

6. Staff Management
Admins can add and manage the system’s workforce, including Supervisors, Telecallers, and Field Agents.
Features:
●	Create, update, and remove staff members.
●	Assign user roles and permissions.
●	Activate or deactivate user accounts.
●	Generate and send login credentials.
Flow:
1.	Admin selects the "Staff Management" module.
2.	Clicks "Add New Staff" and fills in details such as name, role, and contact.
3.	Assign a user role (Supervisor, Telecaller, Field Agent).
4.	The system generates login credentials and sends them via email.

7. Roles & Permissions
Defines role-based access control to limit functionalities available to each user type.
Features:
●	Create custom roles with specific permissions.
●	Restrict access to sensitive modules.
●	Modify permissions as needed.
Flow:
1.	Admin navigates to the "Roles & Permissions" module.
2.	Creates a new role and defines access restrictions.
3.	Assigns roles to users and updates permissions dynamically.

8. Case Management
The Case Management Module is the core of the Bank Recovery Management System, allowing the Admin and Supervisors to efficiently handle, track, and update customer cases. It provides a structured way to manage recovery cases, ensuring that each case is assigned to the right staff and tracked until closure. This module also allows for bulk data import, status updates, and history tracking.
Features:
●	Upload and import bank-provided Excel files.
●	Map customer data into the system.
●	Override existing records while uploading new data.
●	Assign/De-assign cases to staff.
●	Manage case statuses (Paid, Unpaid, PTP).
●	View case history and past follow-ups.
●	Search and filter cases by various criteria.
Flow:
1.	Admin uploads an Excel file with customer data.
2.	The system detects duplicates and offers an override option.
3.	The system will map all fields into the system 
a.	Mapping Values: 
i.	Account Number
ii.	Case Type: Consecutive (Already/old Accounts) & Non Consecutive (new/fresh accounts)
iii.	NRR: Region/Location (eg Rajisthan, lucknow etc )
iv.	GNPA: Priority Case (yes/no)
v.	TRAIL: Number of visits (0,1,2,4…)
vi.	Customer Name 
vii.	CD: Cycle Due
viii.	BC: Bill Cycle
ix.	Due Date
x.	MOB: Month of Book
xi.	Card No: Last four digit of card no
xii.	CR_LIMIT: Credit Limit
xiii.	IN LAKH: Amount in Lakhs
xiv.	CURBAL: Current Balance
xv.	NORM: Reactivation Amount
xvi.	STAB: Minimum Due
xvii.	STAB%: Minimum Due %
xviii.	Mobile Number
xix.	ALT Number 
xx.	PMC: Physical money collection 
xxi.	Payment Status 
xxii.	Resolve
xxiii.	Payment 
xxiv.	Block 1
xxv.	Block 2
xxvi.	HARDSHIP_STATUS: Account settlement status
xxvii.	EMPLOYER NAME 
xxviii.	DELIQUENCY: card frequency 
xxix.	DEGINATION
xxx.	MAIL ID 
xxxi.	MFOS: Field Agent Detail 
xxxii.	AREAS
xxxiii.	PERMANENT ADDRESS
xxxiv.	PINCODE
xxxv.	OFFICE ADDRESS
xxxvi.	ENCASH: Loan Agained Card (Amount Value)
xxxvii.	Funding Type: Amount 
4.	Cases are categorized into Paid, Unpaid, or PTP.
5.	Supervisors assign cases to Telecallers or Field Agents.
6.	Agents update case statuses after follow-ups.
9. Remarks Management
Predefined remarks ensure consistency in communication during follow-ups.
Features:
●	Add, update, and manage remarks for follow-ups.
●	Define standard responses such as "Customer Not Responding" or "Wrong Contact Number".
Flow:
1.	Admin navigates to the "Remarks Management" module.
2.	Clicks "Add Remark" and stores remarks.
3.	The system stores remarks for use by staff.

10. Real-Time Tracking of Field Agents
Supervisors and Admins can track the live location of Field Agents when they are on assigned tasks.
	Note: Real-time tracking will be performed on behalf of the agent
Features:
●	GPS-based real-time tracking.
●	Map view tracking 
●	Common map view for all Agent
Flow:
1.	A Field Agent starts a task in the mobile app.
2.	The system activates real-time location tracking.
3.	Supervisors/Admins can view the agent's location on a map.
4.	Once the task is completed, tracking is disabled automatically.
Notifications 

2.2 Supervisors Web Panel
The Supervisor Panel is a crucial interface for mid-level management to oversee recovery cases, assign tasks to Telecallers and Field Agents, monitor performance, and ensure the timely and effective closure of cases. It provides a consolidated view of bank-assigned cases, allows task assignment, and enables tracking field activity in real time.
1. Login and Authentication
Supervisors can securely log into the web system using their credentials. Password recovery and OTP verification ensure secure access.
Flow & Steps:
●	Step 1: Enter your registered email/mobile number and password.
●	Step 2: If a password is forgotten, reset via email OTP verification.
●	Step 3: Redirected to the dashboard upon successful login.

2. Supervisor Dashboard
Displays a real-time overview of assigned cases, team activity, recovery stats, and pending tasks for efficient monitoring.
Highlights:
●	Total Assigned Cases
●	Paid / Unpaid / PTP Distribution
●	Number of Active Telecallers & Field Agents
●	Recovery Progress Chart
3. Kanban Board
Provides a visual representation of cases based on their current status. Enables drag-and-drop updates for task management.
Statuses Displayed:
●	New Cases
●	In Progress
●	PTP (Promise to Pay)
●	Paid
●	Unpaid

Flow:
●	Drag & drop cases to update status
●	Real-time updates across the team
●	Easy task reassignment from board

4. Manage Supervisor Profile
Supervisors can update their personal profile, contact details, and change their password from the settings section.
Features:
●	View Profile Information
●	Edit Full Name, Email, Phone
●	Update Password
●	Upload Profile Image
Flow:
●	Step 1: Open Profile Tab
●	Step 2: Edit detail
●	Step 3: Submit changes
●	Step 4: Receive update confirmation

5. Vendor/Bank Management
Supervisors can view a list of banks assigned to them, along with search and filter capabilities to locate specific vendors.
Features:
●	View Bank Name, Contact, Location
●	Search Banks by Name or ID
●	View Total Assigned Cases Per Bank
●	Access to bank-specific case list
Flow:
●	Step 1: Navigate to Vendor/Bank List
●	Step 2: Search or Filter by Bank Name
●	Step 3: Click to view all related customer cases

6. Case Management
Supervisors can access detailed case info, assign or remove Telecallers/Field Agents, and monitor recovery progress and follow-ups.
Features:
●	View updated customer case details
●	Access case history & past follow-ups
●	Assign/De-assign Telecallers and Field Agents
●	Monitor recovery progress and payment updates
●	Track task completion
●	Add remarks and status updates
Flow & Steps:
●	Step 1: Open Case List
●	Step 2: Search/filter based on status, agent, bank
●	Step 3: Click on a case to view details
●	Step 4: Assign staff and set follow-up date
●	Step 5: Track case resolution or re-assign if required
Status Categories:
●	Paid
●	Unpaid
●	PTP

7. Real-Time Location Tracking of Field Agents
Allows supervisors to track the live GPS location of Field Agents on a map and view their current assignment details.
Features:
●	Live Map View with Field Agent Pins
●	Agent Details on Hover (Name, contact number)
Flow & Steps:
●	Step 1: Navigate to “Field Agent”
●	Step 2: Select Agent or Agent ID
●	Step 3: View current agent location on the map
●	Step 4: Click pin for more info and movement logs

Notification Module
The Notification Module allows the supervisor to receive real-time alerts and important updates such as new case assignments, follow-up deadlines, supervisor remarks, or changes in case status.
Flow:
●	Step 1: The Notification bell icon is accessible from any screen in the panel.
●	Step 2: The supervisor receives instant push or in-app notifications when a new case is assigned.
●	Step 3: Clicking on a notification opens the relevant case or section directly.
●	Step 4: The supervisor can also view a notification history for review.


2.3 Telecaller Web Panel
1.	Login and Authentication
Telecallers will log in to the system using their registered email and password. The platform also provides options to reset forgotten passwords via OTP verification.
Flow:
●	Step 1: The Telecaller visits the login page.
●	Step 2: Enter your registered email and password.
●	Step 3: If the password is forgotten, select the "Forget Password" option.
●	Step 4: The user receives an OTP on the registered number or email.
●	Step 5: Enter OTP, set a new password, and log in successfully.

2.	Telecaller Dashboard
Displays a summarized overview of total assigned cases, follow-up statuses (Paid, Unpaid, PTP), pending actions, and a quick glance at performance metrics.
Flow:
●	Step 1: Telecaller logs in to the dashboard.
●	Step 2: Views stats like total assigned cases, pending follow-ups, and breakdown of case status.
Step 3: Clicks any section to drill down into detailed records.

3.	Case Management
This module allows Telecallers to view assigned customer cases in a table format. They can see contact details, follow-up history, and update the case with a predefined remark and status (Paid, Unpaid, PTP). Call lag information is also displayed for timely action.
Flow:
●	Step 1: Telecaller accesses the Case Management section.
●	Step 2: View list of assigned cases with filters and search options.
●	Step 3: Click on a specific case to view detailed customer information.
●	Step 4: Check previous call logs 
●	Step 5: Call the customer manually using the contact number shown.
●	Step 6: Updates the follow-up status and selects a predefined remark (e.g., Mobile switched off, Number invalid).
●	Step 6: Optional adds a custom note and submits the update.

4.	Search and Filter Customer Records
Telecallers can use robust search and filtering features to locate cases by customer name, contact number, date of assignment, or status.
Flow:
●	Step 1: Telecaller opens the case listing page.
●	Step 2: Applies filters like date range, case status, or search by name/contact.
●	Step 3: Results update in real-time, allowing the Telecaller to act faster.

5.	Manage Telecaller Profile
Allows Telecallers to update their personal profile details and change their login password through the settings panel.
Flow:
●	Step 1: The Telecaller navigates to the profile section.
●	Step 2: Views and edits details like name, email, and contact number.
●	Step 3: If needed, updates the password after entering the current one.
●	Step 4: Saves changes and logs out/in if the password was changed.

6.	Notification Module
The Notification Module allows Telecallers to receive real-time alerts and important updates such as new case assignments, follow-up deadlines, supervisor remarks, or changes in case status.
Flow:
●	Step 1: The Notification bell icon is accessible from any screen in the panel.
●	Step 2: The Telecaller receives instant push or in-app notifications when a new case is assigned.
●	Step 3: Clicking on a notification opens the relevant case or section directly.
●	Step 4: Telecallers can also view a notification history for review.

2.4 Field Agent Mobile App
1.	Login and Authentication
Field Agents can securely log in to the app using their credentials. In case of a forgotten password, the app provides OTP-based password recovery.
Flow:
●	Step 1: Agent opens the mobile app and lands on the login screen.
●	Step 2: Enters email and password to log in.
●	Step 3: If a password is forgotten, tap “Forgot Password.”
●	Step 4: The user Receives OTP on the registered mobile/email.
●	Step 5: Verify OTP, reset password, and log in successfully.

2.	Field Agent Dashboard
The dashboard gives a real-time overview of the agent’s performance metrics, total assigned cases, completed visits, pending follow-ups, and case status distribution.
Flow:
●	Step 1: Upon login, the agent lands on the dashboard.
●	Step 2: View data visualizations or counters for assigned, completed, and pending cases.
●	Step 3: Tap on any section to jump to the relevant case list.

3.	Case Management
Agents can view a detailed list of customer cases assigned to them. Each record shows customer contact details, address, case history, and follow-up actions. They can update the follow-up status (Paid, Unpaid, PTP) with relevant remarks.
Flow:
●	Step 1: Agent opens the "Case Management" section.
●	Step 2: Views list of all assigned customer cases.
●	Step 3: Clicks on a case to view full customer details 
●	Step 4: Visit customer location using Google map navigation and past follow-up notes.
●	Step 5: Select a follow-up status (Paid, Unpaid, PTP), add remarks or comments.
●	Step 6: Submits the update, which syncs to the system for supervisors/admins to review.

4.	Live Tracking System
The app features a GPS-based tracking system for monitoring field agents in real time. Agents can also view customer locations on the map and use Google Maps for navigation.
Flow:
●	Step 1: Agent taps “Navigate” in the case detail page.
●	Step 2: The Customer location is shown in Google Maps.
●	Step 3: Agent begins navigation toward the customer site.
●	Step 4: GPS coordinates are continuously tracked and visible to Supervisors/Admins via live dashboard.
●	Step 5: Tracking stops automatically when the shift or case is marked complete.

5.	Hamburger Menu
A side navigation menu (hamburger) allows quick access to different sections like Dashboard, Cases, Notifications, Profile, and Logout.
Flow:
●	Step 1: Agent taps the hamburger icon.
●	Step 2: Views navigational options like Dashboard, Case List, Profile, etc.
●	Step 3: Taps any section to navigate instantly.

6.	Search and Filters
The agent can search for cases by customer name, ID, phone number, or filter by case status (Paid, PTP, Unpaid) to streamline field operations.
Flow:
●	Step 1: Agent accesses the case list.
●	Step 2: Enters keywords in the search bar or applies filters.
●	Step 3: Results update dynamically for easy access.


7.	Notification Module
The app sends real-time push/in-app notifications regarding newly assigned cases, supervisor instructions, overdue follow-ups, or general alerts.
Flow:
●	Step 1: Agent receives notification alerts with vibration/sound.
●	Step 2: Notification appears in-app and in the notification center.
●	Step 3: Tapping the notification opens the respective case or detail screen.
●	Step 4: Notification history can be accessed from the hamburger menu.

8.	Manage Field Agent Profile
Field agents can manage and update their personal information and change passwords via the profile section.
Flow:
●	Step 1: Agent opens “Profile” from the menu.
●	Step 2: Views current profile info and taps “Edit” to update.
●	Step 3: Enters new details or changes password.
●	Step 4: Saves and confirms the update.

9.	Logout
Securely logs the agent out of the application to ensure data privacy and session control.
Flow:
●	Step 1: Agent opens the hamburger menu.
●	Step 2: Taps the “Logout” button.
●	Step 3: App clears session data and redirects to the login screen.


3. Deliverables
1. Web-Based Panels
●	Super Admin Web Panel: Full access to manage the system, track performance, and generate reports.
●	Supervisor Web Panel: Interface for customer list uploads, task assignments, and recovery monitoring.
●	Staff Panel (Telecaller): Dashboard for telecallers and field agents to view and update tasks.
2. Mobile Application (Android & iOS)
●	Field Agent App: Enables agents to receive tasks, update recovery status, and provide live location tracking.

==========19jun 2025
we now have this role hierarchy:
Role	Description
Admin	Controls the entire system, manages users, data, settings, reports.
Supervisor	Manages & monitors Agents/FOS, assigns/reassigns tasks, reviews results.
Telecaller	Makes follow-up calls, logs remarks, forwards cases to FOS.
Agent / FOS / Recovery Boy	Field user doing visits, collections, follow-ups (same mobile app).

✅ FINAL FEATURE LIST – RECOVERY MANAGEMENT SYSTEM
________________________________________
🧑‍💼 1. ADMIN PANEL (Web)
Platform: Web
 Role: Super Admin / Admin (full control)
🔧 Features
1.	Dashboard

○	Active cycles, paid/unpaid/ptp summary, agent stats

2.	User Management

○	Add/edit/delete users (Admin, Telecaller, FOS, Supervisor)

○	Role-based permissions

○	Region-wise access control

○	Sub-agency admin creation

3.	Sub-Agency Management

○	Add/edit/delete Sub-Agencies

○	Assign cases or allow pull from pool

○	Limit FOS under agency

○	View Sub-agency recovery, payout, and reports

4.	Bank / Vendor Management

○	Add/edit banks

○	Define billing agreements

5.	Billing Cycle Management

○	Create billing cycles

○	Archive/close old cycles

6.	Master Sheet Upload & Merge

○	Excel import with preview

○	Validation rules (mandatory fields, duplicates)

○	Audit log: file/user/date/version

7.	Customer Case Management

○	Global searchable case table

○	Assign/reassign to telecaller/FOS/sub-agency

○	Case status, history, remarks, visit trail

○	Tags: CONS/NON-CONS, ENCASH, LM STATUS, Stabilized

8.	Assignment Panel

○	Manual/auto case assignment

○	Unassigned case view

9.	Commission & Payout Management

○	Define commission slabs per bucket

○	Track payout per case/user

○	Approve/reject commission release

○	Auto-split between FOS/Sub-Agency

10.	Stabilization Funding Management

○	Mark underperforming cases

○	Add RF/DF STAB support

○	Track stabilization impact

○	Reversal control

11.	Remarks Management

○	Add/edit shortcode list

○	Map remarks to roles

12.	FOS Tracking

○	Live map of all field agents

○	Visit log (GPS entry/exit)

13.	Reports & Analytics

○	Daily, monthly, billing cycle, user-wise

○	Region, status, PTP, performance

○	Export: XLS, CSV, PDF

14.	Notification Center

○	Assignments, follow-ups, alerts

15.	Audit Trail

○	All actions: login, assignment, upload, payout

16.	Shortcode / Status Config

○	Manage follow-up types, LM status, payment codes

17.	Region & Area Configuration

○	Setup zones, cities, pincodes

○	Assign to agents

18.	Settings

○	Role permissions, collection modes

○	Cycle defaults, branding, SMS/email setup

19.	Profile Management

20.	Logout

________________________________________
🧑‍💼 2. SUB-AGENCY ADMIN PANEL (Web)
Platform: Web
 Role: External agency manager
📋 Features
1.	Dashboard

○	Assigned accounts

○	Recovery targets

○	FOS performance

2.	FOS Management (Sub-FOS)

○	Add/edit/delete internal FOS

○	Assign cases to Sub-FOS

3.	Case Management

○	View case details

○	Assign internally

○	View remarks and history

4.	Team Reports

○	Sub-FOS wise collection, visit %

5.	Commission View

○	Read-only for their share

6.	Payment Collection History

7.	Profile & Settings

8.	Logout

________________________________________
👨‍🏫 3. SUPERVISOR PANEL (Web + Mobile)
Platform: Web + Mobile
 Role: Mid-level manager, team handler
📋 Web Features
1.	Dashboard

○	Total assigned cases

○	Staff stats

○	Follow-up summary

2.	Bank / Vendor Overview

3.	Case Management

○	View case detail

○	Assign/reassign Telecaller or FOS

○	Update case status, remarks

○	Kanban board drag-drop

4.	Team Management

○	View assigned Telecallers / FOS

○	Task load, visit stats, calls made

5.	Follow-up Tracker

○	View today's due calls / missed

○	Escalate if needed

6.	FOS Location Tracking

○	Live map view

○	Pin-by-pin visit location

7.	Collection Monitoring

○	Daily summary by FOS

○	Review payment proofs

8.	Reports & Analytics

○	Monthly, cycle-wise, staff-wise

9.	Notification Center

10.	Profile & Settings

11.	Logout

📱 Mobile App Features
●	View dashboard (agent summary, collection status)

●	View case list

●	Filter by status, region

●	Reassign to another FOS

●	Live FOS tracking

●	View visit status + payment

●	Push urgent instructions

●	Mark cases high-priority

●	View/download report summaries

●	Notifications + Profile

________________________________________
☎️ 4. TELECALLER PANEL (Web)
Platform: Web
 Role: Call-based follow-up user
📋 Features
1.	Dashboard

○	Total assigned cases

○	Follow-up count: Paid, PTP, No Response

2.	My Assigned Cases

○	View & search case list

○	See contact, DPD, bucket, status

3.	Case Detail & Follow-Up

○	Add remarks using shortcodes

○	Set next call date

○	Add follow-up priority

4.	Forward to FOS

○	Mark for field visit

○	Add comments & deadline

5.	Follow-up History

○	View previous logs

6.	Reports

○	Daily activity

○	Monthly summary

○	Billing cycle breakdown

7.	Notifications

○	Assigned case alert

○	Feedback from FOS

○	Supervisor updates

8.	Profile Management

9.	Logout

________________________________________
🚶 5. FIELD AGENT / FOS / RECOVERY BOY (Mobile App)
Platform: Mobile App (Android/iOS)
 Role: Field-level user doing visits & collections
📱 FOS Mobile Features
1.	Login + OTP Reset + Offline Login

2.	Dashboard

○	Daily assigned cases

○	Visit status breakdown

○	Collection summary

3.	Case Management

○	View assigned cases

○	Search & filter

○	View case details (name, phone, address, amount, history)

4.	Start Visit / End Visit (GPS Based)

○	Logs coordinates + time

○	Sync offline later if needed

5.	Navigation

○	Google Maps integration

○	Tap to navigate to address

6.	Update Visit Outcome

○	Status: Paid / PTP / Not Available / Skip / Refused / Dispute

○	Add remarks

7.	Payment Collection

○	Enter amount

○	Select mode: Cash / UPI / Cheque / Bank

○	Upload photo/screenshot

○	Enter transaction ID

8.	Follow-Up Scheduling

○	Set next visit date

○	Add remarks

9.	Offline Queue

○	Store visit logs offline

○	Sync manually

10.	Visit History

●	View previous actions per case

11.	Notifications

○	New assignment

○	Urgent case

○	Supervisor message

12.	Profile + Change Password

13.	Logout

________________________________________
🧾 Summary Table
Role	Platform	Panel	Features
Admin	Web	Admin Panel	20+ core system modules
Sub-Agency Admin	Web	Sub-Agency Panel	Case assignment, FOS control
Supervisor	Web + Mobile	Supervisor Panel	Oversight, team & case control
Telecaller	Web	Telecaller Panel	Call-based recovery & push to FOS
FOS / Agent	Mobile	FOS App	GPS visits, collection, follow-up
________________________________________
✅ FINAL FEATURE LIST – LOAN RECOVERY MANAGEMENT SYSTEM
________________________________________
🧑‍💼 1. ADMIN PANEL (Web)
Role: Full system control, import cases, manage teams, assign work, track performance
📂 MODULE	✅ FEATURES
🔐 Authentication	Login, Logout, Change Password, Profile Update
📊 Dashboard	Case summary (Paid, PTP, Unpaid, Dispute), FOS/Telecaller activity, region stats
👥 User Management	Add/Edit/Delete users (Admin, Supervisor, Telecaller, FOS), Assign roles & regions, Sub-agency setup
🏦 Bank / Vendor Management	Add/edit vendor profiles, link to billing cycles
📅 Billing Cycle Management	Create billing cycles (e.g., “July 2025”), Close cycles, View historical performance
📥 Case Import Management	Upload Excel, field mapping, validation, case preview, import log, rollback
📋 Customer Case Management	View case list, Search/Filter, Case details, Edit case info, Track history
🤝 Assignment Panel	Assign/Reassign to Telecaller / FOS / Sub-agency, bulk assignment by region/bucket
💬 Remark Shortcode Manager	Create/update follow-up codes (e.g., PTP, Skip), map visibility by role
💰 Commission Management	Define commission slabs by bucket, Approve/reject payout, FOS/Sub-agency split
📈 Stabilization Funding	Allocate STAB support, Reverse funds, Track per case
🗺️ FOS GPS Tracking	Live FOS location map, GPS logs (entry/exit), Visit heatmaps
📑 Reports & Analytics	Cycle-wise, user-wise, region-wise, status-based, export to PDF/Excel
🔔 Notification Center	Alerts: new assignment, overdue follow-up, dispute escalation
📜 Audit Logs	Action trail for uploads, updates, payments, assignments
🌐 Settings	Role permissions, Region & Pincode Master, Collection Modes, SMS/Email setup, Branding
________________________________________
🧑‍💼 2. SUB-AGENCY ADMIN PANEL (Web)
Role: Handles own team of recovery agents under master admin
📂 MODULE	✅ FEATURES
📊 Dashboard	Total assigned cases, daily collection status, agent performance
👥 Sub-FOS Management	Add/edit/delete sub-agents (FOS), Assign cases
📋 Case Management	View/update assigned cases, Track recovery and remarks
📈 Commission View	View read-only commission summary per cycle
📑 Reports	Sub-FOS performance, Visit summary, Recovery amount
👤 Profile	Edit info, change password
🔐 Logout	Secure logout
________________________________________
👨‍🏫 3. SUPERVISOR PANEL (Web & Mobile)
Role: Manages Telecallers & FOS, assigns work, monitors live field performance
📂 MODULE	✅ WEB FEATURES	✅ MOBILE FEATURES
📊 Dashboard	Case stats, team performance, pending follow-ups	Same
👥 Team Management	View FOS/Telecallers, Reassign cases	View assigned FOS list
📋 Case Management	View/update cases, Assign/Unassign	View, Reassign to other FOS
🗂️ Kanban Board	Drag & drop case progress	—
📞 Follow-Up Tracker	PTP due, Missed calls, Escalations	—
🗺️ Live FOS Map	Real-time GPS map view	Real-time map pins, live status
📈 Reports	Agent-wise, Status-wise, Payout performance	View summaries
📑 Notifications	Escalation alerts, Missed follow-ups	Push alerts
👤 Profile & Logout	Update info, secure logout	Yes
________________________________________
☎️ 4. TELECALLER PANEL (Web)
Role: Makes phone-based recovery follow-ups, updates status, escalates to FOS
📂 MODULE	✅ FEATURES
📊 Dashboard	Assigned case summary: Paid, PTP, No Response
📋 My Cases	Search/filter list, Call logs, Add remarks
📞 Follow-up Logging	Add follow-up status (PTP, Paid, Refused), Schedule next call
🔁 Forward to FOS	Mark cases needing field visit, Add instructions
📚 Follow-up History	Track past interactions per customer
📑 Reports	Daily/Monthly performance, Missed follow-ups
🔔 Notifications	New cases, updates from FOS
👤 Profile Management	Update details
🔐 Logout	Yes
________________________________________
🚶 5. FOS / FIELD AGENT PANEL (Mobile App)
Role: Field recovery visits, payment collection, report visits
📂 MODULE	✅ FEATURES
🔐 Login & Offline Sync	Secure login, Auto-sync, Offline queue
📊 Dashboard	Total cases today, Visit summary, Collection status
📋 My Assigned Cases	View case list, Filter by status/region, View customer details
🗺️ GPS Visit Logging	Start Visit (logs lat/lng), End Visit, Duration tracking
🧭 Google Maps Navigation	Navigate to customer address
💬 Update Visit Status	Paid / PTP / Refused / Skip / Not Available / Dispute
💵 Payment Collection	Enter amount, Payment mode (Cash, UPI, Cheque, Bank), Upload receipt
📅 Schedule Follow-Up	Set next visit date, Add notes
📚 Visit History	View previous actions by customer
🔔 Notifications	New case assigned, supervisor message
👤 Profile & Logout	Update details, Change password
________________________________________
📦 Summary Table by Role & Platform
Role	Platform	Key Modules
Admin	Web	Import, Assignments, Case, Users, Tracking, Payouts, Reports
Sub-Agency Admin	Web	FOS Management, Recovery, Read-only Reports
Supervisor	Web + Mobile	Team Mgmt, Case Assignment, GPS, Reports
Telecaller	Web	Call-based follow-up, PTP logging, FOS escalation
FOS / Agent	Mobile	Field visits, Collection entry, Follow-up, Sync
________________________________________


-- Loan Recovery Management System SCHEMA- Full Database Schema Based on Final Feature List

-- 1. USERS TABLE (All Roles)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'supervisor', 'telecaller', 'fos', 'subagency_admin'),
    parent_id BIGINT, -- For sub-agency linkage
    region_id BIGINT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. REGIONS TABLE
CREATE TABLE regions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    zone VARCHAR(100)
);

-- 3. BANKS / VENDORS
CREATE TABLE banks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    contact_email VARCHAR(100),
    billing_type ENUM('monthly', 'weekly', 'custom')
);

-- 4. BILLING CYCLES
CREATE TABLE billing_cycles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bank_id BIGINT,
    name VARCHAR(100), -- e.g. July-2025
    start_date DATE,
    end_date DATE,
    status ENUM('open', 'closed') DEFAULT 'open',
    created_by BIGINT,
    FOREIGN KEY (bank_id) REFERENCES banks(id)
);

-- 5. IMPORTED CASE FILES
CREATE TABLE imported_cases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    billing_cycle_id BIGINT,
    uploaded_by BIGINT,
    filename VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (billing_cycle_id) REFERENCES billing_cycles(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- 6. CUSTOMER CASES
CREATE TABLE customer_cases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    import_id BIGINT,
    billing_cycle_id BIGINT,
    bank_id BIGINT,
    customer_name VARCHAR(150),
    phone VARCHAR(15),
    address TEXT,
    region_id BIGINT,
    amount_due DECIMAL(10,2),
    dpd INT,
    bucket INT,
    cons_type ENUM('CONS', 'NON-CONS'),
    lm_status VARCHAR(50),
    stabilized ENUM('yes', 'no') DEFAULT 'no',
    status ENUM('unpaid', 'ptp', 'paid', 'skip', 'refused', 'dispute') DEFAULT 'unpaid',
    assigned_to BIGINT,
    assigned_by BIGINT,
    case_source ENUM('admin', 'telecaller', 'supervisor'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (billing_cycle_id) REFERENCES billing_cycles(id),
    FOREIGN KEY (import_id) REFERENCES imported_cases(id)
);

-- 7. FOLLOW-UP LOGS
CREATE TABLE followups (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    user_id BIGINT,
    status ENUM('ptp', 'paid', 'not_available', 'skip', 'refused', 'dispute'),
    remark TEXT,
    next_followup_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 8. VISITS (GPS TRACKING)
CREATE TABLE visits (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    fos_id BIGINT,
    start_time DATETIME,
    end_time DATETIME,
    start_lat DECIMAL(10,6),
    start_lng DECIMAL(10,6),
    end_lat DECIMAL(10,6),
    end_lng DECIMAL(10,6),
    visit_photo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id),
    FOREIGN KEY (fos_id) REFERENCES users(id)
);

-- 9. PAYMENTS
CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    collected_by BIGINT,
    amount DECIMAL(10,2),
    payment_mode ENUM('cash', 'upi', 'cheque', 'bank'),
    reference_number VARCHAR(100),
    proof TEXT, -- image URL or file path
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id),
    FOREIGN KEY (collected_by) REFERENCES users(id)
);

-- 10. COMMISSION TRACKING
CREATE TABLE commissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    case_id BIGINT,
    billing_cycle_id BIGINT,
    percentage DECIMAL(5,2),
    amount DECIMAL(10,2),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. STABILIZATION FUNDS
CREATE TABLE stabilization_funds (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    amount DECIMAL(10,2),
    added_by BIGINT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id)
);

-- 12. NOTIFICATIONS
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    message TEXT,
    seen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. AUDIT LOGS
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. SHORTCODES (REMARK CODES)
CREATE TABLE shortcodes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20),
    description TEXT,
    visible_to ENUM('telecaller', 'fos', 'supervisor', 'all'),
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- 15. COLLECTION MODES
CREATE TABLE collection_modes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    enabled BOOLEAN DEFAULT TRUE
);
 
✅ Phase 1 – Initial Development Features
🧑‍💼 ADMIN PANEL (Web)
Feature	Purpose
Login / User Management	Create and manage roles (Admin, Supervisor, FOS, Telecaller)
Bank & Billing Cycle Management	Add vendors and link imports to active cycles
📥 Import Master File (Excel)	Upload raw data (cases), validate, preview, save
Customer Case Management	Store & view cases, search/filter, assign to users
Assignment Module	Assign cases to FOS / Telecaller based on region/bucket
Shortcode Setup	Create follow-up status codes (e.g. Paid, PTP)
Basic Reports (Cycle Summary)	View overall progress by status
Logout & Profile Settings	Secure login, update profile
________________________________________
🧑‍🏫 SUPERVISOR PANEL (Web + Mobile)
Feature	Purpose
Login + Dashboard	View total cases, active users, progress
Assign/Reassign Cases	Distribute work to FOS / Telecaller
Live FOS Tracking (Map View)	Track ongoing visits
Performance View (Basic Reports)	Agent-wise collections & follow-up
Profile & Notifications	Alerts + account settings
________________________________________
☎️ TELECALLER PANEL (Web)
Feature	Purpose
Login + Dashboard	See assigned cases
Follow-up Entry	Add remarks: Paid / PTP / Refused / Forward to FOS
Case Detail View	View customer info, call log
Forward to FOS	Send case for field recovery
Follow-up History	Track communication trail
________________________________________
🚶 FOS APP (Mobile)
Feature	Purpose
Login + Offline Sync	Basic auth + local storage
Today’s Cases	View list with customer name, location
Start Visit / End Visit with GPS	Capture field activity (coordinates, time)
Visit Status Update	Paid / PTP / Refused / Skip + remarks
Payment Collection Entry	Enter amount, mode, upload proof
Visit History	Track what’s completed
Notifications & Profile	Task alerts, logout, profile edit
________________________________________
📡 CORE BACKEND FUNCTIONS
Module	Description
Import Engine	Reads and maps Excel columns, handles validation
Auto-Assignment Rules	Distribute cases to users based on region/load
Role Permissions	Hide/show modules based on login role
Sync APIs	Allow offline FOS data to sync back
Audit Logs	Track user activity (login, updates, assignments)
File & Media Upload	Handle payment proof images, visit photos

Phase 1 database schema
-- PHASE 1 DATABASE SCHEMA – CORE MODULES ONLY

-- 1. USERS TABLE
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'supervisor', 'telecaller', 'fos'),
    parent_id BIGINT,
    region_id BIGINT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. REGIONS
CREATE TABLE regions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    zone VARCHAR(100)
);

-- 3. BANKS
CREATE TABLE banks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    contact_email VARCHAR(100),
    billing_type ENUM('monthly', 'weekly', 'custom')
);

-- 4. BILLING CYCLES
CREATE TABLE billing_cycles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bank_id BIGINT,
    name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    status ENUM('open', 'closed') DEFAULT 'open',
    created_by BIGINT,
    FOREIGN KEY (bank_id) REFERENCES banks(id)
);

-- 5. IMPORTED CASE FILES
CREATE TABLE imported_cases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    billing_cycle_id BIGINT,
    uploaded_by BIGINT,
    filename VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (billing_cycle_id) REFERENCES billing_cycles(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- 6. CUSTOMER CASES
CREATE TABLE customer_cases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    import_id BIGINT,
    billing_cycle_id BIGINT,
    bank_id BIGINT,
    customer_name VARCHAR(150),
    phone VARCHAR(15),
    address TEXT,
    region_id BIGINT,
    amount_due DECIMAL(10,2),
    dpd INT,
    bucket INT,
    cons_type ENUM('CONS', 'NON-CONS'),
    lm_status VARCHAR(50),
    stabilized ENUM('yes', 'no') DEFAULT 'no',
    status ENUM('unpaid', 'ptp', 'paid', 'skip', 'refused', 'dispute') DEFAULT 'unpaid',
    assigned_to BIGINT,
    assigned_by BIGINT,
    case_source ENUM('admin', 'telecaller', 'supervisor'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (billing_cycle_id) REFERENCES billing_cycles(id),
    FOREIGN KEY (import_id) REFERENCES imported_cases(id)
);

-- 7. FOLLOW-UP LOGS
CREATE TABLE followups (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    user_id BIGINT,
    status ENUM('ptp', 'paid', 'not_available', 'skip', 'refused', 'dispute'),
    remark TEXT,
    next_followup_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 8. VISITS (GPS LOG)
CREATE TABLE visits (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    fos_id BIGINT,
    start_time DATETIME,
    end_time DATETIME,
    start_lat DECIMAL(10,6),
    start_lng DECIMAL(10,6),
    end_lat DECIMAL(10,6),
    end_lng DECIMAL(10,6),
    visit_photo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id),
    FOREIGN KEY (fos_id) REFERENCES users(id)
);

-- 9. PAYMENTS
CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT,
    collected_by BIGINT,
    amount DECIMAL(10,2),
    payment_mode ENUM('cash', 'upi', 'cheque', 'bank'),
    reference_number VARCHAR(100),
    proof TEXT,
    collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES customer_cases(id),
    FOREIGN KEY (collected_by) REFERENCES users(id)
);

-- 10. SHORTCODES (REMARK CODES)
CREATE TABLE shortcodes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20),
    description TEXT,
    visible_to ENUM('telecaller', 'fos', 'supervisor', 'all'),
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- 11. NOTIFICATIONS
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    message TEXT,
    seen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. AUDIT LOGS
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

