import { sanityClient } from "@/sanity/client";
import { profile as fallbackProfile, socials as fallbackSocials, nav as fallbackNav } from "@/data/portfolio";
import Logo from "./Logo";

type ProfileFields = { email: string; phone: string; address: string; availability: string };
type SocialItem    = { label: string; href: string };
type NavItem       = { label: string; href: string };

const PROFILE_QUERY = `*[_type == "profile"][0] { email, phone, address, availability }`;
const SOCIALS_QUERY = `*[_type == "socialLink"] | order(order asc) { label, href }`;
const NAV_QUERY     = `*[_type == "navItem"] | order(order asc) { label, href }`;

export default async function Footer() {
  const [profileData, socialItems, navItems] = await Promise.all([
    sanityClient.fetch<ProfileFields | null>(PROFILE_QUERY, {}, { next: { revalidate: 0 } }),
    sanityClient.fetch<SocialItem[]>(SOCIALS_QUERY, {}, { next: { revalidate: 0 } }),
    sanityClient.fetch<NavItem[]>(NAV_QUERY, {}, { next: { revalidate: 0 } }),
  ]);
  const profile = profileData ?? fallbackProfile;
  const socials = socialItems.length ? socialItems : fallbackSocials;
  const nav     = navItems.length   ? navItems     : fallbackNav;

  return (
    <footer className="bg-[var(--dark-bg)] text-[var(--dark-foreground)] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-8 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="#top"
              className="flex items-center text-[var(--dark-foreground)]"
              aria-label="Joy Das — home"
            >
              <Logo className="h-8 w-auto text-[var(--dark-foreground)]" />
            </a>
            <p className="mt-5 text-sm text-[var(--dark-muted)] max-w-xs leading-relaxed">
              UI/UX &amp; Product Designer, building thoughtful digital
              experiences from Bengaluru.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--dark-muted)]">
              [ Reach out ]
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--accent)] transition-colors">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-[var(--accent)] transition-colors">
                  {profile.phone}
                </a>
              </li>
              <li className="text-[var(--dark-foreground)]/85">{profile.address}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--dark-muted)]">
              [ Elsewhere ]
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--accent)] transition-colors">
                    {s.label}
                    <span aria-hidden className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate column hidden on mobile per Figma */}
          <div className="hidden md:block">
            <p className="text-xs uppercase tracking-widest text-[var(--dark-muted)]">
              [ Navigate ]
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#top" className="hover:text-[var(--accent)] transition-colors">Home</a>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-[var(--accent)] transition-colors">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* JOY DAS watermark — fills the bottom area */}
      <div aria-hidden className="relative w-full overflow-hidden -mt-4 sm:-mt-8 pointer-events-none select-none">
        <p className="text-center font-extrabold tracking-tighter text-white/[0.04] leading-[0.85] text-[clamp(140px,26vw,360px)]">
          <span className="sm:hidden">JOY<br />DAS</span>
          <span className="hidden sm:inline">JOY DAS</span>
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-6 pb-8 border-t border-[var(--dark-border)]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 text-xs text-[var(--dark-muted)]">
          <p className="inline-flex items-center gap-2 order-2 sm:order-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--card-signage)]" />
            {profile.availability}
          </p>
          <p className="text-center sm:text-right order-1 sm:order-2">
            © {new Date().getFullYear()} Joy Das · Designed with love
            <span className="hidden sm:inline"> &amp; a lot of Inter Semi Bold</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
