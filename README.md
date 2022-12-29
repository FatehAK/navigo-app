<div align="center">
  <h2>Navigo</h2>
  <img src="https://img.shields.io/github/package-json/v/fatehak/navigo-app" alt="version" />
<img src="https://img.shields.io/github/package-json/dependency-version/fatehak/navigo-app/react" alt="vite" />
<img src="https://img.shields.io/github/package-json/dependency-version/fatehak/navigo-app/dev/vite" alt="vite" />
<img src="https://img.shields.io/badge/pnpm-latest-yellow" alt="pnpm" />
  <img src="https://img.shields.io/github/actions/workflow/status/fatehak/navigo-app/deploy_prod.yaml?branch=main" alt="build status" />
</div>

Navigo makes searching for places quick and easy by adding drawing capabilities to the map. It makes finding rentals in a particular area or even searching for matching restaurants just a click
away! The app is developed with React.js with PWA support so it can be easily installed on mobile devices as well.

You can view the app at - https://navigo-app.pages.dev

### Features

- Draw on the map and search for places within the region.
- Get place info such as address, phone, rating, photos and reviews.
- Use the nearest Streetview to checkout the surroundings.
- Calculate the distance and time to reach the place.
- Get directions to your chosen place from your home.
- Fully responsive with PWA capabilities for mobile devices.

### Tech Used

- React (Hooks), [Linaria](https://github.com/callstack/linaria) as CSS-in-JS solution
- Workbox for PWA support
- Google Maps API
- Vite for bundling with route based code splitting
- Prettier, Stylelint, Eslint for formatting and linting
- Husky, lint-staged, commitlint for clean linted commits
- Github Actions for CI/CD
- Cloudflare Pages for publishing
