# Deployment Guide - Railway Zero-Secrets Architecture

This guide provides comprehensive instructions for deploying this Next.js application to Railway with a zero-secrets bootstrapping approach.

## Overview

This project implements a **Railway Zero-Secrets Deployment** architecture that allows the application to:

1. Deploy successfully on Railway without any external API keys
2. Run with reduced functionality (stubs) when optional integrations are not configured
3. Automatically manage secrets via `.agents` file and local `master.secrets.json`
4. Enforce cost protection guardrails to stay within free-tier limits
5. Support migration to Coolify when Railway limits are reached

## Quick Start - Railway Deployment

### Prerequisites

- GitHub account with this repository
- Railway account (free tier: https://railway.app/)
- Node.js 16+ (for local testing)

### One-Click Deploy

1. **Fork or Clone Repository**
   ```bash
   git clone https://github.com/executiveusa/darya-next-js-landing-page.git
   cd darya-next-js-landing-page
   ```

2. **Connect to Railway**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select this repository
   - Railway will automatically detect `railway.toml` configuration

3. **Configure Environment Variables** (Optional)
   
   The application will run without these, but for full functionality:
   
   **Required:**
   - `NEXT_PUBLIC_BASE_URL` - Automatically set by Railway
   - `NEXT_PUBLIC_SITE_NAME` - "Next.js Starter" (default)
   
   **Optional:**
   - `SENDGRID_API_KEY` - For email sending (form submissions work without this)
   - `EMAIL_FROM` - Email address for forms
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - For spam protection
   - `RECAPTCHA_SECRET_KEY` - Server-side reCAPTCHA validation

4. **Deploy**
   - Railway automatically builds and deploys
   - Wait 3-5 minutes for first deployment
   - Access your public URL (Railway provides this automatically)

## Architecture Components

### 1. `.agents` File

Located at repository root, this file contains:
- Complete list of all environment variables
- Secret classifications (core, optional, required)
- Format specifications for each secret
- Stub behavior when secrets are missing
- Machine-readable schema for automation

**Purpose:** Enables a separate secrets-provisioning agent to inject real secrets later.

### 2. `master.secrets.json`

Located at repository root (gitignored), this file contains:
- Centralized secrets for all your projects
- Placeholder values for this project
- Structure mirrors `.agents` file

**Security Note:** This file is never committed to git. It exists only on your local machine.

### 3. `railway.toml`

Railway deployment configuration with:
- Build and start commands
- Environment variable mappings
- Cost protection resource limits (512MB RAM, 1 instance)
- Health check configuration

### 4. Stub Implementations

**Email Stub** (`utils/email.js`):
- Detects missing `SENDGRID_API_KEY`
- Logs email content to console instead of sending
- Returns success status for seamless UX

**reCAPTCHA Stub** (`utils/recaptcha.js`):
- Detects missing `RECAPTCHA_SECRET_KEY`
- Automatically validates forms (fail-open approach)
- Logs validation attempts to console

### 5. Maintenance Mode

**`maintenance.html`**:
- Static HTML page for when service is suspended
- Auto-refreshes every 5 minutes
- Displayed when free-tier limits are reached

## Cost Protection Features

### Free-Tier Guardrails

The `railway.toml` includes:

```toml
[deploy.resourceLimits]
memory = 512  # Maximum 512MB RAM

[deploy.scaling]
minReplicas = 1
maxReplicas = 1  # Prevent auto-scaling
```

### Monitoring

Railway automatically tracks:
- Memory usage
- CPU usage
- Bandwidth
- Build minutes

**Alert Threshold:** When usage reaches 80% of free tier, consider:
1. Optimizing application
2. Migrating to Coolify (see `COOLIFY_MIGRATION.md`)

## Deployment Modes

### Mode 1: Zero-Secrets (Default)

Deploy without any optional secrets:
- Forms work but emails are logged to console
- No reCAPTCHA validation (forms still work)
- Full UI functionality
- Perfect for demos, testing, development

**Railway Variables:**
```env
NEXT_PUBLIC_BASE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_PUBLIC_SITE_NAME=Next.js Starter
```

### Mode 2: Email-Only

Add SendGrid for email functionality:

**Railway Variables:**
```env
NEXT_PUBLIC_BASE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_PUBLIC_SITE_NAME=Next.js Starter
SENDGRID_API_KEY=SG.your_api_key_here
EMAIL_FROM=your@email.com
```

### Mode 3: Full Production

All integrations configured:

**Railway Variables:**
```env
NEXT_PUBLIC_BASE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_PUBLIC_SITE_NAME=Your Site Name
SENDGRID_API_KEY=SG.your_api_key_here
EMAIL_FROM=your@email.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## Local Development

### Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/executiveusa/darya-next-js-landing-page.git
   cd darya-next-js-landing-page
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Local Environment File**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env`** (Optional - works without these):
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=Next.js Starter
   
   # Optional
   SENDGRID_API_KEY=
   EMAIL_FROM=
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
   RECAPTCHA_SECRET_KEY=
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Test Application**
   - Open http://localhost:3000
   - Submit a form
   - Check console for stub email logs (if no SendGrid key)

### Building for Production

```bash
# Build
npm run build

# Test production build locally
npm start
```

## Secret Management Workflow

### For Individuals

1. **Edit `master.secrets.json`** (local file):
   ```json
   {
     "projects": {
       "darya-next-js-landing-page": {
         "SENDGRID_API_KEY": "SG.real_key_here",
         "EMAIL_FROM": "real@email.com"
       }
     }
   }
   ```

2. **Manually Add to Railway**:
   - Go to Railway project settings
   - Add environment variables
   - Redeploy

### For Teams (Recommended)

1. **Use Railway Secrets Management**:
   - Store secrets in Railway environment variables
   - Team members access via Railway dashboard
   - No need to share secrets directly

2. **Or Use External Secret Manager**:
   - AWS Secrets Manager
   - HashiCorp Vault
   - Railway's native secrets
   - Create automation to sync from `.agents` spec

## Troubleshooting

### Build Fails

```bash
# Check Node version
node --version  # Should be 16+

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Application Won't Start

1. Check Railway logs
2. Verify `railway.toml` is present
3. Ensure build completed successfully
4. Check health check endpoint

### Forms Not Sending Email

**Expected if SendGrid not configured** - emails are logged to console:
- Check Railway application logs
- Look for `[EMAIL STUB]` messages
- To enable: add `SENDGRID_API_KEY` and `EMAIL_FROM`

### reCAPTCHA Not Working

**Expected if reCAPTCHA not configured** - validation is skipped:
- Forms still work
- Check logs for `[RECAPTCHA STUB]` messages
- To enable: add both reCAPTCHA keys

## Migration Paths

### To Coolify

When Railway free-tier is exhausted:
- See `COOLIFY_MIGRATION.md` for step-by-step guide
- See `COOLIFY_SUPPORT.md` for Coolify configuration

### To Vercel/Netlify

This project works on any Node.js hosting:
1. Fork repository
2. Connect to Vercel/Netlify
3. Add environment variables from `.agents` file
4. Deploy

## Maintenance Mode

### Triggering Maintenance Mode

When free-tier limits are reached, Railway can serve `maintenance.html`:

1. **Manual Approach**:
   - Deploy `maintenance.html` as static site
   - Update DNS/routing to point to static page
   - Suspend main application

2. **Automated Approach** (Future Enhancement):
   - Script monitors Railway usage
   - Auto-deploys maintenance page at 80% threshold
   - Sends notification

### Exiting Maintenance Mode

1. Resolve resource constraints (migrate to Coolify or upgrade Railway)
2. Redeploy main application
3. Update routing to point back to app

## Security Best Practices

1. **Never Commit Secrets**
   - `master.secrets.json` is gitignored
   - Use environment variables for all secrets
   - `.env` files are gitignored

2. **Rotate Keys Regularly**
   - Update SendGrid API keys quarterly
   - Regenerate reCAPTCHA keys if compromised

3. **Use HTTPS**
   - Railway provides automatic HTTPS
   - Never disable SSL/TLS

4. **Validate Inputs**
   - Application includes form validation
   - reCAPTCHA adds spam protection

## Performance Optimization

### Railway Optimizations

1. **Build Cache**: Railway caches `node_modules`
2. **Edge Network**: Railway uses global CDN
3. **HTTP/2**: Automatically enabled

### Application Optimizations

1. **Next.js Optimizations**:
   - Image optimization (next/image)
   - Code splitting (automatic)
   - Font optimization (@next/font)

2. **Resource Limits**:
   - 512MB RAM keeps costs low
   - Single instance sufficient for landing pages

## Support & Resources

### Documentation
- [Railway Documentation](https://docs.railway.app/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [SendGrid API Docs](https://docs.sendgrid.com/)
- [Google reCAPTCHA Docs](https://developers.google.com/recaptcha)

### This Repository
- `.agents` - Secret specifications
- `COOLIFY_SUPPORT.md` - Coolify deployment guide
- `COOLIFY_MIGRATION.md` - Migration from Railway to Coolify
- `maintenance.html` - Maintenance mode page

### Getting Help

1. Check Railway logs first
2. Review `.agents` file for required variables
3. Test locally with `npm run dev`
4. Check GitHub issues
5. Railway Discord community

## Appendix: Environment Variable Reference

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_BASE_URL` | ✅ | Railway auto-sets | Application base URL |
| `NEXT_PUBLIC_SITE_NAME` | ✅ | "Next.js Starter" | Site name in emails/meta |
| `SENDGRID_API_KEY` | ❌ | - | Email sending (stubbed if missing) |
| `EMAIL_FROM` | ❌ | "noreply@example.com" | Form submission email |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ❌ | - | reCAPTCHA (stubbed if missing) |
| `RECAPTCHA_SECRET_KEY` | ❌ | - | reCAPTCHA server validation |

## License

See repository LICENSE file.
