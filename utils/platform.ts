const platformRules: Record<string, string> = {
    'youtube.com': 'YouTube',
    'youtu.be': 'YouTube',
    'facebook.com': 'Facebook',
    'instagram.com': 'Instagram',
    'docs.google.com': 'Google',
    'drive.google.com': 'Google',
    'twitter.com': 'Twitter',
    'x.com': 'Twitter',
};

export function detectPlatform(url: string): string {
    try {
        const hostname = new URL(url).hostname;
        const wwwHostname = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
        
        for (const domain in platformRules) {
            if (wwwHostname === domain) {
                return platformRules[domain];
            }
        }
    } catch (error) {
        console.warn(`Could not parse URL for platform detection: ${url}`, error);
    }
    return 'Other';
}