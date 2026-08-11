# Aadesh Portfolio - Simple Black & White Theme

## 🚀 Quick Start

```bash
# Install dependencies (if not done yet)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ What's Built

- ✅ Hero section with CTA
- ✅ Projects showcase (5 projects)
- ✅ Services section
- ✅ Pricing section
- ✅ Contact form + WhatsApp integration
- ✅ Fully responsive (mobile-first)
- ✅ Smooth animations
- ✅ Black & white theme

---

## 🔧 Customization Needed

### 1. Contact Information
Update in `components/Contact.tsx`:
- **WhatsApp Number:** Line 32 - Replace `919999999999` with your number
- **Email:** Line 111 - Replace `aadesh@rizeeweb.com` with your email

### 2. Project Images
Add project images to `/public/images/`:
- studio-abd.jpg
- purplehub.jpg
- wonders.jpg
- cheerspace.jpg
- biospace.jpg

### 3. Email API (Optional)
Set up actual email sending in `app/api/contact/route.ts`:
- Install Resend: `npm install resend`
- Add API key to `.env.local`
- Uncomment the email sending code

---

## 📱 Mobile Optimization

Already optimized for:
- Mobile phones (375px+)
- Tablets (768px+)
- Desktops (1024px+)

---

## 🚀 Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push

# Deploy to Vercel
vercel --prod
```

Or connect your GitHub repo to Vercel dashboard for automatic deployments.

---

## 🎨 Color Customization

Edit `app/globals.css` and `tailwind.config.ts` to change colors.

Current: Black (#0A0A0A) + White (#FAFAFA)

---

## ✨ Features

- ⚡ Lightning fast (Next.js 15)
- 📱 Fully responsive
- 🎨 Smooth animations (Framer Motion)
- 📧 Contact form
- 💬 WhatsApp integration
- 🎯 SEO optimized
- ♿ Accessible

---

## 📝 TODO Before Launch

- [ ] Update WhatsApp number
- [ ] Update email address
- [ ] Add project images
- [ ] Set up email API (optional)
- [ ] Test on mobile devices
- [ ] Deploy to Vercel

---

**Ready to go live! 🚀**
