import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://yruxqbmpcpvyxhjkusyt.supabase.co"
    ,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydXhxYm1wY3B2eXhoamt1c3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1NzgwNzEsImV4cCI6MjAxNTE1NDA3MX0.bpJ_9CH00jrB8_WFrj5mihLRRyJy9QBkV0edyZor1A4"
)