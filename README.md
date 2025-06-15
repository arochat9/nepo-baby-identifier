# Nepo Baby Identifier

This project is a web application built using the [Next.js](https://nextjs.org) framework. It allows users to identify and explore actors and their connections in the entertainment industry. The app is designed to be fast, scalable, and developer-friendly.

## Features

- **Nepo Baby Game**: Users are presented with two actors and must choose which one is the "nepo baby."

## Tech Stack

- **Next.js**: A React-based framework for building server-rendered and statically generated web applications.
- **TypeScript**: Provides static typing for better code quality and maintainability.
- **PostCSS**: Used for styling with modern CSS features.
- **Palantir Foundry**: Used as the backend for data storage and processing.
- **Vercel**: Hosting platform for deployment and scalability.

## Project Structure

The project follows a modular structure to keep the codebase organized and maintainable:

```
/Volumes/git/nepo-baby-identifier
├── public/                # Static assets (e.g., images, icons)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── api/           # API routes
│   │   │   ├── actors/    # Actor-related API endpoints
│   │   ├── guessWhichActor/ # UI components for actor guessing game
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # App layout
│   │   ├── page.tsx       # Main page
│   ├── lib/               # Reusable libraries and hooks
│   │   ├── hooks/         # Custom React hooks
│   │   ├── server/        # Server-side utilities
│   │   │   ├── foundry/   # Foundry client utilities
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd nepo-baby-identifier
   ```

2. **Setup .env file**:
   This just needs the client secret for the Foundry OSDK

3. **Install dependencies**:
   First, visit the following URL to get the latest SDK for Palantir Foundry:
   [Palantir Foundry SDK Generation](https://magic.usw-3.palantirfoundry.com/workspace/developer-console/app/ri.third-party-applications.main.application.1adb359a-e205-404f-88f1-025f022e27de/sdk/generation?packageType=npm)

   Then, run the following commands:

   ```bash
   export FOUNDRY_TOKEN=\{TOKEN HERE\}
   npm install @service-user-for-actor-apps/sdk@^0.5.0 @osdk/client@^2.1.5 @osdk/oauth@^1.0.0 @osdk/foundry@latest
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Key Files

- **`src/app/api/actors/getActorCount/route.ts`**: API route to fetch the total number of actors.
- **`src/app/api/actors/listActors/route.ts`**: API route to list all actors.
- **`src/app/guessWhichActor/actorButton.tsx`**: Component for actor selection.
- **`src/lib/hooks/useActorCount.ts`**: Custom hook to fetch actor count.
- **`src/lib/hooks/useActors.ts`**: Custom hook to fetch actor data.

## Development Notes

- **Dynamic API Routes**: The API routes are located under `src/app/api/`. Each route is self-contained and follows the Next.js API conventions.
- **Custom Hooks**: Reusable hooks are located in `src/lib/hooks/` to encapsulate logic for fetching and managing data.
- **Styling**: Global styles are defined in `globals.css`. Component-specific styles can be added inline or using CSS modules.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript.
- [PostCSS Documentation](https://postcss.org/) - Learn about PostCSS.
- [Palantir Foundry Documentation](https://www.palantir.com/platforms/foundry/) - Learn about Foundry.
- [Vercel Documentation](https://vercel.com/docs) - Learn about Vercel.

## License

This project is licensed under the MIT License.
