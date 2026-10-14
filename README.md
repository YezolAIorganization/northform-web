
# Northform — Strength & Conditioning Studio

A modern website concept for a boutique strength and conditioning studio, designed around coached classes, class scheduling, trainer profiles, trial bookings, and membership plans.

**Live website:** https://northform-web.vercel.app

> **Project disclosure:** Northform is a fictional concept project by Shah, created to demonstrate web development and product design skills. It is not a representation of a real operating fitness studio.

## Overview

Northform features a dark, minimal interface with warm ember-orange accents, clear typography, and responsive layouts. The experience is designed to help visitors explore classes, find a suitable training session, and manage their bookings.

## Features

- Responsive homepage and navigation
- Class schedule with upcoming sessions and available spots
- Trainer profiles
- Class booking and cancellation workflows
- User authentication and account management
- Free trial request form
- Membership plans and contact form
- Supabase database integration
- Row Level Security (RLS) and database-backed booking rules
- Server-rendered pages and dynamic schedule data

## Technology Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Backend and database:** Supabase
- **Deployment:** Vercel
- **Typography:** Bricolage Grotesque and Inter

## Design Direction

- Dark interface with a charcoal background
- Ember-orange accent color (`#FF5B2E`)
- Minimal layouts and subtle borders
- Consistent spacing and responsive components
- A visual system designed for a premium boutique fitness brand

## Local Development

### Prerequisites

- Node.js and npm
- A Supabase project with the required database schema and configuration

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/YezolAIorganization/northform-web.git
cd northform-web
```

Install dependencies:

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

## Backend Notes

The project uses Supabase for authentication and data storage. Its database design includes profiles, trainers, class types, classes, bookings, trial requests, and contact messages.

Database policies and booking functions enforce application rules, including class capacity and booking eligibility. A compatible Supabase schema and configuration are required for the application to function fully.

Email confirmation is disabled in the current demo configuration.

## Security

- Keep environment files and credentials out of Git.
- Use only the public/publishable Supabase key in browser-accessible code.
- Never expose a Supabase service-role key in client-side code.
- Keep authorization and data access protected by appropriate Supabase policies.

## Project Status

This repository represents a portfolio concept project. Features and integrations are developed for demonstration purposes and may require additional configuration before production use.

## License

No open-source license has been specified. All rights are reserved by default unless a separate license is added.
