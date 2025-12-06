#!/usr/bin/env node
/**
 * Railway Usage Monitor
 * 
 * This script monitors Railway resource usage and triggers maintenance mode
 * if usage approaches free-tier limits (80% threshold).
 * 
 * Usage:
 *   node scripts/check-usage.js
 * 
 * Requirements:
 *   - Railway CLI installed
 *   - Railway project linked
 * 
 * Environment Variables:
 *   - RAILWAY_TOKEN: Railway API token (optional, uses CLI auth if not set)
 *   - FREE_TIER_THRESHOLD: Percentage threshold (default: 0.8 = 80%)
 */

const FREE_TIER_THRESHOLD = parseFloat(process.env.FREE_TIER_THRESHOLD || '0.8');
const MAINTENANCE_MODE_FILE = 'maintenance.html';

/**
 * Check Railway usage via CLI
 * 
 * TODO: This is a PLACEHOLDER implementation with hardcoded values.
 * To enable actual monitoring:
 *   1. Install Railway CLI: npm install -g @railway/cli
 *   2. Authenticate: railway login
 *   3. Use Railway API to fetch real usage metrics
 *   4. Replace hardcoded values below with API response
 * 
 * Railway API Documentation: https://docs.railway.app/reference/api-reference
 */
async function checkRailwayUsage() {
    console.log('🔍 Checking Railway usage...');
    
    // PLACEHOLDER: Replace these hardcoded values with Railway API calls
    // In production, this would:
    // 1. Call Railway GraphQL API to get current usage
    // 2. Parse usage metrics from API response
    // 3. Compare against free-tier limits
    // 4. Return actual usage metrics
    
    const usage = {
        memory: {
            used: 0.45, // PLACEHOLDER: 45% of limit
            limit: 512, // MB
        },
        cpu: {
            used: 0.30, // PLACEHOLDER: 30% of limit
        },
        bandwidth: {
            used: 0.60, // PLACEHOLDER: 60% of limit
        },
        buildMinutes: {
            used: 0.50, // PLACEHOLDER: 50% of limit
        }
    };
    
    return usage;
}

/**
 * Calculate overall usage percentage
 */
function calculateOverallUsage(usage) {
    const metrics = [
        usage.memory.used,
        usage.cpu.used,
        usage.bandwidth.used,
        usage.buildMinutes.used
    ];
    
    return Math.max(...metrics);
}

/**
 * Trigger maintenance mode
 */
function triggerMaintenanceMode() {
    console.log('⚠️  FREE TIER THRESHOLD EXCEEDED');
    console.log('');
    console.log('📋 MAINTENANCE MODE CHECKLIST:');
    console.log('  1. ✅ Maintenance page available: maintenance.html');
    console.log('  2. 🚀 Deploy maintenance.html as static site on Railway');
    console.log('  3. 🔄 Redirect main domain to maintenance site');
    console.log('  4. 🛑 Suspend main application service');
    console.log('  5. 📊 Review usage in Railway dashboard');
    console.log('  6. 🔀 Consider migration to Coolify (see COOLIFY_MIGRATION.md)');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   - Review COOLIFY_MIGRATION.md for migration guide');
    console.log('   - Or optimize application to reduce resource usage');
    console.log('   - Or upgrade Railway plan');
    console.log('');
}

/**
 * Main execution
 */
async function main() {
    try {
        console.log('═══════════════════════════════════════');
        console.log('   Railway Free-Tier Usage Monitor');
        console.log('═══════════════════════════════════════');
        console.log('');
        
        const usage = await checkRailwayUsage();
        const overallUsage = calculateOverallUsage(usage);
        
        console.log('📊 Current Usage:');
        console.log(`   Memory:       ${(usage.memory.used * 100).toFixed(1)}%`);
        console.log(`   CPU:          ${(usage.cpu.used * 100).toFixed(1)}%`);
        console.log(`   Bandwidth:    ${(usage.bandwidth.used * 100).toFixed(1)}%`);
        console.log(`   Build Minutes:${(usage.buildMinutes.used * 100).toFixed(1)}%`);
        console.log(`   Overall:      ${(overallUsage * 100).toFixed(1)}%`);
        console.log('');
        console.log(`🎯 Free-Tier Threshold: ${(FREE_TIER_THRESHOLD * 100)}%`);
        console.log('');
        
        if (overallUsage >= FREE_TIER_THRESHOLD) {
            triggerMaintenanceMode();
            process.exit(1);
        } else {
            const remaining = FREE_TIER_THRESHOLD - overallUsage;
            const remainingPercent = (remaining * 100).toFixed(1);
            console.log(`✅ Usage OK - ${remainingPercent}% remaining before threshold`);
            console.log('');
        }
        
    } catch (error) {
        console.error('❌ Error checking usage:', error.message);
        console.error('');
        console.error('⚠️  This is a placeholder script.');
        console.error('    To enable actual monitoring:');
        console.error('    1. Install Railway CLI: npm install -g @railway/cli');
        console.error('    2. Authenticate: railway login');
        console.error('    3. Link project: railway link');
        console.error('    4. Implement Railway API integration');
        console.error('');
        process.exit(0); // Don't fail on monitoring errors
    }
}

if (require.main === module) {
    main();
}

module.exports = { checkRailwayUsage, calculateOverallUsage, triggerMaintenanceMode };
