
import { json } from '@remix-run/cloudflare';

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getSupabaseAdmin } from '@utils/supabaseAdmin.server';
import { getTemplateById } from '../db/template';
import type { ErrorKey } from '../../utils/error';
import type { UnboxReturnedPromise } from '~/types/utils';

type ContentData = UnboxReturnedPromise<typeof getTemplateById>

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData,
    isNew?: boolean
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
    const templateId = params.templateId;
    const url = new URL(request.url);
    const isNew = Boolean(url.searchParams.get('created'));
    const dbAdmin = getSupabaseAdmin(context)

    if (!templateId) {
        return json<LorderData>({ error: 'template-id-not-found' })
    }

    const content = await getTemplateById(dbAdmin, Number(templateId))

    return json<LorderData>({
        content,
        isNew
    })
}