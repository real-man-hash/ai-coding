# Tasks: AI StudyMate Radar

**Input**: Design documents from `/specs/001-ai-study-radar/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan
- [X] T002 Initialize Next.js project with required dependencies
- [X] T003 [P] Configure TypeScript and ESLint
- [X] T004 [P] Setup TailwindCSS and shadcn/ui
- [X] T005 [P] Configure Drizzle ORM with MySQL

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Setup database schema and migrations framework
- [X] T007 [P] Implement AI client for 火山引擎 API
- [X] T008 [P] Setup API routing and middleware structure
- [X] T009 Create base models/entities that all stories depend on
- [X] T010 Configure error handling and logging infrastructure

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - AI Knowledge Gap Analysis (Priority: P1) 🎯 MVP

**Goal**: Analyze learning content and identify knowledge gaps with visual radar chart

**Independent Test**: Upload sample learning content and verify knowledge gap report generation

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T011 [P] [US1] Contract test for /api/analyze endpoint in tests/contract/test_analyze.ts
- [X] T012 [P] [US1] Integration test for knowledge gap analysis in tests/integration/test_gap_analysis.ts

### Implementation for User Story 1

- [X] T013 [P] [US1] Create LearningContent model in lib/db/schema.ts
- [X] T014 [P] [US1] Create BlindSpot model in lib/db/schema.ts
- [X] T015 [US1] Implement analyze service in lib/services/analyze.ts (depends on T013, T014)
- [X] T016 [US1] Implement /api/analyze endpoint in app/api/analyze/route.ts
- [X] T017 [US1] Create analysis page in app/analyze/page.tsx
- [X] T018 [US1] Implement radar chart visualization using Recharts
- [X] T019 [US1] Add OCR support for image uploads
- [X] T020 [US1] Add validation and error handling for analysis

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Memory Card Generation (Priority: P2)

**Goal**: Generate Q&A memory cards from identified knowledge gaps

**Independent Test**: Select topics from gap report and verify memory card generation

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [X] T021 [P] [US2] Contract test for /api/generate-cards endpoint in tests/contract/test_cards.ts
- [X] T022 [P] [US2] Integration test for memory card generation in tests/integration/test_cards.ts

### Implementation for User Story 2

- [X] T023 [P] [US2] Create Flashcard model in lib/db/schema.ts
- [X] T024 [US2] Implement card generation service in lib/services/cards.ts
- [X] T025 [US2] Implement /api/generate-cards endpoint in app/api/generate-cards/route.ts
- [X] T026 [US2] Create cards page in app/cards/page.tsx
- [X] T027 [US2] Implement card flip animation using framer-motion
- [X] T028 [US2] Add Anki export functionality
- [X] T029 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Study Buddy Matching (Priority: P3)

**Goal**: Match users with compatible study partners based on learning patterns

**Independent Test**: Create user profiles and verify matching algorithm works

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [X] T030 [P] [US3] Contract test for /api/match endpoint in tests/contract/test_match.ts
- [X] T031 [P] [US3] Integration test for buddy matching in tests/integration/test_matching.ts

### Implementation for User Story 3

- [X] T032 [P] [US3] Create User model in lib/db/schema.ts
- [X] T033 [P] [US3] Create BuddyMatch model in lib/db/schema.ts
- [X] T034 [US3] Implement matching service in lib/services/matching.ts
- [X] T035 [US3] Implement /api/match endpoint in app/api/match/route.ts
- [X] T036 [US3] Create buddies page in app/buddies/page.tsx
- [X] T037 [US3] Implement match visualization with progress bars
- [X] T038 [US3] Add AI-suggested discussion topics
- [X] T039 [US3] Integrate with User Stories 1 and 2 components (if needed)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T040 [P] Documentation updates in docs/
- [X] T041 Code cleanup and refactoring
- [X] T042 Performance optimization across all stories
- [X] T043 [P] Additional unit tests (if requested) in tests/unit/
- [X] T044 Security hardening
- [X] T045 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for /api/analyze endpoint in tests/contract/test_analyze.ts"
Task: "Integration test for knowledge gap analysis in tests/integration/test_gap_analysis.ts"

# Launch all models for User Story 1 together:
Task: "Create LearningContent model in lib/db/schema.ts"
Task: "Create BlindSpot model in lib/db/schema.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
