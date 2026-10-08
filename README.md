# SehatIn

Frontend-only hackathon demo. Two surfaces in one Next.js app, all data mocked and persisted in `localStorage`.

- `/hospital`: clinician workspace (desktop, sidebar)
- `/patient`: patient companion (mobile-first, bottom nav)
- `/` redirects to `/patient`

## Run

```bash
pnpm install
pnpm dev
```

## Demo loop

1. Open `/hospital/patients/p-001/care-plan/new` in one tab and `/patient/today` in another.
2. Click **Konfirmasi draft**. The patient tab switches to the new plan version without a reload.
3. Click **Reset data demo** to restore the mock data.

Patient OTP demo: `081234567801` / `123456`. Doctor demo: `rina.kartika@rs-sehat.id`.
