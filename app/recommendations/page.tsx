"use client"
import { useSearchParams, useRouter } from "next/navigation";
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
        pdf.setFontSize(16);
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
        pdf.save("Diet_Plan_Recommendations.pdf");
    };

    return (
        <Card className="max-w-2xl mx-auto p-6">
            <CardContent>
                <Button onClick={() => router.back()} className="mb-4">Go Back</Button>
                <Button onClick={handleDownloadPDF} className="ml-4">Download as PDF</Button>

                <h2 className="text-2xl font-semibold text-center text-blue-600">Personalized Recommendations</h2>
                <div>
                    {!recommendations ? (
                        <p className="text-center text-gray-600 mt-4">Loading recommendations...</p>
                    ) : (
                        Object.keys(sections).map((section) =>
                            recommendations[section]?.length ? (
                                <div key={section} className="bg-gray-100 p-4 rounded-lg mt-4 shadow-md">
                                    <h3 className="text-lg font-semibold text-blue-600">{sections[section]}</h3>
                                    <ul className="mt-2 space-y-2">
                                        {recommendations[section].map((item, index) => (
                                            <li key={index} className="p-2 bg-blue-50 rounded-md">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Recommendations;
