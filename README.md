# improvement-texts

The rule texts the improvement MCP tools carry (`list_improvements`, `get_improvement`, `add_improvement`, `update_improvement`, `add_improvement_note`, `complete_improvement`), one copy for every hub that has them. The texts are the agent's instructions: how to write an improvement from what a person said, in the app's own words, and where it came from.

The hubs that use it: `rushe-brain-ui`, `stitchhub`, `cj-hub` and `lifted/web-lifted`.

## Use

```json
"improvement-texts": "github:fredericolawson/improvement-texts#v1.1.0"
```

```ts
import { ADD_DESCRIPTION, improvementInstructions } from "improvement-texts"
```

A hub uses each text as its tool description and may append its own sentences after it (a title limit, what the call returns). It never rewrites one: a wording that should change changes here.

The list and get descriptions stay in each hub, since they describe that hub's own data. The tools' titles (`TOOL_TITLES`, the MCP `title` annotation) come from here too.

## Change a rule

1. Edit `index.js` and the word-for-word assertion in `index.test.js`; `node --test`.
2. Bump `version` in `package.json`, commit, tag `vX.Y.Z`, push with tags.
3. Bump the tag in each hub's `package.json` and reinstall.
