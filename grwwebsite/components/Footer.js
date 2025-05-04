import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '../contexts/LocaleContext'
import translations from '../locales/translations.json'
import {
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWeixin,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa'

export default function Footer() {
  const { locale } = useLocale()
  const t = translations[locale].footer

  return (
    <footer className="bg-[#0023a3] text-white py-12 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/images/grwlogo.png"
              width={260}
              height={80}
              alt={t.logoAlt}
            />
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <ul className="space-y-2">
            <li><Link href="/">{t.nav.home}</Link></li>
            <li><Link href="/services">{t.nav.services}</Link></li>
            <li><Link href="/meet-us">{t.nav.meet}</Link></li>
          </ul>
        </div>

        {/* Office Info */}
        <div>
          <h4 className="font-semibold mb-4">{t.office.heading}</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              {t.office.phone}
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              {t.office.email1}
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              {t.office.email2}
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-4">{t.socialHeading}</h4>
          <div className="flex space-x-4 text-2xl">
            <Link href={t.socialLinks.linkedin}><FaLinkedin className="hover:text-[#ff3b31]" /></Link>
            <Link href={t.socialLinks.twitter}><FaTwitter className="hover:text-[#ff3b31]" /></Link>
            <Link href={t.socialLinks.wechat}><FaWeixin className="hover:text-[#ff3b31]" /></Link>
            <Link href={t.socialLinks.instagram}><FaInstagram className="hover:text-[#ff3b31]" /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-white/20 pt-6 text-sm">
        {t.copyright}
      </div>
    </footer>
  )
}
