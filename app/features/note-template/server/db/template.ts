import type { AdminClientType } from '@utils/supabaseAdmin.server'
import type { UnboxReturnedPromise } from '~/types/utils'
import type { AddTemplate } from '../types'
import { NoteTemplateError } from '../../utils/error'
import type { UpdateTemplate } from '../validation/updateTemplate'

export const listTemplate = async (supabaseAdmin: AdminClientType, userId: string) => {
    const query = supabaseAdmin.from('note_template')
        .select('*')
        .or(`public.eq.TRUE,user_id.eq.${userId}`)
    const { data, error } = await query
    if (error || !data) {
        return []
    }
    return data
}

export const listMyTemplate = async (supabaseAdmin: AdminClientType, userId: string) => {
    const query = supabaseAdmin.from('note_template')
        .select('*')
        .eq('user_id', userId)
    const { data, error } = await query
    if (error) {
        console.error(error)
        throw new NoteTemplateError('backend-error', Number(error.code))
    }
    if (!data) {
        return []
    }
    return data
}

export const registerTemplate = async (supabaseAdmin: AdminClientType, template: AddTemplate, userId: string) => {
    const { error: infoError } = await supabaseAdmin.from('note_template').insert({
        user_id: userId,
        template: template.template,
        name: template.name
    })
    if (infoError) {
        console.error(infoError)
        throw new NoteTemplateError('backend-error', Number(infoError.code))
    }
}

export const updateTemplate = async (supabaseAdmin: AdminClientType, template: UpdateTemplate, userId: string) => {
    const { error: infoError } = await supabaseAdmin.from('note_template').update({
        user_id: userId,
        template: template.template,
        html: template.html,
        name: template.name
    }).eq('id', template.id)
    if (infoError) {
        console.error(infoError)
        throw new NoteTemplateError('backend-error', Number(infoError.code))
    }
}

export const deleteTemplate = async (supabaseAdmin: AdminClientType, id: number) => {
    const { error: infoError } = await supabaseAdmin.from('note_template').delete().eq('id', id)
    if (infoError) {
        console.error(infoError)
        throw new NoteTemplateError('backend-error', Number(infoError.code))
    }
}

export const getTemplate = async (supabaseAdmin: AdminClientType, name: string, userId: string) => {
    const { data, error } = await supabaseAdmin.from('note_template').select('id').eq('name', name).eq('user_id', userId).limit(1)
    if (error) {
        console.error(error)
        throw new NoteTemplateError('backend-error', Number(error.code))
    }
    if (!data) {
        throw new NoteTemplateError('template-not-found')
    }
    return data[0]
}

export const getTemplateById = async (supabaseAdmin: AdminClientType, id: number) => {
    const { data, error } = await supabaseAdmin.from('note_template').select('*').eq('id', id).limit(1)
    if (error) {
        console.error(error)
        throw new NoteTemplateError('backend-error', Number(error.code))
    }
    if (!data) {
        throw new NoteTemplateError('template-not-found')
    }
    return data[0]
}

export type ListTemplateType = UnboxReturnedPromise<typeof listTemplate>
export type ListTemplateItemType = ListTemplateType[0]