# Coolify Deployment Support

This document provides guidance for deploying this Next.js application to Coolify as an alternative to Railway.

## Overview

Coolify is a self-hosted, open-source Platform as a Service (PaaS) that can be deployed on your own infrastructure. This project includes configuration markers for Coolify deployment via Hostinger VPN tunneling.

## Prerequisites

1. **Coolify Instance**: A running Coolify installation (self-hosted or managed)
2. **Hostinger VPN** (Optional): For secure tunneling if deploying behind NAT/firewall
3. **Domain**: A domain name pointing to your Coolify instance
4. **Secrets**: Access to your `master.secrets.json` for environment variables

## Coolify Configuration

### Build Settings

```yaml
Build Pack: Nixpacks (or Docker)
Build Command: npm install && npm run build
Start Command: npm start
Port: 3000
```

### Environment Variables

Copy these from your `master.secrets.json` or `.agents` file:

**Required:**
- `NEXT_PUBLIC_BASE_URL` - Your Coolify deployment URL
- `NEXT_PUBLIC_SITE_NAME` - Your site name

**Optional (for full functionality):**
- `SENDGRID_API_KEY` - SendGrid API key for emails
- `EMAIL_FROM` - Email address for form submissions
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA secret key

### Resource Limits

For cost-effective deployment, set these limits in Coolify:

```yaml
Memory: 512MB - 1GB
CPU: 0.5 - 1 core
Instances: 1
```

## Hostinger VPN Setup

If you're deploying Coolify on a server behind NAT or requiring VPN access:

### 1. Configure VPN Tunnel

```bash
# Install WireGuard or OpenVPN on your Hostinger VPS
# Configure tunnel to your Coolify instance
# Update firewall rules to allow port 3000 (or your configured port)
```

### 2. Network Configuration

```nginx
# Example Nginx proxy configuration for Hostinger
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. SSL/TLS

Coolify handles SSL automatically via Let's Encrypt. Ensure your domain is properly configured.

## Deployment Steps

1. **Connect Repository**: Link your GitHub repository to Coolify
2. **Configure Environment**: Add all required environment variables from `.agents`
3. **Set Resource Limits**: Configure memory and CPU limits
4. **Deploy**: Trigger initial deployment
5. **Verify**: Check deployment logs and access your public URL

## Health Checks

Coolify supports health checks. Configure:

```yaml
Health Check Path: /
Health Check Port: 3000
Health Check Interval: 30s
```

## Advantages Over Railway

- **No cost ceiling**: Pay only for your server resources
- **Full control**: Self-hosted, complete infrastructure control
- **VPN support**: Easy integration with Hostinger VPN for secure deployments
- **No vendor lock-in**: Open-source solution

## Troubleshooting

### Build Failures

```bash
# Check Coolify build logs
# Verify Node.js version compatibility
# Ensure all dependencies are in package.json
```

### Runtime Errors

```bash
# Check application logs in Coolify dashboard
# Verify environment variables are set correctly
# Check port configuration matches startCommand
```

### Network Issues

```bash
# Verify VPN tunnel is active
# Check firewall rules
# Confirm DNS records are correct
```

## Migration from Railway

See `COOLIFY_MIGRATION.md` for detailed migration steps from Railway to Coolify.

## Support Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Coolify Discord](https://discord.gg/coolify)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
