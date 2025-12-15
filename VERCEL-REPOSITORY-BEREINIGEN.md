# 🔧 Vercel Repository Problem lösen

## ❌ Problem: Zwei Repositories auf GitHub

**Was passiert ist:**
- Du hast `alternative-opinion` erstellt
- Vercel hat automatisch `alternative-opinion_tb_test` erstellt
- Jetzt hast du **zwei Repositories** → Das ist verwirrend!

---

## ✅ Lösung: Vercel-Repository löschen und das richtige verwenden

### SCHRITT 1: Vercel-Repository löschen

1. Gehe zu: [github.com/tbordasch/alternative-opinion_tb_test](https://github.com/tbordasch/alternative-opinion_tb_test)
2. Klicke auf **"Settings"** (ganz rechts in den Tabs)
3. Scrolle ganz nach unten
4. Unter **"Danger Zone"** → Klicke **"Delete this repository"**
5. Gib den Repository-Namen ein: `tbordasch/alternative-opinion_tb_test`
6. Klicke **"I understand the consequences, delete this repository"**

**Fertig!** Das Vercel-Repository ist gelöscht.

---

### SCHRITT 2: Vercel mit dem richtigen Repository verbinden

1. Gehe zu [vercel.com](https://vercel.com)
2. Öffne dein Projekt (falls es noch existiert)
3. Gehe zu **Settings** → **Git**
4. Klicke **"Disconnect"** (falls noch verbunden)
5. Klicke **"Connect Git Repository"**
6. Wähle **"alternative-opinion"** (nicht `alternative-opinion_tb_test`)
7. Klicke **"Import"**

**Fertig!** Vercel ist jetzt mit dem richtigen Repository verbunden.

---

## 🎯 Alternative: Vercel-Projekt neu erstellen

Falls das obige nicht funktioniert:

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke **"Add New Project"**
3. Wähle **"alternative-opinion"** (nicht `alternative-opinion_tb_test`)
4. Klicke **"Import"**
5. Setze die Umgebungsvariablen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Klicke **"Deploy"**

---

## ✅ Checkliste

- [ ] Vercel-Repository `alternative-opinion_tb_test` gelöscht?
- [ ] Vercel mit `alternative-opinion` verbunden?
- [ ] Umgebungsvariablen in Vercel gesetzt?
- [ ] Deployment funktioniert?

---

## 🆘 Hilfe bei Problemen

### Problem: "Cannot delete repository"
**Lösung:**
- Stelle sicher, dass du der Owner bist
- Prüfe ob Vercel noch verbunden ist → Trenne die Verbindung zuerst

### Problem: "Repository not found" in Vercel
**Lösung:**
- Stelle sicher, dass das Repository `alternative-opinion` existiert
- Prüfe ob du Zugriff hast

### Problem: Vercel zeigt noch das alte Repository
**Lösung:**
- Lösche das alte Vercel-Projekt
- Erstelle ein neues Projekt mit dem richtigen Repository

---

## 📝 Zusammenfassung

1. **Vercel-Repository löschen** (`alternative-opinion_tb_test`)
2. **Vercel mit richtigem Repository verbinden** (`alternative-opinion`)
3. **Umgebungsvariablen setzen**
4. **Deployen**

**Danach hast du nur noch EIN Repository:** `alternative-opinion` ✅

---

## 🎉 Nach der Bereinigung

**Du hast dann:**
- ✅ Ein Repository: `alternative-opinion`
- ✅ Vercel verbunden mit `alternative-opinion`
- ✅ Alles sauber und übersichtlich

**Viel Erfolg!** 🚀

