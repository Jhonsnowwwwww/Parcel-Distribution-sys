# parcel-distribution-system

Monorepo skeleton for a parcel distribution system.

Repository layout:

- backend/  - Node.js + Express + PostgreSQL API
  - src/    - application source
  - config/ - configuration files
  - tests/  - backend tests

- frontend/ - React + Tailwind CSS UI
  - src/    - application source
  - public/ - static public assets

- database/ - PostgreSQL scripts & migrations
  - migrations/ - migration files
  - seeders/    - seed data

- docs/     - documentation
  - architecture/ - architecture docs

This repository contains only the initial folder structure. Next steps:

- Initialize package.json files for backend and frontend
- Add README files inside each package with setup instructions
- Add basic Express server and React app bootstrap
- Add database migration tooling (e.g., knex, sequelize, or prisma)

