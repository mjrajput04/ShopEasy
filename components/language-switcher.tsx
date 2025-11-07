"use client"

import { useEffect, useState } from "react"

const translations = {
  en: {
    'current-language': 'English',
    'login-text': 'Login',
    'products-text': 'Products',
    'about-text': 'About Us',
    'career-text': 'Career',
    'contact-text': 'Contact Us',
    'shopease-title': 'ShopEase',
    'welcome-text': 'Welcome to',
    'company-name': 'ShopEase & Co Ltd.',
    'heritage-title': 'A HERITAGE OF 2 DECADES',
    'heritage-desc1': 'ShopEase founded in 2004 as a Premium Belt Manufacturer is now 20 years young today. SE has become the first choice Company to supply Automotive and Industrial Belts to customers worldwide and is the largest belt manufacturer from startup to the US.',
    'heritage-desc2': 'Today SE is the No.1 supplier of V-Belts, Timing Belts, and Industrial Belts, which holds the largest market sharing in automotive and industrial sectors.',
    'heritage-desc3': 'Today ShopEase stands proud as premier manufacturer of Automotive Belts, Industrial Belts and Agricultural Belts under popular brand name \'ShopEase\'. SE also produces world class Quality Belts and Precision Engineering Solutions.',
    'company-title': 'ALL IN ONE ROOF! EVERYTHING IN STORE!',
    'company-desc1': 'ShopEase is a leading manufacturer in premium belt solutions with its Automotive Belts, Industrial Belts, Agricultural Belts, Power Transmission Components, and Precision Engineered Products.',
    'company-desc2': 'The core functions like R&D, Quality Control, Manufacturing Excellence and Technical Support operate under the strict supervision of the Corporate office as SE believes that a high degree of precision can meet the demanding needs of the automotive and industrial sectors.',
    'view-all': 'View All',
    'automotive-belts': 'AUTOMOTIVE BELTS',
    'industrial-belts': 'INDUSTRIAL BELTS',
    'agricultural-belts': 'AGRICULTURAL BELTS',
    'stats-years': 'Years of Manufacturing Experience',
    'stats-products': 'Products Manufactured per day',
    'stats-factories': 'Factories',
    'stats-offices': 'Sales Offices',
    'whatsapp-support': 'WhatsApp Support: +91 77 55 99 44 87',
    'company-message': 'In ShopEase, Products are regularly evaluated & technology updated, matching the latest design requirements, so that our customers are satisfied.',
    'write-to-us': 'Write to Us',
    'quick-links': 'Quick Links',
    'production': 'Production',
    'contact-us': 'Contact us',
    'company-address': 'ShopEase & Co Ltd',
    'copyright': '© 2025 ShopEase & Co Ltd',
    'find-products': 'Find Products',
    'search-placeholder': 'Search products...',
    'category-filter': 'Category',
    'price-range-text': 'Price Range',
    'all-products-title': 'All Products',
    'showing-text': 'Showing',
    'products-count-text': 'products',
    'out-of-stock': 'Out of Stock',
    'view-button': 'View',
    'no-products-found': 'No products found matching your filters.',
    'product-not-found': 'Product Not Found',
    'product-not-found-desc': 'Sorry, we couldn\'t find the product you\'re looking for.',
    'return-to-products': 'Return to Products',
    'back-to-products': 'Back to Products',
    'in-stock': 'In Stock',
    'free-shipping': 'Free shipping on orders over $100',
    'product-description': 'High-quality belt engineered for superior performance and durability. Manufactured with precision using premium materials to ensure optimal power transmission and long service life. Ideal for automotive, industrial, and agricultural applications.',
    'quantity-label': 'Quantity',
    'add-to-cart': 'Add to Cart',
    'added-to-cart': 'Added to Cart!',
    'money-back': 'Money Back',
    'warranty': 'Warranty',
    'support': 'Support',
    'related-products': 'Related Products'
  },
  hi: {
    'current-language': 'हिंदी',
    'login-text': 'लॉगिन',
    'products-text': 'उत्पाद',
    'about-text': 'हमारे बारे में',
    'career-text': 'करियर',
    'contact-text': 'संपर्क करें',
    'shopease-title': 'शॉपईज़',
    'welcome-text': 'आपका स्वागत है',
    'company-name': 'शॉपईज़ एंड कंपनी लिमिटेड',
    'heritage-title': '2 दशकों की विरासत',
    'heritage-desc1': 'शॉपईज़ की स्थापना 2004 में एक प्रीमियम बेल्ट निर्माता के रूप में हुई थी और आज यह 20 साल का हो गया है। SE दुनिया भर के ग्राहकों को ऑटोमोटिव और औद्योगिक बेल्ट की आपूर्ति करने वाली पहली पसंद की कंपनी बन गई है।',
    'heritage-desc2': 'आज SE वी-बेल्ट, टाइमिंग बेल्ट और औद्योगिक बेल्ट का नंबर 1 आपूर्तिकर्ता है, जो ऑटोमोटिव और औद्योगिक क्षेत्रों में सबसे बड़ी बाजार हिस्सेदारी रखता है।',
    'heritage-desc3': 'आज शॉपईज़ \'शॉपईज़\' के लोकप्रिय ब्रांड नाम के तहत ऑटोमोटिव बेल्ट, औद्योगिक बेल्ट और कृषि बेल्ट के प्रमुख निर्माता के रूप में गर्व से खड़ा है।',
    'company-title': 'एक ही छत के नीचे सब कुछ!',
    'company-desc1': 'शॉपईज़ अपने ऑटोमोटिव बेल्ट, औद्योगिक बेल्ट, कृषि बेल्ट, पावर ट्रांसमिशन घटकों और सटीक इंजीनियर उत्पादों के साथ प्रीमियम बेल्ट समाधानों में एक अग्रणी निर्माता है।',
    'company-desc2': 'आर एंड डी, गुणवत्ता नियंत्रण, विनिर्माण उत्कृष्टता और तकनीकी सहायता जैसे मुख्य कार्य कॉर्पोरेट कार्यालय की सख्त निगरानी में संचालित होते हैं।',
    'view-all': 'सभी देखें',
    'automotive-belts': 'ऑटोमोटिव बेल्ट',
    'industrial-belts': 'औद्योगिक बेल्ट',
    'agricultural-belts': 'कृषि बेल्ट',
    'stats-years': 'वर्षों का विनिर्माण अनुभव',
    'stats-products': 'प्रतिदिन निर्मित उत्पाद',
    'stats-factories': 'कारखाने',
    'stats-offices': 'बिक्री कार्यालय',
    'whatsapp-support': 'व्हाट्सएप सहायता: +91 77 55 99 44 87',
    'company-message': 'शॉपईज़ में, उत्पादों का नियमित रूप से मूल्यांकन किया जाता है और तकनीक को अपडेट किया जाता है, जो नवीनतम डिज़ाइन आवश्यकताओं से मेल खाता है।',
    'write-to-us': 'हमें लिखें',
    'quick-links': 'त्वरित लिंक',
    'production': 'उत्पादन',
    'contact-us': 'संपर्क करें',
    'company-address': 'शॉपईज़ एंड कंपनी लिमिटेड',
    'copyright': '© 2025 शॉपईज़ एंड कंपनी लिमिटेड',
    'find-products': 'उत्पाद खोजें',
    'search-placeholder': 'उत्पाद खोजें...',
    'category-filter': 'श्रेणी',
    'price-range-text': 'मूल्य सीमा',
    'all-products-title': 'सभी उत्पाद',
    'showing-text': 'दिखा रहे हैं',
    'products-count-text': 'उत्पाद',
    'out-of-stock': 'स्टॉक में नहीं',
    'view-button': 'देखें',
    'no-products-found': 'आपके फिल्टर से मेल खाने वाले कोई उत्पाद नहीं मिले।',
    'product-not-found': 'उत्पाद नहीं मिला',
    'product-not-found-desc': 'खुशी, हमें वह उत्पाद नहीं मिला जिसकी आप तलाश कर रहे हैं।',
    'return-to-products': 'उत्पादों पर वापस जाएं',
    'back-to-products': 'उत्पादों पर वापस',
    'in-stock': 'स्टॉक में उपलब्ध',
    'free-shipping': '$100 से अधिक के ऑर्डर पर मुफ्त शिपिंग',
    'product-description': 'उच्च गुणवत्ता वाला बेल्ट जो उत्कृष्ट प्रदर्शन और दीर्घायु के लिए इंजीनियर किया गया है। प्रीमियम सामग्री का उपयोग करके सटीकता के साथ निर्मित।',
    'quantity-label': 'मात्रा',
    'add-to-cart': 'कार्ट में जोड़ें',
    'added-to-cart': 'कार्ट में जोड़ दिया!',
    'money-back': 'पैसा वापसी',
    'warranty': 'वारंटी',
    'support': 'सहायता',
    'related-products': 'संबंधित उत्पाद'
  }
}

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('English')

  const switchLanguage = (lang: 'en' | 'hi') => {
    const texts = translations[lang]
    Object.keys(texts).forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        element.textContent = texts[id as keyof typeof texts]
      }
    })
    setCurrentLang(texts['current-language'])
    localStorage.setItem('language', lang)
  }

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'hi' || 'en'
    switchLanguage(savedLang)
  }, [])

  return (
    <div className="relative group">
      <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-all duration-300 flex items-center gap-2">
        <span>{currentLang}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full right-0 mt-1 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button onClick={() => switchLanguage('en')} className="block w-full px-4 py-3 text-left text-foreground hover:bg-secondary transition">
          English
        </button>
        <button onClick={() => switchLanguage('hi')} className="block w-full px-4 py-3 text-left text-foreground hover:bg-secondary transition">
          हिंदी
        </button>
      </div>
    </div>
  )
}