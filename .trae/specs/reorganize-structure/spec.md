# Reorganize Project Structure Spec

## Why
The current project structure is flat and becoming difficult to manage. Files are mixed together in `src/views` and `src/data` without clear functional boundaries. Reorganizing files by functionality (feature-based) will improve maintainability, readability, and scalability.

## What Changes
- **Directory Structure**:
    - Create `src/views/Home` for home-related views.
    - Create `src/views/MySpace` and subdirectories (`Car`, `Digital`, `Photography`) for MySpace features.
    - Create `src/views/Records` for records-related views.
    - Create `src/views/Learning` for learning-related views.
    - Create `src/content` to house markdown content (`records`, `car-basics`).
    - Create `src/components/Shared` for shared components.
    - Reorganize `src/data` into `car` and `records` subdirectories.

- **File Moves**:
    - Move all View components to their respective feature folders.
    - Move markdown content folders to `src/content`.
    - Move shared components to `src/components/Shared`.
    - Move data files to `src/data/car` and `src/data/records`.

- **Code Updates**:
    - Update `src/router/index.js` with new view paths.
    - Update `src/data/records/records.js` and `src/data/car/carBasics.js` to point to new content paths.
    - Update all import statements in `.vue` and `.js` files to reflect new paths (using `@/` alias where possible).
    - Update `scripts/convert_sales_2025.js` paths.

## Impact
- **Affected specs**: None.
- **Affected code**: 
    - `src/router/index.js`
    - `src/views/*.vue`
    - `src/components/*.vue`
    - `src/data/*.js`
    - `scripts/*.js`
    - `App.vue`

## ADDED Requirements
None.

## MODIFIED Requirements
### Requirement: Project Structure
The project SHALL follow a feature-based directory structure.

#### Scenario: Developer Navigation
- **WHEN** a developer looks for car-related views
- **THEN** they should find them in `src/views/MySpace/Car/`

- **WHEN** a developer looks for data files
- **THEN** they should find them categorized in `src/data/`

## REMOVED Requirements
None.
