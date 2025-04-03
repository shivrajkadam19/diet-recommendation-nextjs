"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FormPage = () => {
    const [formData, setFormData] = useState({
        dietary_preferences: "",
        fitness_goals: "",
        lifestyle_factors: "",
        dietary_restrictions: "",
        health_conditions: "",
        user_query: ""
    });

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            sessionStorage.setItem("recommendations", JSON.stringify(data.recommendations));
            router.push("/recommendations");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section className="max-w-3xl mx-auto p-6">
            <Button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md">⬅ Go Back</Button>
            <Card>
                <CardContent>
                    <h2 className="text-3xl font-semibold text-center text-blue-600">Get Your Personalized Recommendations</h2>
                    <p className="text-center text-gray-500 mt-2">Fill in the details below to receive tailored diet and workout recommendations.</p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {Object.keys(formData).map((key) => (
                            <div key={key}>
                                <label className="block font-semibold capitalize text-gray-700">{key.replace(/_/g, " ")}</label>
                                {key === "user_query" ? (
                                    <Textarea 
                                        name={key} 
                                        value={formData[key]} 
                                        onChange={handleChange} 
                                        placeholder="Describe any specific requirements or goals you have..."
                                        required 
                                        className="w-full border-gray-300 rounded-md p-2"
                                    />
                                ) : (
                                    <Input 
                                        type="text" 
                                        name={key} 
                                        value={formData[key]} 
                                        onChange={handleChange} 
                                        placeholder={
                                            key === "dietary_preferences" ? "e.g., Vegan, Keto, Mediterranean..." :
                                            key === "fitness_goals" ? "e.g., Weight loss, Muscle gain, Endurance..." :
                                            key === "lifestyle_factors" ? "e.g., Sedentary, Active, Athlete..." :
                                            key === "dietary_restrictions" ? "e.g., Gluten-free, Dairy-free..." :
                                            key === "health_conditions" ? "e.g., Diabetes, Hypertension..." : ""
                                        }
                                        required 
                                        className="w-full border-gray-300 rounded-md p-2"
                                    />
                                )}
                            </div>
                        ))}
                        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Get My Recommendations</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default FormPage;
