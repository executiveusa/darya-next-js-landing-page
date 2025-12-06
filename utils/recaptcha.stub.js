/**
 * reCAPTCHA Stub for Zero-Secrets Deployment
 * 
 * This module provides a fallback when Google reCAPTCHA credentials are not available.
 * It logs validation attempts to console instead of making actual API calls.
 */

// Constants
const TOKEN_PREVIEW_LENGTH = 20; // Number of characters to show in token preview

/**
 * Verify the reCAPTCHA token (stubbed version)
 * 
 * @param {string} token - The reCAPTCHA token from the client
 * @returns {Promise<Object>} Validation result
 */
export async function verifyRecaptcha(token) {
    // Check if reCAPTCHA secret is configured
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
        console.log('🔒 [RECAPTCHA STUB] Validation skipped (reCAPTCHA not configured):');
        console.log('   Token received:', token ? token.substring(0, TOKEN_PREVIEW_LENGTH) + '...' : 'null');
        console.log('   Result: Auto-approved (stub mode)');
        
        return {
            success: true,
            stub: true,
            score: 1.0,
            message: 'reCAPTCHA validation skipped (not configured)'
        };
    }
    
    // If secret is configured, perform actual validation
    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        });
        
        const data = await response.json();
        return {
            success: data.success,
            stub: false,
            score: data.score,
            message: data.success ? 'reCAPTCHA validated successfully' : 'reCAPTCHA validation failed'
        };
    } catch (error) {
        console.error('❌ [RECAPTCHA ERROR]:', error.message);
        
        // Fail open in production to avoid blocking users
        return {
            success: true,
            stub: true,
            error: error.message,
            message: 'reCAPTCHA validation error - auto-approved'
        };
    }
}
