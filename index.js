/**
 * The rule texts the improvement MCP tools carry (list, get, add, update,
 * add_note, complete), one copy for every hub that has them. A hub imports
 * these as its tool descriptions and may append its own sentences after
 * (a title limit, what the call returns); it never rewrites them. A change
 * here is a commit and a tag, then a bump in each hub.
 *
 * The texts are the agent's instructions: how to write an improvement
 * from what a person said, in the app's own words, and where it came from.
 */

/** The server instructions paragraph: what improvements are and when to file one. */
export function improvementInstructions({ path, customerCase } = {}) {
  if (!path) throw new Error("improvementInstructions needs the list page's path")
  const notFor = customerCase ? `, which is ${customerCase}` : ""
  return `Improvements (${path}, list_improvements) is the team's own to-do list for the app itself: what to build, fix, write or set up. It is not for a customer's case${notFor}. When the person you work with asks for something the app should do, or says something in it is wrong, call list_improvements, then add_improvement or add_improvement_note; write it yourself from what they said, never ask them to fill in fields, and tell them the number.`
}

/** How an agent writes an improvement. Said in full on add_improvement. */
export const WRITING_RULE = `Write the improvement yourself from what the person said; never ask them to fill in fields. Say what the app should do and why in the app's own words (pages, records, buttons), never file names, URL parameters or how to build it.`

/** The writing rule by reference, for update_improvement. */
export const WRITING_CLAUSE = `a rewritten title or details keeps to add_improvement's writing rule`

export const TYPE_CLAUSE = `type: feature (something the app does not do yet), improvement (a change to something it already does) or bug (it does something wrong)`

export const ICON_CLAUSE = `icon: one emoji for the subject (🖼️ images, 📧 email, 🎨 design), 🐛 for a fault`

/**
 * Where an entry came from, so a later reader can tell a call from an
 * email from the agent's own finding (Freddie, 2026-11-17). Said in full
 * on add_improvement and add_improvement_note.
 */
export const SOURCE_RULE = `who said it, through what (a call, an email, a Slack thread, this chat) and the day written out ("Source: circle-back call with Will, Tue 17 Nov 2026"); "Source: found while building" for your own finding`

export const ADD_DESCRIPTION = `Add an improvement, status new; Slack hears of it. Call list_improvements first to avoid a duplicate. ${WRITING_RULE} Title: one line that does not start with the type ("Bug:"), since type is its own field; ${ICON_CLAUSE}; ${TYPE_CLAUSE}; owner only when the person or source names one; details in Markdown with "### What", "### Why" and "### Notes" sections as they apply and "### Source" always (${SOURCE_RULE}); the separate things to build under What as a task list ("- [ ] Show the price column"), inline code only for dates, times, record numbers and tool names. Tell the person the number.`

export const UPDATE_DESCRIPTION = `Change only the fields passed, at least one; null clears details, type or owner. Status: new (not looked at yet), start (next up, not begun), partial (started or partly built, not finished), hold (parked; say why in a note); done needs a note, so call complete_improvement. Icon and type as add_improvement describes; give them to an improvement that lacks them; ${WRITING_CLAUSE}. Log progress with add_improvement_note, not by rewriting details; the one edit to details for progress is ticking a built task-list item ("- [ ]" to "- [x]"), which the app shows struck through. A change asked for outside this chat (a call, an email, a thread) also gets a note naming that source.`

export const NOTE_DESCRIPTION = `Log a note on an improvement: progress, a decision, a finding. Notes are never edited or deleted. Markdown, as add_improvement's details, ending with a "Source:" line: ${SOURCE_RULE}. Attach screenshots in images when you have the file; the body may then be empty.`

export const COMPLETE_DESCRIPTION = `Mark an improvement done with a closing note, logged like add_improvement_note; Slack posts it to the team. The note is one or two plain sentences, as a person would say it to a colleague: what changed, in the app's own words. No heading, list, code, file name or restating of the improvement; a last "Source:" line, as add_improvement_note has it, only when the closing was decided somewhere other than this chat. Screenshots go in images.`

/** Field texts, for the Zod `describe` on each tool's input. */
export const DETAILS_FIELD = `Markdown: What, Why and Notes as they apply, Source always.`
export const STATUS_FIELD = `new, start, partial or hold; done is complete_improvement.`
export const COMPLETE_NOTE_FIELD = `One or two plain sentences: what was done.`
