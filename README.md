# AS Prestige Care

## Initialiser la base

### Option A : pgAdmin
1. Ouvrir **Query Tool**.
2. Remplacer `<PG_PASSWORD>` dans `db/init.sql` puis exécuter le script.

### Option B : terminal
```powershell
pwsh -File .\scripts\init-db.ps1
```

### Puristes `psql`
```powershell
Get-Content db/init.sql | ForEach-Object { $_ -replace '<PG_PASSWORD>', 'votre_mot_de_passe' } | psql -U postgres -f -
```

Après l'initialisation, lancer :
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Test rapide : `GET /api/health/db` doit retourner `{ ok: true }`.
Si la route n'existe pas, créer `app/api/health/db/route.ts` :
```ts
export const GET = () => Response.json({ ok: true });
```

