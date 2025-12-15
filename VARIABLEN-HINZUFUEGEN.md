# ✅ Environment Variables hinzufügen - Schritt für Schritt

## Du hast bereits:
- ✅ Environment Variables Seite gefunden
- ✅ `.env.local` Datei geöffnet

## Jetzt musst du:

---

## SCHRITT 1: Erste Variable hinzufügen

### 1.1 Key-Feld ausfüllen
1. Im **"Key"** Feld (links) tippe:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```

### 1.2 Value-Feld ausfüllen
2. Im **"Value"** Feld (rechts) tippe:
   ```
   https://nscdywarhurdpzfqvlks.supabase.co
   ```
   (Das ist deine Supabase URL aus `.env.local`)

### 1.3 Environments auswählen
3. Klicke auf das **Dropdown** "All Environments"
4. Wähle **alle 3 aus** ☑️:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

### 1.4 Speichern
5. **WICHTIG:** Klicke noch NICHT auf "Save"!
6. Klicke auf **"Add Another"** (Button mit Plus-Icon)

---

## SCHRITT 2: Zweite Variable hinzufügen

### 2.1 Key-Feld ausfüllen
1. Im **zweiten "Key"** Feld tippe:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

### 2.2 Value-Feld ausfüllen
2. Im **zweiten "Value"** Feld tippe deinen **Anon Key**:
   - Öffne deine `.env.local` Datei
   - Suche nach `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - Kopiere den Wert (alles nach dem `=`)
   - Füge ihn in das Value-Feld ein

**Falls du den Key nicht findest:**
- Gehe zu [supabase.com](https://supabase.com)
- Wähle dein Projekt
- Settings → API
- Kopiere **"anon public"** Key

### 2.3 Environments auswählen
3. Klicke auf das **Dropdown** beim zweiten Eintrag
4. Wähle **alle 3 aus** ☑️:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

---

## SCHRITT 3: Speichern

1. **Jetzt** klicke auf **"Save"** (unten rechts)
2. Warte kurz (1-2 Sekunden)
3. Du siehst eine Bestätigung

---

## SCHRITT 4: Redeploy (WICHTIG!)

**Nach dem Speichern musst du neu deployen:**

1. Gehe zu **"Deployments"** (Tab oben)
2. Finde den **fehlgeschlagenen Deployment** (rotes X)
3. Klicke auf die **3 Punkte** (rechts) → **"Redeploy"**
   - ODER: Klicke oben rechts auf **"Redeploy"**
4. Warte 2-3 Minuten
5. **Fertig!** ✅

---

## 📋 Checkliste

- [ ] `NEXT_PUBLIC_SUPABASE_URL` hinzugefügt
- [ ] Value: `https://nscdywarhurdpzfqvlks.supabase.co`
- [ ] Alle 3 Environments ausgewählt
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` hinzugefügt
- [ ] Anon Key Value eingefügt
- [ ] Alle 3 Environments ausgewählt
- [ ] "Save" geklickt
- [ ] Redeploy gestartet
- [ ] Build erfolgreich! ✅

---

## 🆘 Hilfe

### Problem: Ich finde den Anon Key nicht
1. Gehe zu [supabase.com](https://supabase.com)
2. Wähle dein Projekt
3. Settings (⚙️) → API
4. Kopiere **"anon public"** (der lange String)

### Problem: "Save" Button ist grau
- Prüfe ob beide Felder (Key und Value) ausgefüllt sind
- Prüfe ob Environments ausgewählt sind

### Problem: Nach Save sehe ich die Variablen nicht
- Das ist normal! Sie sind gespeichert
- Wichtig: Jetzt **Redeploy** machen!

---

## 🎯 Was du sehen solltest:

Nach dem Hinzufügen siehst du eine Tabelle mit:
- **Name:** NEXT_PUBLIC_SUPABASE_URL
- **Value:** (versteckt/verschlüsselt)
- **Environment:** Production, Preview, Development
- **Actions:** (Löschen/Edit Buttons)

**Viel Erfolg!** 🚀


