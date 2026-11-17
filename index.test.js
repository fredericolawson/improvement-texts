import assert from "node:assert/strict"
import { test } from "node:test"

import {
  ADD_DESCRIPTION,
  COMPLETE_DESCRIPTION,
  COMPLETE_NOTE_FIELD,
  DETAILS_FIELD,
  ICON_CLAUSE,
  NOTE_DESCRIPTION,
  SOURCE_RULE,
  STATUS_FIELD,
  TYPE_CLAUSE,
  UPDATE_DESCRIPTION,
  WRITING_RULE,
  improvementInstructions,
} from "./index.js"

// Each rule word for word. A change here is a change to the rule, so it
// is made on purpose, tagged, and carried to every hub.
test("the server instructions paragraph takes the app's path", () => {
  assert.equal(
    improvementInstructions({ path: "/crm/improvements" }),
    "Improvements (/crm/improvements, list_improvements) is the team's own to-do list for the app itself: what to build, fix, write or set up. It is not for a customer's case. When the person you work with asks for something the app should do, or says something in it is wrong, call list_improvements, then add_improvement or add_improvement_note; write it yourself from what they said, never ask them to fill in fields, and tell them the number."
  )
  assert.match(
    improvementInstructions({ path: "/improvements", customerCase: "an action" }),
    /It is not for a customer's case, which is an action\. When/
  )
  assert.throws(() => improvementInstructions({}), /path/)
})

test("the writing rule, said in full on add", () => {
  assert.equal(
    WRITING_RULE,
    "Write the improvement yourself from what the person said; never ask them to fill in fields. Say what the app should do and why in the app's own words (pages, records, buttons), never file names, URL parameters or how to build it."
  )
  assert.ok(ADD_DESCRIPTION.includes(WRITING_RULE))
})

test("the add rule", () => {
  assert.match(ADD_DESCRIPTION, /^Add an improvement, status new; Slack hears of it\. Call list_improvements first to avoid a duplicate\. /)
  assert.equal(ICON_CLAUSE, "icon: one emoji for the subject (🖼️ images, 📧 email, 🎨 design), 🐛 for a fault")
  assert.equal(
    TYPE_CLAUSE,
    "type: feature (something the app does not do yet), improvement (a change to something it already does) or bug (it does something wrong)"
  )
  assert.ok(
    ADD_DESCRIPTION.endsWith(
      `owner only when the person or source names one; details in Markdown with "### What", "### Why" and "### Notes" sections as they apply and "### Source" always (${SOURCE_RULE}); the separate things to build under What as a task list ("- [ ] Show the price column"), inline code only for dates, times, record numbers and tool names. Tell the person the number.`
    )
  )
})

test("where an entry came from", () => {
  assert.equal(
    SOURCE_RULE,
    'who said it, through what (a call, an email, a Slack thread, this chat) and the day written out ("Source: circle-back call with Will, Tue 17 Nov 2026"); "Source: found while building" for your own finding'
  )
})

test("the update rule", () => {
  assert.equal(
    UPDATE_DESCRIPTION,
    'Change only the fields passed, at least one; null clears details, type or owner. Status: new (not looked at yet), start (next up, not begun), partial (started or partly built, not finished), hold (parked; say why in a note); done needs a note, so call complete_improvement. Icon and type as add_improvement describes; give them to an improvement that lacks them; a rewritten title or details keeps to add_improvement\'s writing rule. Log progress with add_improvement_note, not by rewriting details; the one edit to details for progress is ticking a built task-list item ("- [ ]" to "- [x]"), which the app shows struck through. A change asked for outside this chat (a call, an email, a thread) also gets a note naming that source.'
  )
})

test("the note rule", () => {
  assert.equal(
    NOTE_DESCRIPTION,
    `Log a note on an improvement: progress, a decision, a finding. Notes are never edited or deleted. Markdown, as add_improvement's details, ending with a "Source:" line: ${SOURCE_RULE}. Attach screenshots in images when you have the file; the body may then be empty.`
  )
})

test("the complete rule and the field texts", () => {
  assert.equal(
    COMPLETE_DESCRIPTION,
    'Mark an improvement done with a closing note, logged like add_improvement_note; Slack posts it to the team. The note is one or two plain sentences, as a person would say it to a colleague: what changed, in the app\'s own words. No heading, list, code, file name or restating of the improvement; a last "Source:" line, as add_improvement_note has it, only when the closing was decided somewhere other than this chat. Screenshots go in images.'
  )
  assert.equal(COMPLETE_NOTE_FIELD, "One or two plain sentences: what was done.")
  assert.equal(STATUS_FIELD, "new, start, partial or hold; done is complete_improvement.")
  assert.equal(DETAILS_FIELD, "Markdown: What, Why and Notes as they apply, Source always.")
})
