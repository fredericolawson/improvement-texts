export function improvementInstructions(options: {
  /** The list page's path, as the agent names it: "/improvements". */
  path: string
  /** What a customer's case is in this app instead ("an action"), if it has such a thing. */
  customerCase?: string
}): string

export const WRITING_RULE: string
export const WRITING_CLAUSE: string
export const TYPE_CLAUSE: string
export const ICON_CLAUSE: string
export const SOURCE_RULE: string
export const ADD_DESCRIPTION: string
export const UPDATE_DESCRIPTION: string
export const NOTE_DESCRIPTION: string
export const COMPLETE_DESCRIPTION: string
export const TOOL_TITLES: Readonly<{
  list_improvements: string
  get_improvement: string
  add_improvement: string
  update_improvement: string
  add_improvement_note: string
  complete_improvement: string
}>
export const DETAILS_FIELD: string
export const STATUS_FIELD: string
export const COMPLETE_NOTE_FIELD: string
