# Migration Guide: Railway to Coolify

This guide helps you migrate your Next.js application from Railway to Coolify when Railway free-tier limits are reached or when you want more control over your infrastructure.

## When to Migrate

Consider migrating to Coolify when:

- Railway free-tier usage approaches 80% (automatic trigger)
- You need more control over infrastructure
- You want to reduce long-term hosting costs
- You require VPN or custom networking
- You need to self-host for compliance reasons

## Pre-Migration Checklist

- [ ] Coolify instance is installed and accessible
- [ ] Domain is configured and DNS propagated
- [ ] SSL certificates are ready (Coolify handles via Let's Encrypt)
- [ ] `master.secrets.json` is available with all secrets
- [ ] Hostinger VPN configured (if needed)
- [ ] Backup of current Railway deployment created

## Step-by-Step Migration

### Step 1: Prepare Coolify Instance

1. **Install Coolify** (if not already installed):
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```

2. **Access Coolify Dashboard**:
   - Open your Coolify URL (e.g., `https://coolify.yourdomain.com`)
   - Complete initial setup if first time

3. **Create New Project**:
   - Click "New Project"
   - Name it `darya-next-js-landing-page`

### Step 2: Configure Repository

1. **Add Git Source**:
   - Navigate to "Sources" → "Add Source"
   - Select GitHub
   - Authorize Coolify to access your repository
   - Select `executiveusa/darya-next-js-landing-page`

2. **Configure Build**:
   ```yaml
   Build Pack: Nixpacks
   Build Command: npm install && npm run build
   Start Command: npm start
   Base Directory: /
   Port: 3000
   ```

### Step 3: Environment Variables Migration

1. **Export from Railway** (optional, for reference):
   ```bash
   # Railway CLI method (if using Railway CLI)
   railway variables
   ```

2. **Import to Coolify**:
   - Navigate to Environment Variables in Coolify
   - Add each variable from your `master.secrets.json`:

   **Required Variables:**
   ```
   NEXT_PUBLIC_BASE_URL=https://your-coolify-domain.com
   NEXT_PUBLIC_SITE_NAME=Next.js Starter
   ```

   **Optional Variables (for full functionality):**
   ```
   SENDGRID_API_KEY=SG.xxxxx
   EMAIL_FROM=noreply@yourdomain.com
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXX
   RECAPTCHA_SECRET_KEY=6LeXXXXXX
   ```

### Step 4: Configure Resources

Set resource limits to match your requirements:

```yaml
Memory Limit: 512MB (minimum) - 2GB (recommended)
CPU Limit: 0.5 cores (minimum) - 2 cores (recommended)
Replicas: 1 (for free tier equivalent)
```

### Step 5: Configure Domain

1. **Add Custom Domain**:
   - Navigate to "Domains" in Coolify
   - Add your custom domain
   - Update DNS records as instructed by Coolify

2. **Enable SSL**:
   - Coolify automatically provisions Let's Encrypt certificates
   - Wait for SSL provisioning (usually 1-2 minutes)

### Step 6: First Deployment

1. **Trigger Build**:
   - Click "Deploy" in Coolify dashboard
   - Monitor build logs for errors

2. **Verify Deployment**:
   - Check build logs for successful completion
   - Access health check endpoint: `https://your-domain.com/`
   - Test main application features

### Step 7: Traffic Migration

1. **Update DNS Records**:
   - Point your domain from Railway to Coolify
   - Wait for DNS propagation (up to 48 hours, typically 15-30 minutes)

2. **Monitor Both Platforms**:
   - Keep Railway deployment active during DNS propagation
   - Monitor traffic on both platforms

3. **Verify Traffic Shift**:
   - Confirm requests are hitting Coolify instance
   - Check application logs in Coolify

### Step 8: Maintenance Mode on Railway

1. **Deploy Maintenance Page to Railway**:
   ```bash
   # Copy maintenance.html to public directory
   # Deploy as static site on Railway
   ```

2. **Reduce Railway Resources**:
   - Scale down Railway deployment to minimum
   - Or suspend Railway deployment entirely

3. **Update Documentation**:
   - Update README with new deployment URL
   - Update any hardcoded references

### Step 9: Hostinger VPN Configuration (If Needed)

1. **Configure VPN Tunnel**:
   ```bash
   # On Hostinger VPS
   sudo apt update
   sudo apt install wireguard
   
   # Generate WireGuard config
   wg genkey | tee privatekey | wg pubkey > publickey
   ```

2. **Connect to Coolify**:
   ```bash
   # Configure WireGuard interface
   # Update Coolify network settings
   # Test connectivity
   ```

3. **Update Firewall Rules**:
   ```bash
   # Allow traffic from VPN
   sudo ufw allow from <vpn-subnet> to any port 3000
   ```

### Step 10: Post-Migration Verification

- [ ] All application features working
- [ ] Forms submitting correctly
- [ ] Email sending operational (if configured)
- [ ] reCAPTCHA working (if configured)
- [ ] SSL certificate valid
- [ ] Health checks passing
- [ ] Logs accessible in Coolify dashboard
- [ ] Performance acceptable (load time, responsiveness)

## Rollback Plan

If issues occur during migration:

1. **Immediate Rollback**:
   - Revert DNS to point back to Railway
   - Railway deployment should still be active

2. **Troubleshooting Period**:
   - Fix issues on Coolify without affecting production
   - Test thoroughly before re-attempting migration

3. **Railway Cleanup** (after successful migration):
   - Wait 48-72 hours to ensure stability
   - Archive Railway project
   - Document final state for future reference

## Cost Comparison

### Railway Free Tier
- $5/month credit
- Limited execution hours
- Shared resources
- Automatic scaling limits

### Coolify Self-Hosted
- VPS cost (typically $5-20/month)
- Unlimited execution hours
- Dedicated resources
- Full control over scaling

## Monitoring & Maintenance

### Coolify Monitoring

1. **Built-in Metrics**:
   - CPU usage
   - Memory usage
   - Network traffic
   - Response times

2. **Log Management**:
   - Application logs available in dashboard
   - Export logs for long-term storage

3. **Alerts** (configure in Coolify):
   - Deployment failures
   - Resource exhaustion
   - Health check failures

### Backup Strategy

```bash
# Regular backups of Coolify configuration
# Database backups (if using database)
# Application state backups
```

## Troubleshooting

### Build Fails on Coolify

```bash
# Check Node.js version
node --version

# Verify dependencies
npm ci

# Check build logs in Coolify
```

### Application Won't Start

```bash
# Verify PORT environment variable
# Check start command
# Review application logs
```

### Domain Not Resolving

```bash
# Check DNS propagation
dig your-domain.com

# Verify Coolify domain configuration
# Check SSL certificate status
```

### Performance Issues

```bash
# Increase resource limits in Coolify
# Check for memory leaks in logs
# Optimize Next.js build configuration
```

## Additional Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [Hostinger VPN Setup Guide](https://www.hostinger.com/tutorials/vpn)
- Railway to Coolify Migration Forum: [Coolify Discord](https://discord.gg/coolify)

## Support

If you encounter issues during migration:

1. Check Coolify logs first
2. Review this migration guide
3. Consult `.agents` file for environment variable requirements
4. Join Coolify Discord for community support
5. Review `COOLIFY_SUPPORT.md` for additional configuration details
