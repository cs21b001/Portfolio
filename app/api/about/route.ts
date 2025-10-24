import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET - Public access to about info
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("about").select("*").single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Admin only: Update about info
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, profile_image_url, resume_url } = body;

    // Get existing about record
    const { data: existing } = await supabase
      .from("about")
      .select("id")
      .single();

    let result;

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from("about")
        .update({
          title,
          description,
          profile_image_url,
          resume_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      result = { data, error };
    } else {
      // Insert new
      const { data, error } = await supabase
        .from("about")
        .insert({
          title,
          description,
          profile_image_url,
          resume_url,
        })
        .select()
        .single();

      result = { data, error };
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
