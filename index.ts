import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface FacebookInsightsParams {
  accessToken: string;
  adAccountId: string;
  dateRange?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { accessToken, adAccountId, dateRange = "last_30d" }: FacebookInsightsParams = await req.json();

    if (!accessToken || !adAccountId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: accessToken and adAccountId" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const fields = [
      "impressions",
      "clicks",
      "spend",
      "cpc",
      "cpm",
      "ctr",
      "actions",
      "action_values",
      "cost_per_action_type"
    ].join(",");

    const apiUrl = `https://graph.facebook.com/v18.0/${adAccountId}/insights?fields=${fields}&time_range={"since":"${dateRange}"}&access_token=${accessToken}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({ error: "Facebook API error", details: errorData }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    const processedData = {
      metrics: {
        impressions: data.data?.[0]?.impressions || "0",
        clicks: data.data?.[0]?.clicks || "0",
        spend: parseFloat(data.data?.[0]?.spend || "0").toFixed(2),
        cpc: parseFloat(data.data?.[0]?.cpc || "0").toFixed(2),
        cpm: parseFloat(data.data?.[0]?.cpm || "0").toFixed(2),
        ctr: parseFloat(data.data?.[0]?.ctr || "0").toFixed(2),
      },
      actions: data.data?.[0]?.actions || [],
      rawData: data
    };

    return new Response(
      JSON.stringify(processedData),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error", message: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
