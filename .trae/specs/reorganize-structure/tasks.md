# Tasks

- [x] Task 1: Create new directory structure
    - [x] Create `src/views/Home`, `src/views/MySpace/Car`, `src/views/MySpace/Digital`, `src/views/MySpace/Photography`, `src/views/Records`, `src/views/Learning`
    - [x] Create `src/content`
    - [x] Create `src/components/Shared`
    - [x] Create `src/data/car`, `src/data/records`

- [x] Task 2: Move files to new locations
    - [x] Move Views: `Home.vue`, `MySpace.vue` family, `Records.vue` family, `Learning.vue` family.
    - [x] Move Content: `src/records` -> `src/content/records`, `src/car-basics` -> `src/content/car-basics`.
    - [x] Move Components: `NavBar.vue`, `ProfileCard.vue` -> `src/components/Shared`.
    - [x] Move Data: `cars.json` etc -> `src/data/car`, `records.js` -> `src/data/records`.

- [x] Task 3: Update references and imports
    - [x] Update `src/router/index.js`
    - [x] Update `src/data/records/records.js` (require.context)
    - [x] Update `src/data/car/carBasics.js` (require.context)
    - [x] Update `scripts/convert_sales_2025.js`
    - [x] Update imports in `App.vue`
    - [x] Update imports in all moved View components
    - [x] Update imports in all moved Component files (if any)

- [x] Task 4: Verification
    - [x] Verify `npm run serve` (or build) works
    - [x] Check all routes manually or via test
