# ClassManager — Project Memory

## What We're Building
A SaaS tool for **freelance teachers** managing online 1-on-1 classes.
One teacher, one subject, 20–50 students. Web app first.

## Tech Stack
- **Frontend**: Next.js (App Router) + Tailwind CSS + shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel
- **Cost**: $0 to start

## Data Model

### Teacher
- id, name, email, subject, timezone

### Course
- id, teacher_id, name, description
- A teacher can have multiple courses/levels (e.g. "Grade 5 Math", "Grade 8 Math")

### Student
- id, teacher_id, course_id
- name, email, phone, status (active/inactive)

### Session
- id, teacher_id, student_id
- scheduled_at (datetime), meet_link
- status: scheduled | completed | cancelled
- notes (post-session)
- Rescheduling = update scheduled_at directly (no history tracking in MVP)

### Attendance
- id, session_id
- outcome: attended | no-show | cancelled

### SyllabusTopic
- id, course_id, title, order_index
- parent_topic_id (nullable — for sub-topics)

### StudentProgress
- id, student_id, topic_id, session_id
- status: introduced | in-progress | completed

### FeePackage
- id, teacher_id, name, session_count, amount

### StudentFee
- id, student_id, package_id
- sessions_used, paid (boolean), paid_at

## Build Phases (MVP)
- **Phase 1**: Auth + Teacher profile + Dashboard shell
- **Phase 2**: Course management + Student management
- **Phase 3**: Sessions (schedule, reschedule, meet link)
- **Phase 4**: Attendance marking
- **Phase 5**: Syllabus topics + Student progress tracking
- **Phase 6**: Fee packages + Payment tracking

## Out of Scope (MVP)
- Leave tracking
- Group classes
- Actual payment processing
- Mobile app
- Student-facing booking (teacher books, generates Meet link manually)
- Google Calendar API integration (Phase 2 candidate)

## Claude Code Learning Curriculum
| Build Stage | Concept | Status |
|-------------|---------|--------|
| Project setup | Hooks | 🔲 Next |
| Building components | Custom Skills | 🔲 |
| Data model | Plan Mode / Agents | 🔲 |
| Testing | Evals | 🔲 |
| Repetitive tasks | Loop skill | 🔲 |
| AI features in-app | Claude API / Agent SDK | 🔲 |

## Key Decisions
- Rescheduling: update session in place, no history for MVP
- No student self-booking: teacher creates sessions
- Meet links: teacher pastes manually (Google Calendar API integration later)
- Levels/grades: supported via Course entity
