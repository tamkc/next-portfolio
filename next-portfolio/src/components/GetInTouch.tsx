import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Link as LinkIcon,
  Instagram,
  Github,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  UserPlus,
} from "lucide-react";
import PopoverForm from "@/components/PopoverForm";

export default function GetInTouch() {
  const socialMedia = [
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "Instagram", url: "https://github.com", icon: Instagram },
  ];

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-between space-y-4 text-center w-full z-0 container px-4 md:px-6 border border-gray-300 p-10 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mt-4 text-lg text-gray-600">
            Connect with the team behind our cultural club. Reach out to us
            through these channels.
          </p>
        </div>
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <Card className="bg-white p-6 rounded-lg shadow-lg flex gap-10 flex-col items-start">
            <div className="flex">
              {/* Icon */}
              <div className="w-10 h-10 bg-white p-2 flex items-center justify-center rounded-lg border border-gray-300">
                <Mail className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-start justify-items-start">
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
              <p className="text-muted-foreground text-sm py-2 text-gray-500 text-left">
                Contact me via Email:
              </p>
              <a
                href="mailto:tamkc1999@gmail.com"
                className="text-blue-500 hover:underline"
              >
                tamkc1999@gmail.com
              </a>{" "}
            </div>
          </Card>
          {/* Card 2 */}
          <Card className="bg-white p-6 rounded-lg shadow-lg flex gap-10 flex-col items-start">
            <div className="flex">
              {/* Icon */}
              <div className="w-10 h-10 bg-white p-2 flex items-center justify-center rounded-lg border border-gray-300">
                <MessageCircle className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-start justify-items-start">
              <h3 className="text-lg font-semibold text-gray-800">
                Contact Form
              </h3>
              <p className="text-muted-foreground text-sm py-2 text-gray-500">
                Contact me via our contact form.
              </p>

              <PopoverForm />
            </div>
          </Card>
          {/* Card 3 */}
          <Card className="bg-white p-6 rounded-lg shadow-lg flex gap-10 flex-col items-start">
            <div className="flex">
              {/* Icon */}
              <div className="w-10 h-10 bg-white p-2 flex items-center justify-center rounded-lg border border-gray-300">
                <Phone className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-start justify-items-start">
              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
              <p className="text-muted-foreground text-sm py-2 text-gray-500 text-left">
                Contact me via Phone Calls:
              </p>
              <a
                href="tel:+16475532374"
                className="text-blue-500 hover:underline"
              >
                +1 (647) 553-2374
              </a>
            </div>
          </Card>

          {/* Card 4 */}
          <Card className="bg-white p-6 rounded-lg shadow-lg flex gap-10 flex-col items-start">
            <div className="flex">
              {/* Icon */}
              <div className="w-10 h-10 bg-white p-2 flex items-center justify-center rounded-lg border border-gray-300">
                <UserPlus className="w-6 h-6 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-start justify-items-start">
              <h3 className="text-lg font-semibold text-gray-800">
                Social Media
              </h3>
              <p className="text-muted-foreground text-sm py-2 text-gray-500 text-left">
                Follow me on social media:
              </p>
              <ul className="flex gap-4">
                {socialMedia.map((platform, index) => (
                  <li key={index}>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      {/* Rendering Lucide icons */}
                      <platform.icon className="w-6 h-6" />
                    </a>
                  </li>
                ))}
              </ul>{" "}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
