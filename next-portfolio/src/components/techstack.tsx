"use client";

import TechCard from "./TechCard";

const techStacks = [
  { id: "1", title: "Python", imgSrc: "/logos/python.png" },
  { id: "2", title: "JavaScript", imgSrc: "/logos/javascript.png" },
  { id: "3", title: "PHP", imgSrc: "/logos/php.png" },
  { id: "4", title: "TypeScript", imgSrc: "/logos/typescript.png" },
  { id: "5", title: "NodeJs", imgSrc: "/logos/node.png" },
  { id: "6", title: "React", imgSrc: "/logos/react.png" },
  { id: "7", title: "NextJs", imgSrc: "/logos/nextjs.png" },
  { id: "8", title: "Vue", imgSrc: "/logos/vue.png" },
  { id: "9", title: "ViteJs", imgSrc: "/logos/vite.png" },
  { id: "10", title: "PostgreSql", imgSrc: "/logos/postgres.png" },
  { id: "11", title: "MySql", imgSrc: "/logos/mysql.png" },
  { id: "12", title: "Amplify", imgSrc: "/logos/amplify.png" },
  { id: "13", title: "ec2", imgSrc: "/logos/ec2.png" },
  { id: "14", title: "Google Cloud", imgSrc: "/logos/googlecloud.png" },
  { id: "15", title: "docker", imgSrc: "/logos/docker.png" },
  { id: "16", title: "git", imgSrc: "/logos/git.png" },
];
export function Techstack() {
  return (
    <div className="w-full z-0 container px-4 md:px-6 border border-gray-300 p-10 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Check Out My Tech Stack!
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I learn the latest and greatest technologies to build my projects.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 mt-12">
        {techStacks.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <TechCard title={tech.title} imgSrc={tech.imgSrc} />
          </div>
        ))}
      </div>
    </div>
  );
}
