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
          html: string | null
          id: number
          name: string
          public: boolean | null
          template: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          html?: string | null
          id?: number
          name: string
          public?: boolean | null
          template?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          html?: string | null
          id?: number
          name?: string
          public?: boolean | null
          template?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      "public-note": {
        Row: {
          created_at: string
          note: string
          public: boolean
          summary: string
          tmdb_id: string
          updated_at: string | null
          user_id: string
          view_id: string
        }
        Insert: {
          created_at?: string
          note: string
          public: boolean
          summary: string
          tmdb_id: string
          updated_at?: string | null
          user_id: string
          view_id?: string
        }
        Update: {
          created_at?: string
          note?: string
          public?: boolean
          summary?: string
          tmdb_id?: string
          updated_at?: string | null
          user_id?: string
          view_id?: string
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
            }
            Returns: number
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
