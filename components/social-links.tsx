import { socialLinks } from '@/lib/social';

function SocialIcon({ name }: { name: (typeof socialLinks)[number]['name'] }) {
  if (name === 'Facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.4V6.9c0-.7.5-.9 1-.9h2.6V2.2L14.3 2c-3.5 0-5.2 2.1-5.2 5.5v.9H6v4.3h3.1V22h5.1v-9.3h3.4l.7-4.3h-4.1Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.7" r="1" className="social-dot" /></svg>;
}

export function SocialLinks() {
  return <div className="social-links" aria-label="Profile Fundacji w mediach społecznościowych">
    {socialLinks.map(link => <a key={link.name} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.name} Fundacji — otwórz w nowej karcie`} title={link.name}><SocialIcon name={link.name} /></a>)}
  </div>;
}
