import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';


import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { updateTemplate } from '../db/template';
import { NoteTemplateError } from '../../utils/error';
import { parseUpdateTemplate } from '../validation/updateTemplate';
import { initServerContext } from '~/features/auth/server/init.server';

type ActionData = {
    error?: string,
    success?: number
}

export async function action({ request, context }: ActionFunctionArgs) {
    const { authenticator } = initServerContext(context)
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseUpdateTemplate(await request.formData())
        await updateTemplate(supabaseAdmin, data, user.id)
        return json<ActionData>({
            success: Date.now()
        }, { status: 200 })
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