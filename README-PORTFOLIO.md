# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring a unique three-column layout with smooth animations and a beautiful blue theme.

## Features

- **Responsive Design**: Works seamlessly across all devices
- **Project Showcase**: Interactive project gallery with detailed views
- **Skills Display**: Organized skill presentation by category
- **Contact Form**: Built-in contact functionality
- **Performance Optimized**: Static export for fast loading times
- **SEO Ready**: Full metadata and social sharing support

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

## Deployment

This portfolio is optimized for static hosting. After building, deploy the `out` directory to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Cloudflare Pages

## Customization

1. **Personal Information**: Update `common/portfolio-data.ts` with your details
2. **Projects**: Add your projects to the projects array
3. **Skills**: Update the skills section with your technologies
4. **Theme**: The blue theme can be customized in `global.scss`

## Structure

```
├── components/          # React components
├── common/             # Data and types
├── app/                # Next.js app directory
├── public/             # Static assets
└── styles/             # SCSS modules
```

## Technologies

- Next.js 15.3.3
- React 19.1.0
- SCSS Modules
- TypeScript

## License

MIT