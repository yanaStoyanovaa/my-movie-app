# My-Movie-App

A simple movie search app that lets users look up movies by title, leveraging The Movie Database (TMDb) API.

## Features

- **Search Functionality**: Enter a movie title to see suggestions and results.
- **Movie Details**: Each result displays the movie's poster, title, and overview.
- **Responsive Design**: Optimized for desktop and mobile views.

## Tech Stack

- **Next.js**: Provides server-side rendering, routing, and optimized builds.
- **TypeScript**: Adds type safety to the codebase, making it easier to scale and maintain.
- **Tailwind CSS**: Used for responsive and utility-first styling.
- **Vercel**: Hosts the app with seamless deployment and scaling.

## Getting Started

### Prerequisites

- **TMDb API Key**: Sign up on [TMDb](https://www.themoviedb.org/) and get your API key from the API section in account settings.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd my-movie-app

2. Install dependencies:

   ```bash
   npm install

3. Add your TMDb API key to .env.local:

   ```bash
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here


4. Start the app:

   ```bash
   npm run dev
