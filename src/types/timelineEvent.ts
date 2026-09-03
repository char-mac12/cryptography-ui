export type TimelineEvent = {
    year: string
    title: string
    summary: string
    description: string
    person?: string
    link?: {
        label: string
        path: string
    }
}