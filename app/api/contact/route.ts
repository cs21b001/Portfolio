import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/utils";

// POST - Public: Submit contact form
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Try using service role key to bypass RLS for this endpoint
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(
      "Using service role key (length):",
      process.env.SUPABASE_SERVICE_ROLE_KEY?.length
    );
    console.log("Attempting to insert contact message:", {
      name,
      email,
      subject,
    });

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        subject,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error("Contact form insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to submit message" },
        { status: 500 }
      );
    }

    console.log("Contact message inserted successfully:", data.id);

    return NextResponse.json({
      message: "Message sent successfully",
      data,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
