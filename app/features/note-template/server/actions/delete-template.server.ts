import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseDeleteTemplate } from '../validation/deleteTemplate';
import { deleteTemplate } from '../db/template';
import { initServerContext } from '~/features/auth/server/init.server';

type ActionData = {
    error?: string
}
export async function action({ request, context }: ActionFunctionArgs) {
    const { authenticator } = initServerContext(context)
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseDeleteTemplate(await request.formData())
        await deleteTemplate(supabaseAdmin, data.templateId)
        return redirect(data.redirectTo)
    } catch (e) {
        if (e instanceof MovieNoteError) {
            return json<ActionData>({
                error: e.message
            }, { status: e.status })
        }
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
}