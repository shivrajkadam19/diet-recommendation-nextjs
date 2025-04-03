import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        
        // Validate required fields
        if (!process.env.GEMINI_API_KEY || !process.env.MODEL) {
            throw new Error("Missing AI API credentials.");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: process.env.MODEL });

        const prompt = `
You are a fitness and diet recommendation assistant. 
Generate a personalized fitness and diet plan in JSON format based on the following user details:

- Age: ${body.age}
- Gender: ${body.gender}
- Height: ${body.height} cm
- Weight: ${body.weight} kg
- BMI: ${(body.weight / ((body.height / 100) ** 2)).toFixed(2)}
- Activity Level: ${body.activity_level}
- Dietary Preferences: ${body.dietary_preferences}
- Fitness Goals: ${body.fitness_goals}
- Lifestyle Factors: ${body.lifestyle_factors}
- Dietary Restrictions: ${body.dietary_restrictions}
- Health Conditions: ${body.health_conditions}
- Current Workout Routine: ${body.current_workout}
- Current Diet Pattern: ${body.current_diet}
- Food Allergies: ${body.food_allergies}
- User Query: ${body.user_query}

Provide structured JSON output with the following categories:
{
  "caloric_intake": "Suggested daily calorie intake",
  "macro_split": {
    "protein": "x%",
    "carbs": "y%",
    "fats": "z%"
  },
  "diet_types": ["recommendation 1", "recommendation 2"],
  "workouts": ["workout 1", "workout 2"],
  "breakfasts": ["breakfast 1", "breakfast 2"],
  "lunches": ["lunch 1", "lunch 2"],
  "dinners": ["dinner 1", "dinner 2"],
  "additional_tips": ["tip 1", "tip 2"],
  "hydration_tips": ["tip 1", "tip 2"],
  "supplements": ["suggested supplement 1", "suggested supplement 2"],
  "progress_tracking": "How to measure progress and make adjustments"
}
`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        const responseText = response?.response?.text();
        if (!responseText) throw new Error("No response from AI.");

        const cleanJsonString = responseText.replace(/```json|```/g, "").trim();
        const recommendations = JSON.parse(cleanJsonString);

        return NextResponse.json({ recommendations }, { status: 200 });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed to generate recommendations." }, { status: 500 });
    }
}
