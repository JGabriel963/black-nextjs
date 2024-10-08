import { ConnectionProviderProps } from '@/app/providers/connections-porvider'
import { z } from 'zod'

export const EditUserProfileSchema = z.object({
    email: z.string().email('Required'),
    name: z.string().min(1, 'Required')
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
  }