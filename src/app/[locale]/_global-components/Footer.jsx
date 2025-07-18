import "@/public/scss/footer.scss";
import { Link } from "@/src/navigation";
import Facebook from "@/src/app/[locale]/_global-components/LayoutElements/socials/Facebook";
import Instagram from "@/src/app/[locale]/_global-components/LayoutElements/socials/Instagram";
import Twitter from "@/src/app/[locale]/_global-components/LayoutElements/socials/Twitter";
import LinkedIn from "@/src/app/[locale]/_global-components/LayoutElements/socials/LinkedIn";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("Footer");
  const tM = useTranslations("Menu");
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="_container">
            <div className="site-info">
              <Link href="/">
                <img alt="logo" src="/images/logo.svg" />
              </Link>
              <p>
                {t("aboutCompany")}
              </p>
              <div className="footer-socials">
                <Facebook />
                <Instagram />
                <Twitter />
                <LinkedIn size={40} />
              </div>
            </div>
            <div className="navigation">
              <div>
                <h2>{t('colOneTitle')}</h2>
                <nav>
                  <Link href="/">{tM('home')}</Link>
                  <Link href="/services">{tM('services')}</Link>
                  <Link href="/how-it-works">{tM('howItWorks')}</Link>
                  <Link href="/pricing">{tM('pricing')}</Link>
                </nav>
              </div>
              <div>
                <h2>{t('colTwoTitle')}</h2>
                <nav>
                  <Link href="/about-us">{tM('about')}</Link>
                  <Link href="/blog">{tM('blog')}</Link>
                  <Link href="/faq">{tM('faq')}</Link>
                  <Link href="/contact-us">{tM('contact')}</Link>
                </nav>
              </div>
              <div>
                <h2>{t('colThreeTitle')}</h2>
                <nav>
                  <Link href="/terms-and-conditions">{tM('terms')}</Link>
                  <Link href="/privacy-policy">{tM('privacy')}</Link>
                  <Link href="/cookie-policy">{tM('cookie')}</Link>
                </nav>
              </div>
              <div>
                <h2>{t('colFourTitle')}</h2>
                <nav>
                  <span>
                  {t('address')}
                  </span>
                  <Link href="mailto:info@vancantgroup.com">
                    info@vancantgroup.com
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="_container">
            {t('copyright')}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
