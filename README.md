# ERP CRM - Customer Management

A high-performance Customer Management interface built with Angular 19 for an ERP platform.

The application provides customer listing, searching, filtering, pagination, column management, customer creation, and customer editing using a modern Angular architecture.

---

## Features

- Customer listing
- Customer creation
- Customer editing
- Client-side pagination
- Global customer search
- Column-level filtering
- Dynamic column visibility
- CSV export
- Responsive ERP-oriented UI
- Loading states and skeletons
- Error handling
- Reactive Forms
- Angular Signals
- RxJS
- PrimeNG
- Standalone Angular Components
- `ChangeDetectionStrategy.OnPush`
- Reusable Customer Table component

---

## Tech Stack

- Angular 17+
- TypeScript
- RxJS
- Angular Signals
- Reactive Forms
- PrimeNG
- SCSS
- HttpClient

---

## Architecture

The application follows a component-based architecture with a clear separation of responsibilities.

```text
src/
├── app/
│   ├── components/
│   │   └── customer-table/
│   │       ├── customer-table.component.ts
│   │       ├── customer-table.component.html
│   │       └── customer-table.component.scss
│   │
│   ├── models/
│   │   ├── customer.model.ts
│   │   └── customer-create.model.ts
│   │
│   ├── pages/
│   │   ├── customer-list/
│   │   └── customer-create/
│   │
│   └── services/
│       └── customer.service.ts
│
└── ...
