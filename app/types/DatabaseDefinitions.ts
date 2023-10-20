export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      auth: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      movie_info: {
        Row: {
          created_at: string | null
          imdb_id: string | null
          lng: string
          thumbnail: string | null
          title: string | null
          tmdb_id: string
        }
        Insert: {
          created_at?: string | null
          imdb_id?: string | null
          lng: string
          thumbnail?: string | null
          title?: string | null
          tmdb_id: string
        }
        Update: {
          created_at?: string | null
          imdb_id?: string | null
          lng?: string
          thumbnail?: string | null
          title?: string | null
          tmdb_id?: string
        }
        Relationships: []
      }
      movie_note: {
        Row: {
          admiration_date: string | null
          created_at: string | null
          html: string | null
          lng: string
          memo: string | null
          published: boolean | null
          stars: number | null
          tmdb_id: string
          updated_at: string | null
          user_id: string
          watch_state: string | null
        }
        Insert: {
          admiration_date?: string | null
          created_at?: string | null
          html?: string | null
          lng: string
          memo?: string | null
          published?: boolean | null
          stars?: number | null
          tmdb_id: string
          updated_at?: string | null
          user_id: string
          watch_state?: string | null
        }
        Update: {
          admiration_date?: string | null
          created_at?: string | null
          html?: string | null
          lng?: string
          memo?: string | null
          published?: boolean | null
          stars?: number | null
          tmdb_id?: string
          updated_at?: string | null
          user_id?: string
          watch_state?: string | null
        }
        Relationships: []
      }
      note_template: {
        Row: {
          created_at: string
          id: number
          name: string
          public: boolean | null
          template: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          public?: boolean | null
          template?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          public?: boolean | null
          template?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          key: string | null
          user_id: string
          value: string | null
        }
        Insert: {
          created_at?: string | null
          key?: string | null
          user_id: string
          value?: string | null
        }
        Update: {
          created_at?: string | null
          key?: string | null
          user_id?: string
          value?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id: string
          image?: string | null
          name?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      movie_note_list_view: {
        Row: {
          admiration_date: string | null
          created_at: string | null
          html: string | null
          imdb_id: string | null
          lng: string | null
          memo: string | null
          published: boolean | null
          stars: number | null
          thumbnail: string | null
          title: string | null
          tmdb_id: string | null
          updated_at: string | null
          user_id: string | null
          watch_state: string | null
        }
        Relationships: []
      }
      users_view: {
        Row: {
          auth_id: string | null
          comment: string | null
          created_at: string | null
          id: string | null
          image: string | null
          name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_user:
        | {
            Args: {
              id: string
              name: string
              auth_id: string
            }
            Returns: number
          }
        | {
            Args: {
              id: string
              name: string
              auth_id: string
              comment: string
            }
            Returns: number
          }
        | {
            Args: {
              id: string
              name: string
            }
            Returns: number
          }
      is_user_exists: {
        Args: {
          target_email: string
        }
        Returns: boolean
      }
      remove_users: {
        Args: {
          target_email: string
        }
        Returns: undefined
      }
      update_user:
        | {
            Args: {
              auth_id: string
              name: string
              comment: string
            }
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
