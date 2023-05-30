# Duro | Simple, Effective, and Affordable way to manage virtual queues

Duro is a virtual queue management system that allows customers to make an appointment and join a virtual queue by scanning a QR code or sending SMS to a mobile number. Customers are assigned a spot on the queue and receive tailored communication (SMS or notifications) to ensure they get in, only when it's their turn. The QR code and mobile phone number are displayed visibly and outside the premises.

The system can be configured for these to change on a routine (e.g daily or hourly), and can use geo-fencing. This way, the business can decide to prohibit people from saving a spot friends until they show up at the premises.

Duro is a solution to the problem of crowded waiting rooms, jumping the queue, and disgruntled customers putting pressure on maxed-out staff. It is a simple and effective way to manage virtual queues, and it can be customized to meet the needs of any business.

Here are some of the benefits of using Duro:

Reduced wait times: Duro can help to reduce wait times by up to 50%. This is because customers are assigned a spot on the queue and are notified when it is their turn.
Improved customer satisfaction: Duro can help to improve customer satisfaction by reducing wait times and providing customers with a more personalized experience.
Increased efficiency: Duro can help businesses to increase efficiency by reducing the amount of time that staff spend managing queues.
If you are looking for a solution to the problem of crowded waiting rooms, Duro is a great option. It is a simple, effective, and affordable way to manage virtual queues.

![Landing Page](https://github.com/PipelineV2/duro-team-lambda-fe/assets/26861798/d32f2752-3f7b-474f-9b97-b1ae6bc7c62c)

## Features

- 💎 QR code scanning: Customers can scan a QR code to join the queue.
- 💎 SMS: Customers can join the queue by sending an SMS to a mobile number.
- 💎 Geo-fencing: The system can be configured to use geo-fencing to prevent customers from saving a spot before they arrive at the premises.
- 💎 Tailored communication: Customers can receive tailored communication (SMS or notifications) to ensure they get in, only when it’s their turn.
- 💎 Queue management: The system can be used to manage queues of any size.
- 💎 Customization: The system can be customized to meet the needs of any business.
- 💎 Affordability: Duro is an affordable solution for businesses of all sizes.

These are just a few of the features that make Duro a powerful and versatile virtual queue management system. If you are looking for a way to reduce wait times, improve customer satisfaction, and increase efficiency, Duro is a great option.

## Built with

- ⚡️ Next.js 13
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3 — Configured with CSS Variables to extend the **primary** color

- 🃏 Jest — Configured for unit testing
- 📈 Absolute Import and Path Alias — Import components using `@/` prefix
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- ⏰ Release Please — Generate your changelog by activating the `release-please` workflow
- 👷 Github Actions — Lint your code on PR
- 🚘 Automatic Branch and Issue Autolink — Branch will be automatically created on issue **assign**, and auto linked on PR
- 🔥 Snippets — A collection of useful snippets
- 👀 Default Open Graph — Awesome open graph generated using [og](https://github.com/theodorusclarence/og), fork it and deploy!
- 🗺 Site Map — Automatically generate sitemap.xml
- 📦 Expansion Pack — Easily install common libraries, additional components, and configs

## Getting Started

### 1. Clone the repo:

```
git clone https://github.com/PipelineV2/duro-team-lambda-fe.git
```

### 2. Install dependencies

It is encouraged to use **yarn** so the husky hooks can work properly.

```bash
cd duro-team-lambda-fe
yarn install
```

### 3. Run the development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### 4. Refer to the BE API documentation

`src/firebase/apis/README.md` - [HERE](src/firebase/apis/README.md)
