import authenticator from '~/features/auth/server/auth.server';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';


import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseAddTemplate } from '../validation/addTemplate';
import { getTemplate, registerTemplate } from '../db/template';
import { NoteTemplateError } from '../../utils/error';

type ActionData = {
    error?: string
}

export async function action({ request, context }: ActionFunctionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddTemplate(await request.formData())
        await registerTemplate(supabaseAdmin, data, user.id)
        const ret = await getTemplate(supabaseAdmin, data.name, user.id)
        return redirect(`/app/note-template/${ret.id}`)
    } catch (e) {
        if (e instanceof NoteTemplateError) {
            return json<ActionData>({
                error: e.message
            }, { status: e.status })
        }
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
}