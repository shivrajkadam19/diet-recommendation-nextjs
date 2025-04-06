import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LucideArrowRight,
  LucideBarChart2,
  LucideCheck,
  LucideChefHat,
  LucideHeart,
  LucideLeaf,
  BeefIcon as LucideMeat,
  LucideScale,
  LucideUser,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <LucideLeaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Personalised diet and workout recommendations system</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "Home", href: "#" },
              { name: "How It Works", href: "#how-it-works" },
              { name: "Plans", href: "#plans" },
              { name: "Testimonials", href: "#testimonials" },
              { name: "Contact Us", href: "#contact" },
            ].map((link, index) => (
              <Link key={index} href={link.href} className="text-sm font-medium hover:text-green-600 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images.jpeg?height=800&width=1920"
              alt="Healthy lifestyle"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="container relative z-10 py-24 md:py-32">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Personalized Diet Plans for a Healthier You
              </h1>
              <p className="mt-6 text-lg md:text-xl">
                Discover AI-powered nutrition plans tailored to your body, goals, and preferences. Start your journey to
                better health today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href={"/FormPage"}>Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white bg-transperant border-white hover:bg-white/10">
                  Take a Free Health Quiz
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 py-16 md:py-24 flex justify-center">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform creates personalized diet plans in just three simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Complete Your Profile",
                  description: "Answer a few questions about your body, lifestyle, and health goals.",
                  icon: <LucideUser className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Get Your Personalized Plan",
                  description: "Our AI analyzes your data to create a nutrition plan tailored just for you.",
                  icon: <LucideBarChart2 className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Track Your Progress",
                  description: "Follow your plan, log your meals, and watch your health transform over time.",
                  icon: <LucideScale className="h-10 w-10 text-green-600" />,
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-100 p-4 mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diet Plans Section */}
        <section id="plans" className="py-16 md:py-24 flex justify-center">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Diet Plans</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from a variety of scientifically-backed diet plans or let our AI recommend the best one for you
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Keto Diet",
                  description: "High-fat, low-carb diet that helps your body burn fat more efficiently.",
                  icon: <LucideMeat className="h-8 w-8 text-green-600" />,
                },
                {
                  title: "Vegan Diet",
                  description: "Plant-based nutrition that's good for your health and the planet.",
                  icon: <LucideLeaf className="h-8 w-8 text-green-600" />,
                },
                {
                  title: "High-Protein",
                  description: "Perfect for muscle building and recovery after intense workouts.",
                  icon: <LucideScale className="h-8 w-8 text-green-600" />,
                },
                {
                  title: "Balanced Diet",
                  description: "Well-rounded nutrition with the right mix of all essential nutrients.",
                  icon: <LucideChefHat className="h-8 w-8 text-green-600" />,
                },
              ].map((plan, index) => (
                <Card key={index} className="border-2 hover:border-green-600 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2">{plan.icon}</div>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 md:py-24 flex justify-center">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">AI-Based Recommendations</h2>
                <p className="text-lg mb-6">
                  Our advanced AI technology analyzes multiple factors to create a diet plan that's uniquely yours.
                </p>
                <ul className="space-y-4">
                  {[
                    "Personalized based on your BMI and body composition",
                    "Adapts to your specific health goals",
                    "Considers your food preferences and allergies",
                    "Adjusts based on your progress and feedback",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <LucideCheck className="h-6 w-6 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 bg-white text-green-600 hover:bg-gray-100">
                  <Link href={"/FormPage"}>
                  Get Your AI Recommendation
                  </Link>
                  </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/ai.png?height=400&width=600"
                  alt="AI Recommendation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Health Benefits Section */}
        <section className="bg-gray-50 py-16 md:py-24 flex justify-center">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Health Benefits</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Experience these transformative benefits with our personalized nutrition plans
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              {[
                {
                  title: "Weight Management",
                  description: "Achieve and maintain your ideal weight with balanced nutrition.",
                  icon: <LucideScale className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Muscle Gain",
                  description: "Support muscle growth with optimized protein intake and timing.",
                  icon: <LucideUser className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Improved Metabolism",
                  description: "Boost your metabolic rate for better energy and fat burning.",
                  icon: <LucideBarChart2 className="h-10 w-10 text-green-600" />,
                },
                {
                  title: "Better Digestion",
                  description: "Enhance gut health with the right balance of fiber and nutrients.",
                  icon: <LucideHeart className="h-10 w-10 text-green-600" />,
                },
              ].map((benefit, index) => (
                <Card key={index} className="text-center flex flex-col items-center">
                  <CardHeader>
                    <div className="mx-auto mb-2">{benefit.icon}</div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Blog Section */}
        <section className="bg-gray-50 py-16 md:py-24 flex justify-center">
          <div className="container px-10 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Nutrition Tips</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed with our expert nutrition advice and health trends
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 justify-center">
              {[
                {
                  title: "10 Superfoods You Should Include in Your Diet",
                  excerpt: "Discover the power-packed foods that can boost your immunity and overall health.",
                  image: "/placeholder.svg?height=200&width=400",
                  date: "May 15, 2023",
                },
                {
                  title: "How Intermittent Fasting Can Transform Your Health",
                  excerpt: "Learn about the science behind intermittent fasting and its numerous health benefits.",
                  image: "/placeholder.svg?height=200&width=400",
                  date: "June 2, 2023",
                },
                {
                  title: "The Truth About Carbs: Friend or Foe?",
                  excerpt: "Debunking common myths about carbohydrates and their role in a balanced diet.",
                  image: "/placeholder.svg?height=200&width=400",
                  date: "June 10, 2023",
                },
              ].map((post, index) => (
                <Card key={index} className="overflow-hidden flex flex-col items-center">
                  <div className="relative h-48 w-full">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="text-center">
                    <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <Button variant="link" className="mt-2 p-0 h-auto text-green-600 hover:text-green-700 flex items-center justify-center">
                      Read More <LucideArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                View All Articles
              </Button>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="bg-green-600 text-white py-16 flex justify-center">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Transform Your Health?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who have achieved their health goals with our personalized diet plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="text-white bg-green-600 border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className=" bg-gray-900 text-gray-300 py-12 flex justify-center">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LucideLeaf className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-white">Personalised dite and workout recommendations system</span>
                
              </div>
              <p className="mb-4">AI-powered nutrition plans tailored to your body, goals, and preferences.</p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#plans" className="hover:text-white transition-colors">
                    Diet Plans
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} NutriAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

