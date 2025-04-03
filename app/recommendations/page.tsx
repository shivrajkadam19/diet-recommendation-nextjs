"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";

const sections = {
    diet_types: "Diet Recommendations",
    workouts: "Workout Options",
    breakfasts: "Breakfast Ideas",
    lunches: "Lunch Options",
    dinners: "Dinner Options",
    snacks: "Healthy Snacks",
    supplements: "Recommended Supplements",
    hydration_tips: "Hydration Guidelines",
    additional_tips: "Additional Tips"
};

const Recommendations = () => {
    const router = useRouter();
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem("recommendations");
            if (storedData) {
                setRecommendations(JSON.parse(storedData));
            }
        }
    }, []);

    const handleDownloadPDF = () => {
        if (!recommendations) return;

        const pdf = new jsPDF();
        pdf.setFontSize(18);
        pdf.text("Personalized Recommendations", 10, 10);

        let y = 20;
        Object.keys(sections).forEach((section) => {
            if (recommendations[section]?.length) {
                pdf.setFontSize(14);
                pdf.text(sections[section], 10, y);
                y += 8;

                pdf.setFontSize(12);
                recommendations[section].forEach((item) => {
                    const splitText = pdf.splitTextToSize(`- ${item}`, 180);
                    splitText.forEach((line) => {
                        pdf.text(line, 12, y);
                        y += 6;
                        if (y > 280) {
                            pdf.addPage();
                            y = 10;
                        }
                    });
                });
                y += 8;
            }
        });

        pdf.save("Personalized_Recommendations.pdf");
    };

    return (
        <section className="max-w-3xl mx-auto p-6">
            <Button onClick={() => router.back()} className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-md">
                ⬅ Go Back
            </Button>
            <Button onClick={handleDownloadPDF} className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md">
                ⬇ Download as PDF
            </Button>

            <Card className="mt-6">
                <CardContent>
                    <h2 className="text-3xl font-semibold text-center text-blue-600">Your Personalized Recommendations</h2>
                    
                    {!recommendations ? (
                        <p className="text-center text-gray-500 mt-4">Loading recommendations... Please wait.</p>
                    ) : (
                        Object.keys(sections).map((section) =>
                            recommendations[section]?.length ? (
                                <div key={section} className="bg-gray-100 p-4 rounded-lg mt-6 shadow-md">
                                    <h3 className="text-lg font-semibold text-blue-600">{sections[section]}</h3>
                                    <ul className="mt-2 space-y-2">
                                        {recommendations[section].map((item, index) => (
                                            <li key={index} className="p-2 bg-blue-50 rounded-md">✔ {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null
                        )
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default Recommendations;
