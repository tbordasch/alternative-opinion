# 🚀 Nächste Schritte - Webseite online stellen

## ✅ Du hast bereits:
- [x] GitHub Repository erstellt
- [x] Code auf GitHub hochgeladen

## 🎯 Jetzt musst du:

---

## SCHRITT 1: Vercel Account erstellen (2 Minuten)

1. Gehe zu **[vercel.com](https://vercel.com)**
2. Klicke oben rechts auf **"Sign Up"**
3. Wähle **"Continue with GitHub"**
4. Klicke **"Authorize Vercel"** (GitHub Zugriff erlauben)
5. **Fertig!** ✅

---

## SCHRITT 2: Projekt auf Vercel deployen (5 Minuten)

### 2.1 Projekt importieren
1. Nach dem Login siehst du das Vercel Dashboard
2. Klicke auf **"Add New Project"** (großer Button)
3. Du siehst deine GitHub Repositories
4. Finde **"alternative-opinion"** und klicke **"Import"**

### 2.2 Projekt konfigurieren
**Vercel erkennt automatisch:**
- ✅ Framework: Next.js
- ✅ Build Command: `next build`
- ✅ Output Directory: `.next`

**Du musst NICHTS ändern!** Klicke einfach weiter.

### 2.3 ⚠️ WICHTIG: Umgebungsvariablen hinzufügen

**Bevor du auf "Deploy" klickst:**

1. Scrolle nach unten zu **"Environment Variables"**
2. Klicke **"Add"** und füge hinzu:

**Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Deine Supabase URL
  - Findest du in: `.env.local` Datei im Projekt
  - Oder: Supabase Dashboard → Settings → API → Project URL
- **Environment:** Wähle alle 3 aus ☑️ (Production, Preview, Development)

**Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Dein Supabase Anon Key
  - Findest du in: `.env.local` Datei im Projekt
  - Oder: Supabase Dashboard → Settings → API → anon public key
- **Environment:** Wähle alle 3 aus ☑️ (Production, Preview, Development)

**Wo finde ich diese Werte?**
- Öffne deine `.env.local` Datei: `C:\Users\Tim2000isc\Desktop\PC_Coding\alternative-opinion\.env.local`
- Oder: Gehe zu [supabase.com](https://supabase.com) → Dein Projekt → Settings → API

### 2.4 Deploy starten
1. Klicke auf **"Deploy"** (unten rechts)
2. Warte 2-3 Minuten (Vercel baut deine Webseite)
3. **Fertig!** ✅

Du bekommst eine URL wie: `https://alternative-opinion.vercel.app`

**Deine Webseite ist jetzt online!** 🎉

---

## SCHRITT 3: Domain kaufen (Optional - 10 Minuten)

Falls du eine eigene Domain willst (z.B. `alternative-opinion.com`):

### 3.1 Domain-Anbieter wählen

**Empfehlung: Cloudflare** (günstig)
- Gehe zu **[cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/)**
- Suche nach deiner Domain
- Kaufe (ca. $8-10/Jahr)

**Alternative: Namecheap**
- Gehe zu **[namecheap.com](https://www.namecheap.com)**
- Suche und kaufe Domain

**Alternative: IONOS** (deutsch)
- Gehe zu **[ionos.de](https://www.ionos.de)**
- Suche und kaufe Domain

### 3.2 Domain mit Vercel verbinden

1. Gehe zu deinem Vercel Projekt
2. Klicke auf **"Settings"** (oben)
3. Klicke auf **"Domains"** (links im Menü)
4. Klicke **"Add Domain"**
5. Gib deine Domain ein (z.B. `alternative-opinion.com`)
6. Klicke **"Add"**

### 3.3 DNS-Einstellungen

Vercel zeigt dir jetzt **DNS-Einstellungen** an:

**Für Root Domain (alternative-opinion.com):**
- **Type:** A
- **Name:** @
- **Value:** (z.B. `76.76.21.21` - was Vercel dir zeigt)

**Für www (www.alternative-opinion.com):**
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`

### 3.4 DNS bei Domain-Anbieter eintragen

**Bei Cloudflare:**
1. Gehe zu deiner Domain
2. Klicke **"DNS"**
3. Klicke **"Add record"**
4. Füge die Records von Vercel hinzu
5. **Proxy:** Aus (graue Wolke)

**Bei Namecheap:**
1. Domain List → **"Manage"**
2. **"Advanced DNS"**
3. Füge Records hinzu

**Bei IONOS:**
1. Domain-Verwaltung
2. **"DNS-Verwaltung"**
3. Füge Records hinzu

### 3.5 Warten
- DNS-Änderungen brauchen 10-30 Minuten
- Du siehst den Status in Vercel
- Wenn "Valid Configuration" grün ist → **Fertig!** ✅

---

## 📋 Checkliste

- [ ] Vercel Account erstellt
- [ ] Projekt auf Vercel importiert
- [ ] Umgebungsvariablen gesetzt (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Deploy gestartet
- [ ] Webseite funktioniert auf vercel.app URL
- [ ] (Optional) Domain gekauft
- [ ] (Optional) Domain mit Vercel verbunden
- [ ] (Optional) DNS konfiguriert

---

## 🎉 Fertig!

Deine Webseite ist jetzt:
- ✅ Online auf Vercel
- ✅ Mit HTTPS gesichert (automatisch!)
- ✅ Automatische Updates bei jedem `git push`

---

## 🆘 Hilfe bei Problemen

### Problem: Build schlägt fehl
- Prüfe, ob alle Umgebungsvariablen gesetzt sind
- Schaue in Vercel → Deployments → Logs (klicke auf den fehlgeschlagenen Deployment)

### Problem: Supabase funktioniert nicht
- Prüfe Umgebungsvariablen in Vercel
- Stelle sicher, dass `NEXT_PUBLIC_` vorne steht
- Prüfe Supabase Dashboard → Settings → API

### Problem: Domain funktioniert nicht
- Warte 10-30 Minuten (DNS braucht Zeit)
- Prüfe DNS-Einstellungen nochmal
- In Vercel → Domains → Status prüfen

---

## 💡 Tipp

Nach dem ersten Deploy:
- Jedes Mal wenn du `git push` machst → Automatisches Update!
- Keine manuellen Uploads mehr nötig

**Viel Erfolg!** 🚀


