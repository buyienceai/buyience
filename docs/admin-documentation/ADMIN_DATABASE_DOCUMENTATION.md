# Admin Database Documentation

**Rule:** Only schemas found in source are documented. Core commerce tables are **not** in the dashboard or marketing frontend repos.

---

## 1. Where data lives

| Data domain | Storage | Location in code |
|-------------|---------|------------------|
| Products, orders, quotes, customers, users, roles, settings | Remote admin API DB | **Unverified** (not in frontend repos) |
| BVM26 survey responses | Neon Postgres (dashboard) | `buyience-app-dashboard/src/lib/survey/bvm26Db.ts` |
| Marketing lead submissions | Neon Postgres (GitHub website only) | `buyience/lib/db/schema.ts` |
| Marketing blog posts | Git files (MDX + TS) | `content/blog/*.mdx`, `app/blog/data/posts.ts` |
| Desktop marketing forms | None | Client mock only |

---

## 2. Dashboard local schema — survey

**File:** `buyience-app-dashboard/src/lib/survey/bvm26Db.ts`  
**Connection env:** `SURVEY_DATABASE_URL` or fallback `DATABASE_URL`  
**Driver:** `@neondatabase/serverless`

### Table `bvm26_survey_responses`

| Column | Type | Notes |
|--------|------|-------|
| `response_id` | TEXT | Primary key |
| `submitted_at` | TIMESTAMPTZ | |
| `answers` | JSONB | Survey payload |
| `created_at` | TIMESTAMPTZ | |

**Index:** `bvm26_survey_responses_submitted_at_idx`  
**Also:** CSV backup under `data/surveys/bvm26-responses.csv`

No Prisma/Drizzle for commerce in the dashboard repo.

---

## 3. GitHub marketing website schema — leads

**Present on:** `C:\Users\ADMIN\OneDrive\Documents\GitHub\buyience`  
**Absent on:** Desktop `buyience` (no Drizzle / no `lib/db`)

| File | Role |
|------|------|
| `lib/db/schema.ts` | Drizzle schema |
| `lib/db/index.ts` | `getDb()` via `DATABASE_URL` |
| `drizzle.config.ts` | Postgres dialect, schema path |

### Table `lead_submissions`

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK |
| `form_type` | text/enum | `demo` \| `contact` \| `solution_partner` \| `technology_partner` |
| `email` | text | Indexed |
| `payload` | jsonb | Validated fields |
| `honeypot_triggered` | boolean | |
| `ip` | text/null | From request headers |
| `user_agent` | text/null | |
| `created_at` | timestamp | |

**Admin UI to browse leads:** Missing on marketing site and not verified in dashboard.

---

## 4. Desktop marketing website

**No database.** No `DATABASE_URL` usage, no ORM, no lead table.

---

## 5. Relationships (verified vs unverified)

```
[Dashboard SPA] --REST--> [Remote Admin API DB]  // products, orders, users, … Unverified DDL
[Dashboard SPA] --SQL---> [Neon survey table]     // verified
[GitHub website] --SQL--> [Neon lead_submissions] // verified
[Desktop website]         (no DB)
[Both websites] --files-> [MDX blog]              // verified, not a DB
```

There is **no foreign key** in code linking `lead_submissions` to dashboard tenants/users.

---

## 6. Implications for “Admin Database Documentation”

A complete ERD for products/orders/RBAC requires the **backend admin API repository** (not provided in this documentation pass). Frontend service paths imply entities (Product, Order, Quote, Role, …) but column-level schemas are **Unverified**.
