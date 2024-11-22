const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://aarpfrwedmkrupgsvtes.supabase.co";
const supbaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhcnBmcndlZG1rcnVwZ3N2dGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NzA3MjEsImV4cCI6MjA0NzI0NjcyMX0.KcWtNR-CFsfIQJoD1627oPTHJXQIe87bG7o7rCn-HsU";

const supabase = createClient(supabaseUrl, supbaseAnonKey);

// supabase
//   .from("profiles")
//   .select("user_id, users_markers(markers(*))")
//   .eq("user_id", "59588662-2fdd-434d-be2e-8e8925b60323")
//   .then((res) => {
//     console.log(JSON.stringify(res.data));
//   });

supabase
  .from("profiles")
  .select("user_id, planner:users_markers!inner(markers(*))")
  .eq("user_id", "59588662-2fdd-434d-be2e-8e8925b60323")
  .then((res) => {
    console.log(JSON.stringify(res.data));
    console.log(res.data);
  });
