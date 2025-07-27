import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

function ContactInfoBox() {
  return (
          <div className="bg-gray-50 p-6 rounded-xl shadow space-y-4 text-gray-800">
        <p>
          <strong>تلفن:</strong> 77777777-۰۲۱
        </p>
        <p>
          <strong>موبایل پشتیبانی:</strong> ۰۹۱۲۴۵۶۷۸۹۰
        </p>
        <p>
          <strong>آدرس:</strong> تهران، خیابان ولیعصر، نرسیده به پارک ملت، پلاک
          ۱۲۳
        </p>

        <div className="pt-2">
          <p className="font-semibold mb-2">شبکه‌های اجتماعی:</p>
          <div className="flex items-center gap-4 ">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              aria-label="تلگرام"
            >
              <FaTelegramPlane className="text-xl"/>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
              aria-label="اینستاگرام"
            >
              <FaInstagram className="text-xl"/>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
              aria-label="واتساپ"
            >
              <FaWhatsapp className="text-xl"/>
            </a>
          </div>
        </div>
      </div>

  )
}

export default ContactInfoBox