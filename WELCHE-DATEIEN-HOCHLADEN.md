# 📁 Welche Dateien auf GitHub hochladen?

## ✅ WICHTIG: Du musst NICHT manuell auswählen!

**Am besten:** Verwende Git (wie wir es erklärt haben):
```bash
git add .
git commit -m "Update"
git push
```

**Das lädt ALLE wichtigen Dateien automatisch hoch!**

---

## 📋 Was wird hochgeladen?

### ✅ Wird hochgeladen (wichtig):
- ✅ Alle `.tsx`, `.ts`, `.js` Dateien (Code)
- ✅ `package.json` (Dependencies)
- ✅ `next.config.js` (Konfiguration)
- ✅ `tailwind.config.ts` (Styling)
- ✅ `tsconfig.json` (TypeScript Config)
- ✅ `README.md` (Dokumentation)
- ✅ Alle Dateien in `app/` (Seiten)
- ✅ Alle Dateien in `components/` (Komponenten)
- ✅ Alle Dateien in `lib/` (Funktionen)
- ✅ `supabase/` Ordner (SQL Scripts)
- ✅ `.gitignore` (sagt Git, was IGNORIERT werden soll)

### ❌ Wird NICHT hochgeladen (automatisch ausgeschlossen):
- ❌ `node_modules/` (zu groß, wird automatisch installiert)
- ❌ `.env.local` (deine Secrets - NIEMALS hochladen!)
- ❌ `.next/` (Build-Ordner)
- ❌ `.vercel/` (Vercel Cache)
- ❌ `*.log` (Log-Dateien)

**Warum?** Die `.gitignore` Datei sagt Git, was ignoriert werden soll!

---

## 🎯 Einfachste Methode: Git verwenden

### In PowerShell (im Projektordner):

```powershell
git add .
```

**Das fügt ALLE wichtigen Dateien hinzu** (automatisch, ignoriert die richtigen Dateien)

```powershell
git commit -m "Update: Text changes"
```

```powershell
git push
```

**Fertig!** ✅ Alle wichtigen Dateien sind jetzt auf GitHub.

---

## 📂 Falls du manuell hochladen willst (nicht empfohlen)

### Was du hochladen solltest:
1. **Alle Dateien im Hauptordner:**
   - `package.json`
   - `next.config.js`
   - `tailwind.config.ts`
   - `tsconfig.json`
   - `.gitignore`
   - `README.md` (falls vorhanden)

2. **Ordner:**
   - `app/` (komplett)
   - `components/` (komplett)
   - `lib/` (komplett)
   - `supabase/` (komplett)
   - `public/` (falls vorhanden)

### Was du NICHT hochladen solltest:
- ❌ `node_modules/` (zu groß!)
- ❌ `.env.local` (NIEMALS!)
- ❌ `.next/` (Build-Ordner)
- ❌ `.vercel/` (Vercel Cache)

---

## 🔍 Prüfen: Was ist bereits auf GitHub?

1. Gehe zu deinem Repository: `github.com/tbordasch/alternative-opinion`
2. Schaue welche Dateien bereits da sind
3. Falls Dateien fehlen → Git verwenden (siehe oben)

---

## 💡 Warum Git verwenden?

### Git (empfohlen):
- ✅ Automatisch: Lädt nur wichtige Dateien hoch
- ✅ Schnell: Ein Befehl
- ✅ Sicher: `.gitignore` schützt deine Secrets
- ✅ Professionell: Standard-Workflow

### Manuell (nicht empfohlen):
- ❌ Langsam: Jede Datei einzeln
- ❌ Fehleranfällig: Kann wichtige Dateien vergessen
- ❌ Risiko: Könnte versehentlich `.env.local` hochladen

---

## 🆘 Hilfe

### Problem: "Welche Dateien habe ich geändert?"
```powershell
git status
```
Zeigt dir alle geänderten Dateien.

### Problem: "Sind meine Änderungen auf GitHub?"
1. Gehe zu `github.com/tbordasch/alternative-opinion`
2. Schaue ob deine Dateien da sind
3. Falls nicht → `git push` machen

### Problem: "Ich habe versehentlich .env.local hochgeladen!"
1. Entferne die Datei von GitHub (im Browser)
2. Stelle sicher, dass `.env.local` in `.gitignore` ist
3. Git wird sie nicht mehr hochladen

---

## ✅ Zusammenfassung

**Einfachste Methode:**
```powershell
git add .
git commit -m "Update"
git push
```

**Das lädt automatisch alle wichtigen Dateien hoch!**

**Du musst NICHT manuell auswählen!** Git macht das für dich. 🎉

---

## 📋 Checkliste

- [ ] Git installiert? (falls nicht: [git-scm.com/download/win](https://git-scm.com/download/win))
- [ ] Im Projektordner? (`cd "C:\Users\Tim2000isc\Desktop\PC_Coding\alternative-opinion"`)
- [ ] `git add .` gemacht?
- [ ] `git commit -m "..."` gemacht?
- [ ] `git push` gemacht?
- [ ] Dateien auf GitHub sichtbar?

**Fertig!** 🚀


