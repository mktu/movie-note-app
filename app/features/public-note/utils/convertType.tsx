import type { UserType } from "~/features/profile/server/db/user.server";
import type { PublicNoteType } from "../server";
import type { PublicNote, User } from "@type-defs/frontend";

export const convertUser = (user?: UserType | null): User => ({
    authId: user?.auth_id || '',
    createdAt: user?.created_at || '',
    id: user?.id || '',
    name: user?.name || '',
    image: user?.image || null,
    comment: user?.comment || ''
})

export const convertPublicNote = (note: PublicNoteType): PublicNote => ({
    tmdbId: note.tmdb_id,
    viewId: note.view_id,
    note: note.note,
    public: note.public,
    summary: note.summary,
    updatedAt: note.updated_at,
    userId: note.user_id,
    createdAt: note.created_at,
    coverImage: note.cover_image
})