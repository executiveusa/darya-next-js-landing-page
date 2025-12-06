/**
 * Email Stub for Zero-Secrets Deployment
 * 
 * This module provides a fallback when SendGrid credentials are not available.
 * It logs email attempts to console instead of sending actual emails.
 */

module.exports = class EmailStub {
    constructor(template, subject, labels, fields, attachments) {
        this.siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Next.js Starter';
        this.host = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        this.template = template;
        this.labels = labels;
        this.fields = fields;
        this.to = process.env.EMAIL_FROM || 'noreply@example.com';
        this.from = {
            email: process.env.EMAIL_FROM || 'noreply@example.com',
            name: `${fields?.firstname} ${fields?.lastname}`
        };
        this.subject = subject;
        this.attachments = attachments;
    }

    /**
     * Simulates sending email by logging to console
     */
    async send() {
        console.log('📧 [EMAIL STUB] Email would be sent (SendGrid not configured):');
        console.log('   To:', this.to);
        console.log('   From:', this.from);
        console.log('   Subject:', this.subject);
        console.log('   Fields:', JSON.stringify(this.fields, null, 2));
        
        if (this.attachments && this.attachments.length > 0) {
            console.log('   Attachments:', this.attachments.length, 'file(s)');
        }
        
        // Log the generated HTML content
        const generatedTemplate = this.generateTemplate();
        console.log('   HTML Preview (first 200 chars):', generatedTemplate.html.substring(0, 200) + '...');
        
        return {
            success: true,
            stub: true,
            message: 'Email logged to console (SendGrid not configured)'
        };
    }

    /**
     * Generates email template
     * @returns {Object} an object containing the email template
     */
    generateTemplate() {
        const content = Object.entries(this.fields).reduce((str, [key, value]) => {
            return (str += `<p style="margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; color: #51545E;"><strong>${this.labels?.[key]}: </strong>${value}</p>`);
        }, '');

        this.template = this.template
        .replaceAll('%SITENAME%', this.siteName)
        .replaceAll('%HOST%', this.host)
        .replace('%CONTENT%', content)
        .replace('%YEAR%', new Date().getFullYear());

        return {
            html: this.template
        };
    }
}
