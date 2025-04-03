import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: { json: () => any; }) {
    try {
        const body = await req.json();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL });

        const prompt = `
You are a fitness and diet recommendation assistant. 
Based on the following details, generate a personalized fitness and diet plan in JSON format.

Provide recommendations under the following categories:
- Diet Recommendations
- Workout Options
- Breakfast Ideas
- Lunch Options
- Dinner Options
- Additional Tips (snacks, supplements, hydration)

Input Details:
- Dietary Preferences: ${body.dietary_preferences}
- Fitness Goals: ${body.fitness_goals}
- Lifestyle Factors: ${body.lifestyle_factors}
- Dietary Restrictions: ${body.dietary_restrictions}
- Health Conditions: ${body.health_conditions}
- User Query: ${body.user_query}

Respond strictly in a valid JSON format with the following structure:
{
  "diet_types": ["recommendation 1", "recommendation 2"],
  "workouts": ["workout 1", "workout 2"],
  "breakfasts": ["breakfast 1", "breakfast 2"],
  "lunches": ["lunch 1", "lunch 2"],
  "dinners": ["dinner 1", "dinner 2"],
  "additional_tips": ["tip 1", "tip 2"]
}
`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        const responseText = response?.response?.text();
        if (!responseText) throw new Error("No response from AI.");

        const cleanJsonString = responseText.replace(/```json|```/g, "").trim();
        const recommendations = JSON.parse(cleanJsonString);

        return Response.json({ recommendations }, { status: 200 });

    } catch (error) {
        console.error("AI Error:", error);
        return Response.json({ error: "Failed to generate recommendations." }, { status: 500 });
    }
}
