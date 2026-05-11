const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllIdeasRoute = () => '/'
export const getNewIdeaRoute = () => '/ideas/new'

export const viewIdeaRouteParams = getRouteParams({ nick: true })
export type ViewIdeaRouteParams = { nick: string }
export const getViewIdeaRoute = ({ nick }: ViewIdeaRouteParams) => `/ideas/${nick}`
