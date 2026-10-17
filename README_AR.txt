Z7L HOOD — دليل تشغيل البوت والموقع للمبتدئ

مهم جدًا:
- لا ترسل DISCORD_TOKEN لأي شخص ولا تضعه داخل index.html أو GitHub.
- إذا انكشف التوكن، اعمل Reset من Developer Portal قبل النشر.
- استضافة 24/7 عادةً تحتاج خطة مدفوعة لا تنام. الخطة المجانية قد تتوقف أو تنام.
- هذا مشروع بداية؛ تحتاج تضبط المتغيرات وتفعّل intents كما بالأسفل.

1) جهّز البوت في Discord Developer Portal:
   - افتح تطبيق البوت > Bot.
   - فعّل Server Members Intent.
   - فعّل Presence Intent.
   - لا تحتاج Administrator؛ امنح البوت أقل صلاحيات لازمة.

2) اعرف Server/Guild ID:
   - في Discord فعّل Developer Mode من User Settings > Advanced.
   - اضغط يمين على سيرفرك > Copy Server ID.

3) ارفع المشروع إلى GitHub:
   - فك ضغط الملف.
   - أنشئ Repository جديدًا في حسابك.
   - ارفع ملفات المشروع والمجلد public.
   - لا ترفع أي ملف فيه التوكن.

4) على Render:
   - أنشئ Web Service من مستودع GitHub.
   - Build Command: npm install
   - Start Command: npm start
   - أضف Environment Variables:
       DISCORD_TOKEN = التوكن (سرّي)
       GUILD_ID = رقم سيرفرك
   - اختر خطة مناسبة للتشغيل المستمر 24/7؛ تحقق من الأسعار والقيود الحالية في Render.

5) بعد نجاح النشر:
   - افتح رابط الخدمة، مثل https://اسم-الخدمة.onrender.com
   - اختبر /api/health ثم /api/stats
   - إذا كانت إحصائيات المتصلين لا تعمل، تأكد أن Presence Intent مفعّل وأن البوت أُعيد تشغيله.

6) ربط موقع منفصل:
   - في public/index.html ابحث عن: const API_BASE = "";
   - ضع رابط خدمة Render داخل علامتي اقتباس، مثال:
       const API_BASE = "https://اسم-الخدمة.onrender.com";
   - انشر تحديث الموقع. لا تضع التوكن في ملف الموقع أبدًا.

ملاحظة: إن كان الموقع سيُستضاف منفصلًا عن البوت، فقد تحتاج إعداد CORS على الخادم بحسب طريقة الاستضافة. الأفضل للمبتدئ أولًا نشر الموقع والبوت من نفس خدمة Render لتقليل التعقيد.
