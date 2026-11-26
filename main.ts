import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// how-many-tabs-open — "How Many Tabs Do You Have Open?"
// Entry: 57
//
// Why 57: an honest count for someone who lives in the browser. This is
// a builder who keeps a dozen cloud consoles, docs, dashboards and
// half-read articles open across several windows at once — too many to
// close, too useful to bookmark, and never quite the round 50 or 60
// people guess when they imagine a tab hoarder. 57 is specific enough
// to be a real count, high enough to surprise, low enough to believe:
// the tabs of a person mid-project, not a number picked to shock.
// Deliberately not round (50, 60, 100) and not a cliche (0, 1, 42).
const ENTRY = "57";

// Guard: the gate requires UTF-8 text of 1 to 5 characters, not only
// white space, holding exactly one number in digits and nothing else.
if (!/^[0-9]{1,5}$/.test(ENTRY)) {
  throw new Error("entry must be 1 to 5 digits and nothing else");
}

const outDir = process.argv[2] ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Self-check: read back what was written and confirm it still passes
// the gate, so a bad write can never silently ship.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY || !/^[0-9]{1,5}$/.test(written)) {
  throw new Error("entry.txt failed its own gate check after writing");
}
