# 🔍 Wo finde ich Environment Variables in Vercel?

## Schritt-für-Schritt Anleitung:

### Schritt 1: Zum Projekt Dashboard
1. Du bist gerade auf der **Deployment-Seite** (siehst "Build Failed")
2. Klicke oben links auf **"alternative-opinion_tb_test"** (dein Projektname)
   - ODER: Klicke auf **"tbordasch's projects"** → Dann auf dein Projekt

### Schritt 2: Zu Settings gehen
1. Du siehst jetzt das **Projekt Dashboard**
2. Oben in der Navigation siehst du Tabs:
   - Overview
   - Deployments
   - **Settings** ← **HIER KLICKEN!**
   - Analytics
   - etc.

3. Klicke auf **"Settings"** (oben in der Navigation)

### Schritt 3: Environment Variables finden
1. Links im Menü siehst du:
   - General
   - Domains
   - **Environment Variables** ← **HIER KLICKEN!**
   - Git
   - Integrations
   - etc.

2. Klicke auf **"Environment Variables"** (links im Menü)

### Schritt 4: Variablen hinzufügen
1. Du siehst jetzt eine Liste (wahrscheinlich leer)
2. Klicke auf **"Add New"** (Button oben rechts)
3. Füge die Variablen hinzu (siehe unten)

---

## 📍 Alternative: Direkter Weg

**Falls du dich verirrst:**

1. Gehe zu: **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Klicke auf dein Projekt: **"alternative-opinion_tb_test"**
3. Klicke auf **"Settings"** (oben)
4. Klicke auf **"Environment Variables"** (links)

---

## ✅ Was du hinzufügen musst:

### Variable 1:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Deine Supabase URL (aus `.env.local`)
- **Environment:** Alle 3 auswählen ☑️
  - ☑️ Production
  - ☑️ Preview  
  - ☑️ Development

### Variable 2:
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Dein Supabase Anon Key (aus `.env.local`)
- **Environment:** Alle 3 auswählen ☑️

---

## 🎯 Navigation-Pfad:

```
Vercel Dashboard
  → alternative-opinion_tb_test (Projektname)
    → Settings (Tab oben)
      → Environment Variables (Link links)
        → Add New (Button)
```

---

## 📸 Was du sehen solltest:

Nach dem Klicken auf "Environment Variables" siehst du:
- Eine Tabelle mit Spalten: "Name", "Value", "Environment", "Actions"
- Oben rechts: Button **"Add New"**
- Falls leer: "No environment variables found"

---

## 🆘 Falls du es nicht findest:

**Schnellzugriff:**
1. Gehe direkt zu: `https://vercel.com/[dein-username]/alternative-opinion_tb_test/settings/environment-variables`
2. Ersetze `[dein-username]` mit `tbordasch`

**Oder:**
1. Klicke oben links auf deinen **Projektnamen**
2. Dann auf **"Settings"**
3. Dann auf **"Environment Variables"** (links)

---

## 💡 Tipp

**Nach dem Hinzufügen:**
- Gehe zurück zu **"Deployments"**
- Klicke auf **"Redeploy"** beim fehlgeschlagenen Deployment
- Oder: Klicke oben rechts auf **"Redeploy"**

**Viel Erfolg!** 🚀


