"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react"; // For the loading spinner icon

const FormPage = () => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        activity_level: "",
        dietary_preferences: "",
        fitness_goals: "",
        lifestyle_factors: "",
        dietary_restrictions: "",
        health_conditions: "",
        current_workout: "",
        current_diet: "",
        food_allergies: "",
        user_query: ""
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await fetch("/api/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            sessionStorage.setItem("recommendations", JSON.stringify(data.recommendations));

            setLoading(false); // Stop loading
            router.push("/recommendations");
        } catch (error) {
            console.error("Error:", error);
            setLoading(false); // Stop loading in case of error
        }
    };

    return (
        <section className="max-w-3xl mx-auto p-6">
            <Button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-gray-700 text-white rounded-md">
                ⬅ Go Back
            </Button>

            <Card>
                <CardContent>
                    <h2 className="text-3xl font-semibold text-center text-blue-600">
                        Get Your Personalized Recommendations
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                        Fill in the details below to receive tailored diet and workout recommendations.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Age */}
                        <div>
                            <label className="block font-semibold text-gray-700">Age</label>
                            <Input 
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                                required
                                className="w-full border-gray-300 rounded-md p-2"
                            />
                        </div>

                        {/* Gender Dropdown */}
                        <div>
                            <label className="block font-semibold text-gray-700">Gender</label>
                            <Select name="gender" onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                                <SelectTrigger className="w-full border-gray-300 rounded-md p-2">
                                    {formData.gender || "Select Gender"}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Height & Weight */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold text-gray-700">Height (cm)</label>
                                <Input 
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    placeholder="e.g., 175"
                                    required
                                    className="w-full border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold text-gray-700">Weight (kg)</label>
                                <Input 
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="e.g., 70"
                                    required
                                    className="w-full border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>

                        {/* Activity Level Dropdown */}
                        <div>
                            <label className="block font-semibold text-gray-700">Activity Level</label>
                            <Select name="activity_level" onValueChange={(value) => setFormData({ ...formData, activity_level: value })}>
                                <SelectTrigger className="w-full border-gray-300 rounded-md p-2">
                                    {formData.activity_level || "Select Activity Level"}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sedentary">Sedentary (little to no exercise)</SelectItem>
                                    <SelectItem value="Lightly Active">Lightly Active (1-3 days/week)</SelectItem>
                                    <SelectItem value="Moderately Active">Moderately Active (3-5 days/week)</SelectItem>
                                    <SelectItem value="Very Active">Very Active (6-7 days/week)</SelectItem>
                                    <SelectItem value="Athlete">Athlete (Intense daily training)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Other Input Fields */}
                        {["dietary_preferences", "fitness_goals", "lifestyle_factors", "dietary_restrictions", "health_conditions", "current_workout", "current_diet", "food_allergies"].map((key) => (
                            <div key={key}>
                                <label className="block font-semibold text-gray-700">{key.replace(/_/g, " ")}</label>
                                <Input 
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    placeholder={
                                        key === "dietary_preferences" ? "e.g., Vegan, Keto, Mediterranean..." :
                                        key === "fitness_goals" ? "e.g., Weight loss, Muscle gain, Endurance..." :
                                        key === "lifestyle_factors" ? "e.g., Office Job, Active, Athlete..." :
                                        key === "dietary_restrictions" ? "e.g., Gluten-free, Dairy-free..." :
                                        key === "health_conditions" ? "e.g., Diabetes, Hypertension..." :
                                        key === "current_workout" ? "e.g., Strength Training 4x/week..." :
                                        key === "current_diet" ? "e.g., High Protein, Low Carb..." :
                                        key === "food_allergies" ? "e.g., Peanuts, Dairy..." : ""
                                    }
                                    className="w-full border-gray-300 rounded-md p-2"
                                />
                            </div>
                        ))}

                        {/* User Query */}
                        <div>
                            <label className="block font-semibold text-gray-700">Additional Details</label>
                            <Textarea 
                                name="user_query"
                                value={formData.user_query}
                                onChange={handleChange}
                                placeholder="Describe any specific requirements or goals..."
                                required 
                                className="w-full border-gray-300 rounded-md p-2"
                            />
                        </div>

                        {/* Submit Button with Loader */}
                        <Button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} /> Generating...
                                </>
                            ) : (
                                "Get My Recommendations"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default FormPage;
