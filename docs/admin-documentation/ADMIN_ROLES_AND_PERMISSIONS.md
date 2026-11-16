# Admin Roles and Permissions

**Project:** `buyience-app-dashboard`

---

## 1. Model summary

| Layer | Implementation | Status |
|-------|----------------|--------|
| Source of truth | Backend `GET /dashboard` permission payload | Backend-dependent |
| Frontend store | Redux `formattedPermissions` / `assignedAccess` | Implemented |
| Check helper | `useIsResourceAllowed(resource, action)` | Implemented |
| Superadmin bypass | `type === 'superadmin'` skips checks | Implemented |
| Quote scopes | `all` / `assigned` / `none` | Implemented |
| CASL Ability | Template leftover; **buggy grant-all** | Do not rely on |

Roles themselves are **API-driven** (`/roles`, `/role_permission`) — not a fixed enum in the frontend for custom roles.

---

## 2. User `type` values found in code

| Type | Behaviour |
|------|-----------|
| `superadmin` | Bypasses resource checks in nav + `ProtectedRoute` |
| `admin` | Normal RBAC via permission matrix |
| `vendor` | Appears in ACL/register flows |
| `client` | CASL demo / ACL page only |

Assignable users in role UI often filtered to `type === 'admin'`.

---

## 3. Permission check flow

```
Login success
  → GET /dashboard
  → Redux permissions slice (src/store/apps/permissions/index.ts)
  → useIsResourceAllowed / ProtectedRoute / nav filtering
  → (superadmin) allow all
```

Quote-specific access: `src/utils/quotes/quoteAccess.ts`.

---

## 4. Resource strings referenced in UI (non-exhaustive)

Examples observed in nav/guards:

`Abandoned checkout`, `Advanced Discount`, `Billing & Usage`, `Catalogue`, `Customers`, `Discounts`, `Floor Margin`, `Integration` / `Integrations`, `Inventory`, `Markets`, `Orders`, `Payment`, `Payment methods`, `Payment Terms`, `Price visibility`, `Product Configurations`, `Products`, `Quotes`, `Receivables`, `Returns`, `SEO Advance Settings`, `Shipping`, `Shipping label`, `Store Settings`, `Tax`, `User`

**Actions** (examples): `read`, `write`, `delete`, `export`, plus composite strings like `catalogue read`, `quote write`.

Exact matrix is defined by backend — **Unverified** without API source.

---

## 5. Role management UI

| Capability | Routes | APIs |
|------------|--------|------|
| List / create / edit roles | `/apps/users/roles/*`, `/apps/user-management/roles/*` | `/roles`, `/role_permission`, updates |
| Assign role to users | `assign-role/[id]` | `/assign-role`, `/assign-roles-users/:id` |
| Delete role permissions | Role UI | `/delete-role-permissions` |

Services: `RolePermissionService.tsx`  
Views: `src/views/apps/roles/*`

---

## 6. Critical frontend authorization defects

### 6.1 CASL always grants manage-all (High)

**File:** `src/configs/acl.ts`  
**Pattern:** `if (type === 'admin' || 'vendor')` — the string `'vendor'` is always truthy, so **every** user gets `can('manage', 'all')` in CASL.

Operational menu gates use Redux permissions more than CASL, but any CASL-based UI must be treated as **unsafe**.

### 6.2 Permission helper fail-open (High)

**File:** `src/store/apps/permissions/index.ts` (`isPermissionAllowed`)  
If a resource is missing from the `/dashboard` payload, the helper returns **`true`**.

**Recommendation:** Fail closed (`false`); enforce every mutation on the backend.

---

## 7. Marketing website

No roles/permissions system exists on Desktop or GitHub marketing sites.

---

## 8. Related paths

```
src/store/apps/permissions/index.ts
src/utils/other/IsResourceAllowed.tsx
src/utils/quotes/quoteAccess.ts
src/configs/acl.ts
src/resuable/ProtectedRouter/index.tsx
src/query-config/services/RolePermissionService.tsx
src/pages/apps/users/roles/
src/pages/apps/user-management/roles/
src/navigation/vertical/index.ts
```
