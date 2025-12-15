# 🚀 Deployment Anleitung

## ⭐ EMPFEHLUNG: Vercel (Einfachste & Beste Lösung)

### Warum Vercel?
- ✅ **Kostenlos** für kleine Projekte
- ✅ **Automatische Deployments** bei jedem Git Push
- ✅ **Perfekt für Next.js** - keine Konfiguration nötig
- ✅ **HTTPS automatisch** inklusive
- ✅ **Supabase funktioniert** ohne Probleme
- ✅ **5 Minuten Setup**

### Schritt-für-Schritt:

1. **Code auf GitHub hochladen** (falls noch nicht geschehen)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/DEIN-USERNAME/alternative-opinion.git
   git push -u origin main
   ```

2. **Vercel Account erstellen**
   - Gehe zu [vercel.com](https://vercel.com)
   - Melde dich mit GitHub an

3. **Projekt importieren**
   - Klicke auf "Add New Project"
   - Wähle dein Repository
   - Vercel erkennt automatisch Next.js

4. **Umgebungsvariablen hinzufügen**
   - In den Project Settings → Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = deine Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = dein Supabase Anon Key
   - Diese findest du in deiner Supabase Dashboard → Settings → API

5. **Deploy**
   - Klicke auf "Deploy"
   - Fertig! 🎉

6. **Domain verbinden** (Optional - für deine Strato Domain)
   - In Project Settings → Domains
   - Füge deine Strato-Domain hinzu
   - Folge den DNS-Anweisungen (A-Record oder CNAME)

---

## Alternative: Statischer Export für Strato

**⚠️ WICHTIG:** Diese Option erfordert Code-Änderungen und funktioniert nicht mit allen Features.

Wenn du wirklich Strato nutzen willst:

1. **next.config.js ändern:**
   ```js
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. **Server Components zu Client Components umbauen** (komplex!)

3. **API Routes entfernen** und direkt Supabase nutzen

4. **Build:**
   ```bash
   npm run build
   ```

5. **Dateien hochladen:**
   - Upload den `out/` Ordner per FTP auf Strato

**Aber:** Vercel ist viel einfacher und besser! 🎯

---

## Andere Hosting-Optionen

- **Netlify** - Ähnlich wie Vercel, auch kostenlos
- **Railway.app** - Unterstützt Next.js, kostenloser Tier
- **Render.com** - Kostenloser Tier verfügbar
- **DigitalOcean App Platform** - Bezahlt, aber sehr gut


