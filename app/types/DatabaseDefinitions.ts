export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      auth: {
        Row: {
          id: string
          user_id: string
          created_at: string | null
        }
        Insert: {
          id: string
          user_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string | null
        }
      }
      movie_info: {
        Row: {
          title: string | null
          tmdb_id: string
          thumbnail: string | null
          lng: string
          imdb_id: string | null
          created_at: string | null
        }
        Insert: {
          title?: string | null
          tmdb_id: string
          thumbnail?: string | null
          lng: string
          imdb_id?: string | null
          created_at?: string | null
        }
        Update: {
          title?: string | null
          tmdb_id?: string
          thumbnail?: string | null
          lng?: string
          imdb_id?: string | null
          created_at?: string | null
        }
      }
      movie_note: {
        Row: {
          tmdb_id: string
          user_id: string
          memo: string | null
          stars: number | null
          admiration_date: string | null
          lng: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          tmdb_id: string
          user_id: string
          memo?: string | null
          stars?: number | null
          admiration_date?: string | null
          lng: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          tmdb_id?: string
          user_id?: string
          memo?: string | null
          stars?: number | null
          admiration_date?: string | null
          lng?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          id: string
          name: string | null
          image: string | null
          comment: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          image?: string | null
          comment?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          image?: string | null
          comment?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      movie_note_list_view: {
        Row: {
          created_at: string | null
          tmdb_id: string | null
          user_id: string | null
          memo: string | null
          stars: number | null
          admiration_date: string | null
          lng: string | null
          updated_at: string | null
          title: string | null
          thumbnail: string | null
          imdb_id: string | null
        }
      }
      users_view: {
        Row: {
          id: string | null
          created_at: string | null
          name: string | null
          image: string | null
          comment: string | null
          auth_id: string | null
        }
      }
    }
    Functions: {
      add_user:
        | {
            Args: { id: string; name: string }
            Returns: number
          }
        | {
            Args: { id: string; name: string; auth_id: string }
            Returns: number
          }
        | {
            Args: { id: string; name: string; auth_id: string; comment: string }
            Returns: number
          }
      is_user_exists: {
        Args: { target_email: string }
        Returns: boolean
      }
      remove_users: {
        Args: { target_email: string }
        Returns: undefined
      }
      update_user:
        | {
            Args: { auth_id: string; name: string; comment: string }
            Returns: undefined
          }
        | {
            Args: {
              auth_id: string
              name: string
              comment: string
              image: string
            }
            Returns: undefined
          }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

