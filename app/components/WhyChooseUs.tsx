import { Heart, Gift, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Heart size={42} />,
      title: "Handmade With Love",
      description:
        "Every crochet creation is handcrafted with care, creativity and attention to every little detail.",
    },
    {
      icon: <Sparkles size={42} />,
      title: "Custom Orders",
      description:
        "Personalized crochet gifts specially designed according to your ideas and preferences.",
    },
    {
      icon: <Gift size={42} />,
      title: "Perfect For Gifting",
      description:
        "Beautiful handmade gifts for birthdays, anniversaries, baby showers and every special occasion.",
    },
  ];

  return (
    <section
      id="why-choose"
      className="py-24"
      style={{ background: "#FFF9F3" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center" style={{ color: "#4A3024" }}>
          Why Choose The Crochet Charm?
        </h2>

        <p className="text-center mt-4 max-w-2xl mx-auto" style={{ color: "#5F4A40" }}>
          Handmade creations crafted with love, creativity and premium quality.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border"
              style={{ background: "#F8EEE4", borderColor: "#EED2BD" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:rotate-12 transition shadow-sm"
                style={{ background: "#FFF9F3", color: "#A84F40" }}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-center mt-8" style={{ color: "#4A3024" }}>
                {item.title}
              </h3>

              <p className="text-center mt-5 leading-8" style={{ color: "#5F4A40" }}>
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}